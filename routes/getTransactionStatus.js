const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getTransactionStatus");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getTransactionStatus = express.Router();

getTransactionStatus.get("/:transaction", async (req, res) => {

    const transaction = req.params.transaction;

    res.url = PROVIDER + '?module=transaction&action=getstatus&txhash=' + transaction
        + '&apikey=' + API_KEY;

    axios.get(res.url)
        .then(function (response) {
            res.payload = response.data.result;
            res.statusCode = response.status;
        })
        .catch(function (error) {
            log.error(error);
            res.payload = error.message;
            res.statusCode = 503;
        }).finally(() => {
            res.json(res.payload)
        });
})

module.exports = getTransactionStatus