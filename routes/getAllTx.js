const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getAllTx");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getAllTxRoute = express.Router();

getAllTxRoute.get("/", (req, res) => {

    axios.get(HTTP_PROVIDER_URL +
        '?module=block&action=getblocknobytime&timestamp=' + Math.floor(Date.now() / 1000) +
        '&closest=before&apikey=' + API_KEY)
        .then(resCurrentBlock => axios.get(HTTP_PROVIDER_URL +
            '?module=account&action=txlist&address=' + CONTRACT_ADDRESS +
            '&startblock=' + FIRST_BLOCK +
            '&endblock=' + resCurrentBlock.data.result +
            '&sort=asc&apikey=' + API_KEY))
        .then(resAllTx => {
            res.payload = resAllTx.data.result.length;
        })
        .catch(error => {
            log.error(error);
            res.payload = error.message;
            res.statusCode = 503;
        })
        .finally(() => {
            res.json(res.payload)
        });

})

module.exports = getAllTxRoute