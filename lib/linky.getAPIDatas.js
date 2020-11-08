var queries = require("./linky.queries.js");
var Promise = require("bluebird");
var linky = require("linky");
var moment = require("moment");
var shared = require("./linky.shared.js");

module.exports = function getAPIDatas() {
  sails.log.debug(`Linky : getAPIConsomDay`);
  shared.success = false;

  // https://github.com/bokub/linky
  try {
    const session = new linky.Session({
      accessToken: shared.accessToken,
      refreshToken: shared.refreshToken,
      usagePointId: shared.pointId,
      onTokenRefresh: (accessToken, refreshToken) => {
        shared.params.accessToken.value = accessToken;
        shared.params.refreshToken.value = refreshToken;
        Promise.all([
          gladys.param.setValue(shared.params.accessToken),
          gladys.param.setValue(shared.params.refreshToken),
        ])
          .then(() => {
            shared.accessToken = accessToken;
            shared.refreshToken = refreshToken;
          })
          .catch((err) => sails.log.error(err));
      },
    });

    const minDay = moment().subtract(7, "days").format("YYYY-MM-DD");
    const now = moment().subtract(1, "days").format("YYYY-MM-DD"); // yesterday

    // Consommation par jour
    session
      .getDailyConsumption(minDay, now)
      .then((result) => {
        /*
            {
                "unit": "Wh",
                "data": [
                    { "date": "2020-09-01", "value": 12278 },
                    { "date": "2020-09-02", "value": 15637 },
                    ...
            */
        shared.success = true;
        gladys.utils
          .sql(queries.getLinkyDeviceTypeConsoDay, [])
          .then((DevicesTypeSelect) => {
            return Promise.map(result.data, function (data, index) {
              gladys.deviceState
                .create({
                  devicetype: DevicesTypeSelect[0].id,
                  value: data.value || 0,
                  datetime: data.date,
                })
                .then(() => {})
                .catch(function (error) {
                  sails.log.error(error);
                });
            });
          })
          .then(() =>
            sails.log.info(
              "Linky : Données de consommation récupérées entre " +
                minDay +
                " et " +
                now
            )
          )
          .catch((error) => {
            sails.log.error(error);
          });
      })
      .catch((error) => {
        shared.success = false;
        sails.log.error(error);
      });

    // Puissance maximum par jour
    session
      .getMaxPower(minDay, now)
      .then((result) => {
        /*
            {
                "unit": "VA",
                "data": [
                    { "date": "2020-08-24 13:54:04", "value": 1941 },
                    { "date": "2020-08-25 01:48:26", "value": 1648 },
                    ...
            */
        shared.success = true;
        gladys.utils
          .sql(queries.getLinkyDeviceTypePowerDay, [])
          .then((DevicesTypeSelect) => {
            return Promise.map(result.data, function (data, index) {
              gladys.deviceState
                .create({
                  devicetype: DevicesTypeSelect[0].id,
                  value: data.value || 0,
                  datetime: data.date,
                })
                .then(() => {})
                .catch(function (error) {
                  sails.log.error(error);
                });
            });
          })
          .then(() =>
            sails.log.info(
              "Linky : Données de puissance maximum récupérées entre " +
                minDay +
                " et " +
                now
            )
          )
          .catch((error) => {
            sails.log.error(error);
          });
      })
      .catch((error) => {
        shared.success = false;
        sails.log.error(error);
      });
  } catch (error) {
    shared.success = false;
    sails.log.error(error);
  }
};
