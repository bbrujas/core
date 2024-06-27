const express = require("express");
const bodyParser = require("body-parser");

//MS logic
const getListingsRouter = require("./routes/getListings");
const getMonitoredRouter = require("./routes/getMonitored");
const getPriceUSDRouter = require("./routes/getPriceUSD");
const getQuotesRouter = require("./routes/getQuotes");
const getMapRouter = require("./routes/getMap");

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
    PORT = config.PORT || process.env.PORT;
    MS_ID = config.MS_ID || process.env.MS_ID;
    PROVIDER = config.HTTP_PROVIDER;
    COIN_LIST = config.COIN_LIST;

    global.env = require('./utils/secureEnv.js').secureEnvironment(GENERATOR_ADDRESS, ENC_ENV_PATH);

    API_KEY = global.env.API_KEY;

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    // Resources definition
    app.use(express.json());
    app.use("/getListings", getListingsRouter);
    app.use("/getMonitored", getMonitoredRouter);
    app.use("/getPriceUSD", getPriceUSDRouter);
    app.use("/getQuotes", getQuotesRouter);
    app.use("/getMap", getMapRouter);

    // Start MS
    app.listen(PORT, HOSTNAME, () => {
        log.info(`${MS_ID} running at ${HOSTNAME}:${PORT}`)
    })

} catch (e) {
    log.error(e)
}
