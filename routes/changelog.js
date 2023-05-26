const express = require("express");
const fs = require('fs-extra');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');
const marked = require('marked');

// Initialise logger
const log4js = require("log4js");
const log = log4js.getLogger("changelog");

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
const filepath='./CHANGELOG.md';
const source = fs.readFileSync(filepath, 'utf8');

// Generate DOM structure for HTML output
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const changelogRoute = express.Router();

// Return the README.md file as HTML
changelogRoute.get("/", (req, res)=>{
    log.debug('changelog invoked.')
    res.send(DOMPurify.sanitize(marked.parse(source)));
});

module.exports = changelogRoute