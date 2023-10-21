//initialise logging
const log4js = require("log4js");
const log = log4js.getLogger("setup");

// Initialize log
log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
  },
});

function getSymbolListID(){
    
}