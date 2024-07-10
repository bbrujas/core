const express = require("express");
const fs = require('fs-extra');
const ethers = require('ethers');

// Initialise logger
const log4js = require("log4js");
const log = log4js.getLogger("factoryInfo");

// Configure logger
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getPairSymbol = express.Router();

getPairSymbol.get("/:pair", async (req, res) => {

    const my_smartContract = req.params.pair;
    const my_http_provider = req.app.get('PROVIDER');
    const my_abi = req.app.get('CONTRACT_ABI_JSON_PAIR');
    const provider = new ethers.providers.JsonRpcProvider(my_http_provider);
    const contract = new ethers.Contract(my_smartContract, my_abi, provider);

    try {
        //const result = ;
        res.payload = (await contract.symbol()).toString();
    }
    catch (error) {
        log.error(error);
        res.payload = error.message;
        res.statusCode = 503;
    } finally {
        res.json(res.payload)
    };
})

module.exports = getPairSymbol
