var Promise = require("bluebird");
var shared = require("./linky.shared.js");

// Create parameters
module.exports = function install() {
  var newDevice = {
    device: {
      name: "Compteur Linky",
      protocol: "network",
      service: "linky",
      identifier: "linky",
    },
    types: [
      {
        identifier: "Consumption_day",
        name: "Consommation élec. jour",
        type: "multilevel",
        display: true,
        unit: "kWh",
        sensor: true,
        min: 0,
        max: 65535,
        value: 0,
      },
      {
        identifier: "MaxPower_day",
        name: "Puissance élec. max jour",
        type: "multilevel",
        display: true,
        unit: "kVA",
        sensor: true,
        min: 0,
        max: 65535,
        value: 0,
      },
    ],
  };

  return gladys.param
    .getValues([
      shared.params.accessToken.name,
      shared.params.refreshToken.name,
      shared.params.pointId.name,
    ])
    .catch(() => {
      //is they doesn't, we create them
      return Promise.all([
        gladys.param.setValue(shared.params.accessToken),
        gladys.param.setValue(shared.params.refreshToken),
        gladys.param.setValue(shared.params.pointId),
      ]);
    })
    .then(() => {
      return gladys.device.create(newDevice);
    })
    .then(() => {
      sails.log.info("Linky : Module installed");
      return true;
    })
    .catch(function (err) {
      sails.log.error(err);
      return false;
    });
};
