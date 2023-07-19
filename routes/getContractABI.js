const express = require("express");
const axios = require("axios");

const log4js = require("log4js");
const log = log4js.getLogger("getContractABI");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getContractABI = express.Router();

getContractABI.get("/:address", async (req, res) => {

    const address = req.params.address;

    res.url = PROVIDER + '?module=contract&action=getabi&address=' + address
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

module.exports = getContractABI