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

    //Rechercher la dernière valeur enregistrée dans les deviceState : si trouvé alors on prend le lendemain de la date comme départ, sinon on prend les 30 derniers jours
    const now = moment().format("YYYY-MM-DD");
    let deviceTypeDay = 0;
    let deviceTypePower = 0;

    gladys.utils.sql(queries.getLinkyDeviceTypeConsoDay, [])
    .then(
      (devicesTypeSelect) => {
        deviceTypeDay = devicesTypeSelect[0].id;
        gladys.deviceState.get({ devicetype: deviceTypeDay })
        .then((deviceStates) => {
          let minDay = "";
          if (deviceStates.length > 0) {
            minDay = moment(deviceStates[0].datetime).add(1, "days").format("YYYY-MM-DD");
          }
          else {
            minDay = moment().subtract(30, "days").format("YYYY-MM-DD");
          }
          getConsumption(minDay, now);
        })
        .catch((error) => {
          sails.log.error(error);
        });
      }
    )
    .catch((error) => {
      shared.success = false;
      sails.log.error(error);
    });

    // gladys.utils.sql(queries.getLinkyDeviceTypePowerDay, [])
    // .then(
    //   (devicesTypeSelect) => {
    //     deviceTypePower = devicesTypeSelect[0].id;
    //     gladys.deviceState.get({ devicetype: deviceTypePower })
    //     .then((deviceStates) => {
    //       let minDay = "";
    //       if (deviceStates.length > 0) {
    //         minDay = moment(deviceStates[0].datetime).add(1, "days").format("YYYY-MM-DD");
    //       }
    //       else {
    //         minDay = moment().subtract(30, "days").format("YYYY-MM-DD");
    //       }
    //       getMaxPower(minDay, now);
    //     })
    //     .catch((error) => {
    //       sails.log.error(error);
    //     });
    //   }
    // )
    // .catch((error) => {
    //   shared.success = false;
    //   sails.log.error(error);
    // });

    // Consommation par jour
    function getConsumption(minDay, maxDay) {
      if (minDay == maxDay) {
        // La date minimum et maximum étant les mêmes, rien à récupérer
        shared.success = true;
        return;
      }
      session
      .getDailyConsumption(minDay, maxDay)
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
        return Promise.map(result.data, function (data, index) {
          gladys.deviceState
            .create({
              devicetype: deviceTypeDay,
              value: (parseInt(data.value) / 1000) || 0,
              datetime: data.date,
            })
            .then(() => {})
            .catch(function (error) {
              sails.log.error(error);
            });
        })
        .then(() =>
          sails.log.info(
            "Linky : Données de consommation récupérées entre " +
              minDay +
              " et " +
              maxDay
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
    }

    // Puissance maximum par jour
    function getMaxPower(minDay, maxDay) {
      if (minDay == maxDay) {
        // La date minimum et maximum étant les mêmes, rien à récupérer
        shared.success = true;
        return;
      }
      session
        .getMaxPower(minDay, maxDay)
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
          return Promise.map(result.data, function (data, index) {
            gladys.deviceState
              .create({
                devicetype: deviceTypePower,
                value: (parseInt(data.value) / 1000) || 0,
                datetime: data.date,
              })
              .then(() => {})
              .catch(function (error) {
                sails.log.error(error);
              });
          })
          .then(() =>
            sails.log.info(
              "Linky : Données de puissance maximum récupérées entre " +
                minDay +
                " et " +
                maxDay
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
    }

  } catch (error) {
    shared.success = false;
    sails.log.error(error);
  }
};
