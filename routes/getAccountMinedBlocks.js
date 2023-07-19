const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getAccountMinedBlocks");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getAccountMinedBlocks = express.Router();

getAccountMinedBlocks.get("/:address", async (req, res) => {

    const address = req.params.address;

    res.url = PROVIDER + '?module=account&action=getminedblocks&address=' + address
        + '&blocktype=blocks&apikey=' + API_KEY;

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

module.exports = getAccountMinedBlocks