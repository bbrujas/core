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

const getMonitored = express.Router();

function filter(monitored, listing){

    var myMonitoredSet = {};
    var myResponse = [];
    var j = 0;

    for (var i = 0; i < monitored.length; i++){

        myMonitoredSet[monitored[i]] = true;

    }

    for (var index = 0; index < listing.length; ++index) {

        var detail = listing[index];

        if (detail.symbol in myMonitoredSet) {

            myResponse[j]=detail;
            j++;

            if (j == monitored.length) break

        }
    }

    return myResponse
}

getMonitored.get("/", (req, res) => {

    res.url = PROVIDER+"/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=USD";

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
            res.payload = filter(COIN_LIST,response.data.data);
            res.statusCode = response.status;
        }).catch(function (error) {
            log.error(error);
            res.payload = error.message;
            res.statusCode = 503;
        }).finally(() => {
            res.json(res.payload)
        });
})

module.exports = getMonitored