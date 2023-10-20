const express = require("express");
const bodyParser = require("body-parser");

//MS logic
const getListingsRouter = require("./routes/getListings");
const getMonitoredRouter = require("./routes/getMonitored");
const getPriceUSDRouter = require("./routes/getPriceUSD");

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
    API_KEY = global.env.API_KEY;

    HOSTNAME = configFileDetails.HOSTNAME;
    PORT = configFileDetails.SERVICE_PORT;
    PROVIDER = configFileDetails.PROVIDER;
    COIN_LIST = configFileDetails.COIN_LIST;

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    // Resources definition
    app.use(express.json());
    app.use("/getListings", getListingsRouter);
    app.use("/getMonitored", getMonitoredRouter);
    app.use("/getPriceUSD", getPriceUSDRouter);

    // Start MS
    app.listen(PORT, HOSTNAME, () => {
        log.info(`Server running at ${HOSTNAME}:${PORT}`)
    })

} catch (e) {
    log.error(e)
}
