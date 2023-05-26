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

const fs = require('fs-extra');
var toml = require('toml');
// Read config file
const filepath = './.config';
const configFile = fs.readFileSync(filepath, 'utf8');

//Open the environment encrypted file to use
const secEnv = require('./utils/secureEnv.js');
//Use the second parámeter of the command as the GeneratorAddress.
const GENERATOR_ADDRESS = process.argv.slice(2).toString();

try {

    // Load microservices config
    log.debug('loading microservice config file.');
    config = toml.parse(configFile);
    // Load encrypted env to the MS
    log.debug('loading secure environment.');
    global.env = secEnv.secureEnvironment(GENERATOR_ADDRESS);

    //const HOST_NAME = "0.0.0.0"; //listen on ALL interfaces, changed at CI/CD?
    const HOST_NAME = config.HOSTNAME; //listen on ALL interfaces, changed at CI/CD?
    const PORT = config.SERVICE_PORT;

    const app = express();
    app.use(express.static("client")); //include static content on folder ./client

    app.use(bodyParser.urlencoded({ extended: true }));

    // Resources definition
    app.use(express.json());
    app.use("/about", aboutRouter);
    app.use("/readme", readmeRouter);
    app.use("/changelog", changelogRouter);

    // Start MS
    app.listen(PORT, HOST_NAME, () => {
        log.info(`Server running at ${HOST_NAME}:${PORT}`)
    })

} catch (e) {
    log.error(e)
}
