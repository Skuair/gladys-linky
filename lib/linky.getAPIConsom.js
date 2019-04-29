var queries = require('./linky.queries.js');
var Promise = require('bluebird');
var linky = require('@bokub/linky');
var shared = require('./linky.shared.js');

module.exports = function getAPIConsom(params){
       sails.log.debug(`Linky : getAPIConsom`);

	   
try {		   
// Log in
	return linky.login(shared.clientId, shared.clientSecret)
	.then((session) => {
		//console.log("session",session);

		return session.getDailyData()
		.then((result) => {
		console.log('data',result);
		return result;
		});

	});

// Retrieve your power consumption
//data = session.getDailyData();
//console.log(data);

}
catch(error) {
	console.log(error);
};

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