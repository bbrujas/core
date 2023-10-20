const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getTransactionReceiptStatus");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

function filter(monitored, listing){

    var myMonitoredSet = {};
    var myResponse = [];
    var j = 0;

    myMonitoredSet[monitored] = true;

    for (var index = 0; index < listing.length; ++index) {

        var detail = listing[index];

        if (detail.symbol in myMonitoredSet) {

            myResponse=detail.quote.USD.price;
            break

        }
    }

    return myResponse
}

const getPriceUSD = express.Router();

getPriceUSD.get("/:symbol", async (req, res) => {

    const symbol = req.params.symbol;

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
            res.payload = filter(symbol,response.data.data);
            res.statusCode = response.status;
        }).catch(function (error) {
            log.error(error);
            res.payload = error.message;
            res.statusCode = 503;
        }).finally(() => {
            res.json(res.payload)
        });
})

module.exports = getPriceUSD