const express = require("express");
const bodyParser = require("body-parser");

//Default endpoints (MS Information)
const aboutRouter = require("./routes/about");
const readmeRouter = require("./routes/readme");
const changelogRouter = require("./routes/changelog");
//MS logic
const getFactoryPairsRouter = require("./routes/factoryPairs");
const getFactoryPairByIdRouter = require("./routes/factoryPairById");
const getFactoryPairByAddressesRouter = require("./routes/factoryPairByAddresses");
const getPairAllowanceRouter = require("./routes/pairAllowance");
const getPairBalanceOfRouter = require("./routes/pairBalanceOf");
const getPairDecimalsRouter = require("./routes/pairDecimals");
const getPairFactoryRouter = require("./routes/pairFactory");
const getPairKLastRouter = require("./routes/pairKLast");
const getPairNameRouter = require("./routes/pairName");
const getPairNoncesRouter = require("./routes/pairNonces");
const getPairPrice0CumulativeLastRouter = require("./routes/pairPrice0CumulativeLast");
const getPairPrice1CumulativeLastRouter = require("./routes/pairPrice1CumulativeLast");
const getPairReservesRouter = require("./routes/pairReserves");
const getPairSymbolRouter = require("./routes/pairSymbol");
const getPairToken0Router = require("./routes/pairToken0");
const getPairToken1Router = require("./routes/pairToken1");
const getPairTotalSupplyRouter = require("./routes/pairTotalSupply");


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
    
    global.env = require('./utils/secureEnv.js').secureEnvironment(GENERATOR_ADDRESS, config.ENC_ENV_PATH);

    const app = express();

    app.set('CONTRACT_ABI_JSON', require(config.PATH_JSON_ABI_FACTORY).abi);
    app.set('CONTRACT_ABI_JSON_PAIR', require(config.PATH_JSON_ABI_PADPAIR).abi);
    app.set('SMART_CONTRACT', config.SMART_CONTRACT);
    app.set('PROVIDER', global.env.HTTP_PROVIDER);
    app.set('HOSTNAME', config.HOSTNAME);
    app.set('MS_ID', config.MS_ID);
    app.set('PORT', config.PORT);

    app.use(express.static("client")); //include static content on folder ./client

    app.use(bodyParser.urlencoded({ extended: true }));

    // Resources definition
    app.use(express.json());
    app.use("/about", aboutRouter);
    app.use("/readme", readmeRouter);
    app.use("/changelog", changelogRouter);
    app.use("/factoryPairs", getFactoryPairsRouter);
    app.use("/factoryPairById", getFactoryPairByIdRouter);
    app.use("/factoryPairByAddresses", getFactoryPairByAddressesRouter);
    app.use("/pairAllowance", getPairAllowanceRouter);
    app.use("/pairBalanceOf", getPairBalanceOfRouter);
    app.use("/pairDecimals", getPairDecimalsRouter);
    app.use("/pairFactory", getPairFactoryRouter);
    app.use("/pairKLast", getPairKLastRouter);
    app.use("/pairName", getPairNameRouter);
    app.use("/pairNonces", getPairNoncesRouter);
    app.use("/pairPrice0CumulativeLast", getPairPrice0CumulativeLastRouter);
    app.use("/pairPrice1CumulativeLast", getPairPrice1CumulativeLastRouter);
    app.use("/pairReserves", getPairReservesRouter);
    app.use("/pairSymbol", getPairSymbolRouter);
    app.use("/pairToken0", getPairToken0Router);
    app.use("/pairToken1", getPairToken1Router);
    app.use("/pairTotalSupply", getPairTotalSupplyRouter);


    // Start MS
    app.listen(app.get('PORT'), app.get('HOSTNAME'), () => {
        log.info(`${app.get('MS_ID')} running at ${app.get('HOSTNAME')}:${app.get('PORT')}`)
    })

} catch (e) {
    log.error(e)
}
