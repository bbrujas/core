const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getPlayers");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getPlayersRoute = express.Router();

getPlayersRoute.get("/", (req, res) => {

    axios.get(PROVIDER +
            '?module=block&action=getblocknobytime&timestamp=' + Math.floor(Date.now() / 1000) +
            '&closest=before&apikey=' + API_KEY)
        .then(resCurrentBlock => axios.get(
            PROVIDER +
            '?module=account&action=txlist&address=' + CONTRACT_ADDRESS +
            '&startblock=' + FIRST_BLOCK +
            '&endblock=' + resCurrentBlock.data.result +
            '&sort=asc&apikey=' + API_KEY))
        .then(resAllPraises => {
            req.leaderboard = require('../utils/dataProcessor').groupTransactions(resAllPraises.data);
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

module.exports = getPlayersRoute