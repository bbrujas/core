const express = require("express");
const fs = require('fs-extra');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const marked=require('marked');

// Initialise logger
const log4js = require("log4js");
const log = log4js.getLogger("readme");

// Configure logger
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

// Read file and assign to source
const filepath='./README.md';
const source = fs.readFileSync(filepath, 'utf8');

// Generate DOM structure for HTML output
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const readmeRoute = express.Router();

// Return the README.md file as HTML
readmeRoute.get("/", (req, res)=>{
    log.debug('readme invoked.');
    res.send(DOMPurify.sanitize(marked.parse(source)));
});

module.exports = readmeRoute