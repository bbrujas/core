const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getAccountBalance");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getAccountBalance = express.Router();

getAccountBalance.get("/:address", async (req, res) => {

    const address = req.params.address;
    res.url = PROVIDER + '?module=account&action=balance&address=' + address
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

module.exports = getAccountBalance