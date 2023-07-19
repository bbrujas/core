const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getWeeklyPlayers");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getWeeklyPlayersRoute = express.Router();

getWeeklyPlayersRoute.get("/", (req, res) => {

    req.urlMondayBlock = HTTP_PROVIDER_URL +
        '?module=block&action=getblocknobytime&timestamp=' + Math.floor(require('../utils/dateUtils').getMonday().getTime() / 1000) +
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
            req.leaderboard = require('../utils/dataProcessor').groupTransactions(resWeeklyPraises.data);
            res.payload = req.leaderboard;
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

module.exports = getWeeklyPlayersRoute