var shared = require("./linky.shared.js");

module.exports = function () {
  if (
    shared.accessToken == "" ||
    shared.refreshToken == "" ||
    shared.pointId == ""
  ) {
    return gladys.param
      .getValues([
        "LINKY_API_ACCESSTOKEN",
        "LINKY_API_REFRESH_TOKEN",
        "LINKY_API_POINT_ID",
      ])
      .spread((accessToken, refreshToken, pointId) => {
        shared.accessToken = accessToken;
        shared.refreshToken = refreshToken;
        shared.pointId = pointId;
        var compteClient = { accessToken, refreshToken, pointId };
        return compteClient;
      })
      .catch(function (err) {
        sails.log.error(err);
        return false;
      });
  }
};
