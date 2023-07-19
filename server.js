const express = require("express");
const bodyParser = require("body-parser");

const getMondayBlockRouter = require("./routes/getMondayBlock");
const getCurrentBlockRouter = require("./routes/getCurrentBlock");
const getBlockByTimestampRouter = require("./routes/getBlockByTimestamp");
const getBlockCountdownRouter = require("./routes/getBlockCountdown");
const getBlockRewardRouter = require("./routes/getBlockReward");
const getContractABIRouter = require("./routes/getContractABI");
const getContractSourceCodeRouter = require("./routes/getContractSourceCode");
const getContractCreationRouter = require("./routes/getContractCreation");
const getTransactionStatusRouter = require("./routes/getTransactionStatus");
const getTransactionReceiptStatusRouter = require("./routes/getTransactionReceiptStatus");
const getAccountBalanceRouter = require("./routes/getAccountBalance");
const getAccountNormalTXRouter = require("./routes/getAccountNormalTX");
const getAccountInternalTXRouter = require("./routes/getAccountInternalTX");
const getAccountMinedBlocksRouter = require("./routes/getAccountMinedBlocks");
const getInternalTXRouter = require("./routes/getInternalTX");
const getBlockRangeInternalTXRouter = require("./routes/getBlockRangeInternalTX");

const log4js = require("log4js");
const log = log4js.getLogger("ca-startup");
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
    API_KEY = global.env.ETHERSCAN_API_KEY;

    HOSTNAME = configFileDetails.HOSTNAME;
    PORT = configFileDetails.SERVICE_PORT;
    SVC_ID = configFileDetails.SVC_ID;
    PROVIDER = configFileDetails.HTTP_PROVIDER_URL;

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/getMondayBlock", getMondayBlockRouter);
    app.use("/getCurrentBlock", getCurrentBlockRouter);
    app.use("/getBlockByTimestamp", getBlockByTimestampRouter);
    app.use("/getBlockCountdown", getBlockCountdownRouter);
    app.use("/getBlockReward", getBlockRewardRouter);
    app.use("/getContractABI", getContractABIRouter);
    app.use("/getContractSourceCode", getContractSourceCodeRouter);
    app.use("/getContractCreation", getContractCreationRouter);
    app.use("/getTransactionStatus", getTransactionStatusRouter);
    app.use("/getTransactionReceiptStatus", getTransactionReceiptStatusRouter);
    app.use("/getAccountBalance", getAccountBalanceRouter);
    app.use("/getAccountNormalTX", getAccountNormalTXRouter);
    app.use("/getAccountInternalTX", getAccountInternalTXRouter);
    app.use("/getAccountMinedBlocks", getAccountMinedBlocksRouter);
    app.use("/getInternalTX", getInternalTXRouter);
    app.use("/getBlockRangeInternalTX", getBlockRangeInternalTXRouter);

    app.listen(PORT, HOSTNAME, () => {
        log.info(`${SVC_ID} running at ${HOSTNAME}:${PORT}...`)
    })

} catch (e) {
    log.error(e)
}
