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
    var myResponse = [];
    var j = 0;

    for (var i = 0; i < monitored.length; i++){

        myMonitoredSet[monitored[i]] = true;

    }

    for (var index = 0; index < listing.length; ++index) {

        var detail = listing[index];

        if (detail.symbol in myMonitoredSet) {

            if (j < listing.length - 1){
                myResponse+=detail.id+',';
                j++;
            }else {
                myResponse+=detail.id
            }

        }
    }

    return myResponse
}

getMap.get("/", (req, res) => {

    res.urlMapping = PROVIDER+"/v1/cryptocurrency/map?symbol="+COIN_LIST;

    axios({
        url: res.urlMapping,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            'X-CMC_PRO_API_KEY': API_KEY
        }
    }).then( responseMap => {
        req.urlQuotes=PROVIDER+"/v1/cryptocurrency/quotes/latest?id="+filter(COIN_LIST,responseMap.data.data);
    }).then( response => axios({
        url: req.urlQuotes,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            'X-CMC_PRO_API_KEY': API_KEY
        }
    })).then(responseQuote => {
        res.payload = responseQuote.data.data;
        res.statusCode = responseQuote.status;
    }).catch(function (error) {
        log.error(error);
        res.payload = error.message;
        res.statusCode = 503;
    }).finally(() => {
        res.json(res.payload)
    });
})

module.exports = getMap