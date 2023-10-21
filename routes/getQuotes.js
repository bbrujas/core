const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getListings");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getQuotes = express.Router();

getQuotes.get("/", (req, res) => {

    res.url = PROVIDER+"/v2/cryptocurrency/quotes/latest?convert=USD";

    axios({
        url: res.url,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            'X-CMC_PRO_API_KEY': API_KEY
            }
        }).then(function (response) {
            res.payload = response.data;
            res.statusCode = response.status;
        }).catch(function (error) {
            log.error(error);
            res.payload = error.message;
            res.statusCode = 503;
        }).finally(() => {
            res.json(res.payload)
        });
})

module.exports = getQuotes