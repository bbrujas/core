const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getWeeklyPraises");

log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getWeeklyPraises = express.Router();

getWeeklyPraises.get("/", (req, res) => {

    const dateUtils = require('../utils/dateUtils');
    req.urlMondayBlock = HTTP_PROVIDER_URL +
        '?module=block&action=getblocknobytime&timestamp=' + Math.floor(dateUtils.getMonday().getTime() / 1000) +
        '&closest=before&apikey=' + API_KEY
    req.urlCurrentBlock = HTTP_PROVIDER_URL +
        '?module=block&action=getblocknobytime&timestamp=' + Math.floor(Date.now() / 1000) +
        '&closest=before&apikey=' + API_KEY;

    axios.get(req.urlMondayBlock)
        .then(resMondayBlock => {
            req.mondayBlock = resMondayBlock.data.result;
        })
        .then(response => axios.get(req.urlCurrentBlock))
        .then(resCurrentBlock => {
            req.urlWeeklyPraises = HTTP_PROVIDER_URL +
                '?module=account&action=txlist&address=' + CONTRACT_ADDRESS +
                '&startblock=' + req.mondayBlock +
                '&endblock=' + resCurrentBlock.data.result +
                '&sort=asc&apikey=' + API_KEY;
        })
        .then(response => axios.get(req.urlWeeklyPraises))
        .then(resWeeklyPraises => {
            res.payload = resWeeklyPraises.data.result.length;
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

module.exports = getWeeklyPraises