const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getBlockReward");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getBlockReward = express.Router();

getBlockReward.get("/:blocknumber", async (req, res) => {

    const blocknumber = req.params.blocknumber;

    res.url = PROVIDER + '?module=block&action=getblockreward&blockno=' + blocknumber
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

module.exports = getBlockReward