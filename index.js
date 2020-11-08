module.exports = function (sails) {
  var init = require("./lib/linky.init.js");
  var install = require("./lib/linky.install.js");
  var getParamsClient = require("./lib/linky.getParamsClient.js");
  var getAPIDatas = require("./lib/linky.getAPIDatas.js");

  gladys.on("ready", function () {
    init().catch(sails.log.warn);
  });

  return {
    install: install,
    getParamsClient: getParamsClient,
    getAPIDatas: getAPIDatas
  };
};
