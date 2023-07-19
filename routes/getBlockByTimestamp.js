const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getBlockByTimestamp");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getBlockByTimestamp = express.Router();

getBlockByTimestamp.get("/:timestamp", async (req, res) => {

    const timestamp = req.params.timestamp;

    res.url = PROVIDER + '?module=block&action=getblocknobytime&timestamp=' + Math.floor(timestamp / 1000)
        + '&closest=before&apikey=' + API_KEY;

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

module.exports = getBlockByTimestamp