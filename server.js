const express = require("express");
const bodyParser = require("body-parser");

const getPlayersRouter = require("./routes/getPlayers");
const getWeeklyPlayersRouter = require("./routes/getWeeklyPlayers");
const getAllTxRouter = require("./routes/getAllTx");
const getWeeklyTxRouter = require("./routes/getWeeklyTx");

const log4js = require("log4js");
const log = log4js.getLogger("tnms-startup");
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
    API_KEY = global.env.ETHERSCAN_API_KEY_BSC;

    HOSTNAME = configFileDetails.HOSTNAME;
    PORT = configFileDetails.SERVICE_PORT;
    SVC_ID = configFileDetails.SVC_ID;
    HTTP_PROVIDER_URL = configFileDetails.HTTP_PROVIDER_URL_BSC;
    FIRST_BLOCK = configFileDetails.TOAD_FIRST_BLOCK_BSC;
    CONTRACT_ADDRESS = configFileDetails.TOAD_ADDRESS_BSC;

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/getPlayers", getPlayersRouter);
    app.use("/getWeeklyPlayers", getWeeklyPlayersRouter);
    app.use("/getAllTx", getAllTxRouter);
    app.use("/getWeeklyTx", getWeeklyTxRouter);

    app.listen(PORT, HOSTNAME, () => {
        log.info(`${SVC_ID} running at ${HOSTNAME}:${PORT}...`)
    })

} catch (e) {
    log.error(e)
}
