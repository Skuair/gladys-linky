var getParamsClient = require("./linky.getParamsClient.js");
var Promise = require("bluebird");
var getAPIDatas = require("./linky.getAPIDatas.js");

module.exports = function init() {
  return getParamsClient()
    .then((paramsUser) => {
      var timerecupconso = 720;
      // get consomation frequency
      sails.log.debug(
        `getConsumption will scan device each ${timerecupconso} minutes.`
      );
      // scan checkuserspresence at the given frequency
      setInterval(function () {
        getAPIDatas();
      }, parseInt(timerecupconso) * 60 * 1000);
    })
    .catch(function (err) {
      sails.log.error(err);
      return false;
    });
};
