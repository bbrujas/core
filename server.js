const express = require("express");
const bodyParser = require("body-parser");

//Default endpoints (MS Information)
const aboutRouter = require("./routes/about");
const readmeRouter = require("./routes/readme");
const changelogRouter = require("./routes/changelog");
//MS logic
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
    API_KEY = global.env.ETHERSCAN_API_KEY;

    HOSTNAME = configFileDetails.HOSTNAME;
    PORT = configFileDetails.SERVICE_PORT;
    SVC_ID = configFileDetails.SVC_ID;
    PROVIDER = configFileDetails.HTTP_PROVIDER_URL;

    const app = express();
    app.use(express.static("client")); //include static content on folder ./client

    app.use(bodyParser.urlencoded({ extended: true }));

    // Resources definition
    app.use(express.json());
    app.use("/about", aboutRouter);
    app.use("/readme", readmeRouter);
    app.use("/changelog", changelogRouter);
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

    // Start MS
    app.listen(PORT, HOSTNAME, () => {
        log.info(`${SVC_ID} running at ${HOSTNAME}:${PORT}...`)
    })

} catch (e) {
    log.error(e)
}
