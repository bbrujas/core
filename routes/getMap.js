const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getMap");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getMap = express.Router();

function filter(monitored, listing){

    var myMonitoredSet = {};
    var myResponse = {};
    var j = 0;

    for (var i = 0; i < monitored.length; i++){

        myMonitoredSet[monitored[i]] = true;

    }

    for (var index = 0; index < listing.length; ++index) {

        var detail = listing[index];

        if (detail.symbol in myMonitoredSet) {

            myResponse[detail.symbol]=detail.id;
            j++;

        }
    }

    return myResponse
}

getMap.get("/", (req, res) => {

    res.url = PROVIDER+"/v1/cryptocurrency/map?symbol="+COIN_LIST;

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

module.exports = getMap