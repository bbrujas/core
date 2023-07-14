const express = require("express");
const properties = require("../package.json");

// Initialise logger
const log4js = require("log4js");
const log = log4js.getLogger("about");

// Configure logger
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const aboutRoute = express.Router();

// Retrieve app package.json and return relevant info
aboutRoute.get("/", (req, res)=>{

    log.debug('about invoked.');
    const aboutInfo ={
        name: properties.name,
        version: properties.version,
        main: properties.main,
        description: properties.description,
        author: properties.author,
        homepage: properties.homepage
    }
    res.json(aboutInfo)
});

module.exports = aboutRoute