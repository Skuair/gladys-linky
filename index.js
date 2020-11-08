module.exports = function (sails) {
  var init = require("./lib/linky.init.js");
  var install = require("./lib/linky.install.js");
  var getParamsClient = require("./lib/linky.getParamsClient.js");
  var getAPIConsomDay = require("./lib/linky.getAPIConsomDay.js");
  var getAPIMaxLoadDay = require("./lib/linky.getAPIMaxLoadDay.js");

  gladys.on("ready", function () {
    init().catch(sails.log.warn);
  });

  return {
    install: install,
    getParamsClient: getParamsClient,
    getAPIConsomDay: getAPIConsomDay,
    getAPIMaxLoadDay: getAPIMaxLoadDay,
  };
};
