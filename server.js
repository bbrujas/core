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

try {

    const GENERATOR_ADDRESS = process.env.MS_SECRET || process.argv.slice(2).toString();
    const CONFIG_FILE = process.env.CONFIG_FILE || '.config';

    const config = require("./utils/configEnv.js").getConfigFile(CONFIG_FILE);

    CONTRACT_ADDRESS = config.TOAD_ADDRESS_BSC;
    FIRST_BLOCK = config.TOAD_FIRST_BLOCK_BSC;
    ENC_ENV_PATH = process.env.ENC_ENV_PATH || config.ENC_ENV_PATH;
    HOSTNAME = process.env.HOSTNAME || config.HOSTNAME;
    PORT = process.env.PORT || config.PORT;
    MS_ID = process.env.MS_ID || config.MS_ID;
    PROVIDER = config.HTTP_PROVIDER;

    global.env = require('./utils/secureEnv.js').secureEnvironment(GENERATOR_ADDRESS, ENC_ENV_PATH);
    log.debug(global.env);

    API_KEY = global.env.API_KEY;

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/getPlayers", getPlayersRouter);
    app.use("/getWeeklyPlayers", getWeeklyPlayersRouter);
    app.use("/getAllTx", getAllTxRouter);
    app.use("/getWeeklyTx", getWeeklyTxRouter);

    app.listen(PORT, HOSTNAME, () => {
        log.info(`${MS_ID} running at ${HOSTNAME}:${PORT}...`)
    })

} catch (e) {
    log.error(e)
}
