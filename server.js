const express = require("express");
const bodyParser = require("body-parser");

//Default endpoints (MS Information)
const aboutRouter = require("./routes/about");
const readmeRouter = require("./routes/readme");
const changelogRouter = require("./routes/changelog");
//MS logic

//initialise logging
const log4js = require("log4js");
const log = log4js.getLogger("server-startup");

// Initialize log
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    }
});

try {

    const GENERATOR_ADDRESS = process.env.MS_SECRET || process.argv.slice(2).toString();
    const CONFIG_FILE = process.env.CONFIG_FILE || '.config';

    const config = require("./utils/configEnv.js").getConfigFile(CONFIG_FILE);
    
    ENC_ENV_PATH = config.ENC_ENV_PATH || process.env.ENC_ENV_PATH;
    HOSTNAME = config.HOSTNAME || process.env.HOSTNAME;
    MS_ID = config.MS_ID || process.env.MS_ID;
    PORT = config.PORT || process.env.PORT;

    global.env = require('./utils/secureEnv.js').secureEnvironment(GENERATOR_ADDRESS, ENC_ENV_PATH);
    log.debug(global.env);

    const app = express();
    app.use(express.static("client")); //include static content on folder ./client

    app.use(bodyParser.urlencoded({ extended: true }));

    // Resources definition
    app.use(express.json());
    app.use("/about", aboutRouter);
    app.use("/readme", readmeRouter);
    app.use("/changelog", changelogRouter);

    // Start MS
    app.listen(PORT, HOSTNAME, () => {
        log.info(`${MS_ID} running at ${HOSTNAME}:${PORT}`)
    })

} catch (e) {
    log.error(e)
}
