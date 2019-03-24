var queries = require('./queries.js');
var Promise = require('bluebird');
var linky = require('@bokub/linky');

module.exports = function getAPIConsom(params){
       sails.log.debug(`Linky : getAPIConsom`);

// Log in
var session = await linky.login(params.clientId, params.clientSecret);

// Retrieve your power consumption
data = await session.getDailyData();
console.log(data);

/*
       return gladys.utils.sql(queries.getTPLINKType, [params.type])
       .then((DevicesSelect) => {
                return [DevicesSelect];
       })
       .spread((DevicesSelect) => {
            return Promise.map(DevicesSelect, function(device, index) {
                     var client = new Hs100Api.Client();
                     var splitdevice = device.identifier.split(":");

                     var plug = client.getDevice({host: splitdevice[0],port: splitdevice[1],timeout: 3000})
                     .then((deviceresult)=>{ 
                             deviceresult.getConsumption()
                             .then((resultat) => {
                                      return gladys.deviceState.create({devicetype: device.d_id, value: resultat[device.type]}) // ne pas oublier de changer l'ID
                                      .then(status => {
                                           // Device updated with success
                                            return Promise.resolve();
                                       }) 
                                       .catch(function(err){
                                           // something bad happened 
                                           return reject(err);
                                       });
                             });
                     });
            });
       });
	   
*/	   
	   
};