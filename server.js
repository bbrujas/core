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

const secEnv = require('./utils/secureEnv.js');
const GENERATOR_ADDRESS = process.argv.slice(2).toString();

configFileDetails = require("./utils/configEnv.js").getConfigFile('./.config');

try {

    global.env = secEnv.secureEnvironment(GENERATOR_ADDRESS);

    HOSTNAME = configFileDetails.HOSTNAME;
    PORT = configFileDetails.SERVICE_PORT;

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
        log.info(`Server running at ${HOSTNAME}:${PORT}`)
    })

} catch (e) {
    log.error(e)
}
