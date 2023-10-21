//initialise logging
const log4js = require("log4js");
const log = log4js.getLogger("config");

// Initialize log
log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
  },
});

function getConfigFile(path) {
  try {
    // Read config file
    const fs = require('fs-extra');
    var toml = require('toml');
    const filepath = path;
    const configFile = fs.readFileSync(filepath, 'utf8');

    // JSON del ABI del contrato
    return toml.parse(configFile);

  } catch (e) {
    log.error(e)
  }
}

module.exports = {getConfigFile}