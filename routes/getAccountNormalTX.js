const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getAccountNormalTX");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getAccountNormalTX = express.Router();

getAccountNormalTX.get("/:address/:startblock/:endblock", async (req, res) => {

    const address = req.params.address;
    const startblock = req.params.startblock;
    const endblock = req.params.endblock;

    res.url = PROVIDER + '?module=account&action=txlist&address=' + address
        + '&startblock=' + startblock
        + '&endblock=' + endblock
        + '&sort=asc&apikey=' + API_KEY;

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

module.exports = getAccountNormalTX