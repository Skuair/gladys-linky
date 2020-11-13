var queries = require("./linky.queries.js");
var Promise = require("bluebird");
var linky = require("linky");
var moment = require("moment");
var shared = require("./linky.shared.js");

module.exports = function getAPIDatas() {
  // Consommation par jour
  function getConsumption(session, minDayConso, minDayPower, maxDay) {
    if (minDayConso == maxDay) {
      // La date minimum et maximum étant les mêmes, rien à récupérer
      return;
    }
    session
      .getDailyConsumption(minDayConso, maxDay)
      .then((result) => {
        /*
                {
                    "unit": "Wh",
                    "data": [
                        { "date": "2020-09-01", "value": 12278 },
                        { "date": "2020-09-02", "value": 15637 },
                        ...
                */
        return Promise.map(result.data, function (data, index) {
          gladys.deviceState
            .create({
              devicetype: deviceTypeConso,
              value: parseInt(data.value) / 1000 || 0,
              datetime: data.date,
            })
            .then(() => {})
            .catch(function (error) {
              sails.log.error(error);
            });
        })
          .then(() => {
            sails.log.info(
              "Linky : Données de consommation récupérées entre " +
                minDayConso +
                " et " +
                maxDay
            );
            // Seulement après avoir récupéré la conso, on appelle l'API pour MaxPower (évite les appels en parallèles)
            getMaxPower(session, minDayPower, maxDay);
          })
          .catch((error) => {
            sails.log.error(error);
          });
      })
      .catch((error) => {
        sails.log.error(error);
      });
  }

  // Puissance maximum par jour
  function getMaxPower(session, minDay, maxDay) {
    if (minDay == maxDay) {
      // La date minimum et maximum étant les mêmes, rien à récupérer
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
        return Promise.map(result.data, function (data, index) {
          gladys.deviceState
            .create({
              devicetype: deviceTypePower,
              value: parseInt(data.value) / 1000 || 0,
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
        sails.log.error(error);
      });
  }

  sails.log.debug(`Linky : getAPIConsomDay`);
  try {
    // https://github.com/bokub/linky
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

    const now = moment().format("YYYY-MM-DD");
    const dateMinForMonth = moment().subtract(30, "days").format("YYYY-MM-DD");
    let deviceTypeConso = 0;
    let deviceTypePower = 0;

    Promise.all([
      gladys.utils.sql(queries.getLinkyDeviceTypeConsoDay, []),
      gladys.utils.sql(queries.getLinkyDeviceTypePowerDay, []),
    ])
      .then(([devicesTypeSelectConsoDay, devicesTypeSelectMaxPower]) => {
        deviceTypeConso = devicesTypeSelectConsoDay[0].id;
        deviceTypePower = devicesTypeSelectMaxPower[0].id;

        //Rechercher la dernière valeur enregistrée dans les deviceState : si trouvé alors on prend le lendemain de la dernière date comme départ, sinon on prend les 30 derniers jours
        Promise.all([
          gladys.deviceState.get({ devicetype: deviceTypeConso }),
          gladys.deviceState.get({ devicetype: deviceTypePower }),
        ])
          .then(([deviceStatesDay, deviceStatesPower]) => {
            let minDayConso = "";
            let minDayPower = "";
            if (deviceStatesDay.length > 0) {
              minDayConso = moment(deviceStatesDay[0].datetime)
                .add(1, "days")
                .format("YYYY-MM-DD");
            } else {
              minDayConso = dateMinForMonth;
            }
            if (deviceStatesPower.length > 0) {
              minDayPower = moment(deviceStatesPower[0].datetime)
                .add(1, "days")
                .format("YYYY-MM-DD");
            } else {
              minDayPower = dateMinForMonth;
            }
            getConsumption(session, minDayConso, minDayPower, now);
          })
          .catch((error) => {
            sails.log.error(error);
          });
      })
      .catch((error) => {
        sails.log.error(error);
      });
  } catch (error) {
    sails.log.error(error);
  }
};
