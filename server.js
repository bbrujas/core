const express = require("express");

// OCA MS resources
const getAccountBalanceRouter = require("./routes/getAccountBalance");
const getAccountTokenBalanceRouter = require("./routes/getAccountTokenBalance");
const getAccountInternalTXRouter = require("./routes/getAccountInternalTX");
const getAccountMinedBlocksRouter = require("./routes/getAccountMinedBlocks");
const getAccountNormalTXRouter = require("./routes/getAccountNormalTX");
const getBlockByTimestampRouter = require("./routes/getBlockByTimestamp");
const getBlockCountdownRouter = require("./routes/getBlockCountdown");
const getBlockRangeInternalTXRouter = require("./routes/getBlockRangeInternalTX");
const getBlockRewardRouter = require("./routes/getBlockReward");
const getContractABIRouter = require("./routes/getContractABI");
const getContractCreationRouter = require("./routes/getContractCreation");
const getContractSourceCodeRouter = require("./routes/getContractSourceCode");
const getCurrentBlockRouter = require("./routes/getCurrentBlock");
const getInternalTXRouter = require("./routes/getInternalTX");
const getMondayBlockRouter = require("./routes/getMondayBlock");
const getTransactionReceiptStatusRouter = require("./routes/getTransactionReceiptStatus");
const getTransactionStatusRouter = require("./routes/getTransactionStatus");

const log4js = require("log4js");
const log = log4js.getLogger("ca-startup");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

try {

    const GENERATOR_ADDRESS = process.argv.slice(2).toString();

    const configFile = require("./utils/configEnv.js").getConfigFile('./.config');
    global.env = require('./utils/secureEnv.js').secureEnvironment(GENERATOR_ADDRESS);

    HOSTNAME = configFile.HOSTNAME;
    PORT = configFile.SERVICE_PORT;
    MS_ID = configFile.MS_ID;
    PROVIDER = configFile.HTTP_PROVIDER_URL_BSC;
    API_KEY = global.env.BSCSCAN_API_KEY;
    RPC_PROVIDER = global.env.BSC_RPC_PROVIDER;

    const app = express();

    app.use(require("body-parser").urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/getAccountBalance", getAccountBalanceRouter);
    app.use("/getAccountTokenBalance", getAccountTokenBalanceRouter);
    app.use("/getAccountInternalTX", getAccountInternalTXRouter);
    app.use("/getAccountMinedBlocks", getAccountMinedBlocksRouter);
    app.use("/getAccountNormalTX", getAccountNormalTXRouter);
    app.use("/getBlockByTimestamp", getBlockByTimestampRouter);
    app.use("/getBlockCountdown", getBlockCountdownRouter);
    app.use("/getBlockRangeInternalTX", getBlockRangeInternalTXRouter);
    app.use("/getBlockReward", getBlockRewardRouter);
    app.use("/getContractABI", getContractABIRouter);
    app.use("/getContractCreation", getContractCreationRouter);
    app.use("/getContractSourceCode", getContractSourceCodeRouter);
    app.use("/getCurrentBlock", getCurrentBlockRouter);
    app.use("/getInternalTX", getInternalTXRouter);
    app.use("/getMondayBlock", getMondayBlockRouter);
    app.use("/getTransactionReceiptStatus", getTransactionReceiptStatusRouter);
    app.use("/getTransactionStatus", getTransactionStatusRouter);

    app.listen(PORT, HOSTNAME, () => {
        log.info(`${MS_ID} listening at ${HOSTNAME}:${PORT}...`)
    });

} catch (e) {
    log.error(e);
}
