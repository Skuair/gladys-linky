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
			//console.log('data',result);
			shared.data = result;
			return result;
		})
		.then((result) => {
			shared.daily = result[result.length-1].value || 0;	
			return shared.daily;
		})
		.then((result) => {
			shared.success = true;
			console.log(result);
			return gladys.utils.sql(queries.getLinkyDeviceTypeDay,[])
			.then((DevicesType) => {
				return gladys.deviceState.create({devicetype: DevicesType.id, value: shared.daily})
				.then((status) => {
					//Device updated with success
					return Promise.resolve(true);
				})
				.catch(function(err){
					// something bad happened 
					return Promise.reject(err);
				});
			});
		});

	});

}
catch(error) {
	shared.success = false;
	console.log(error);
};
	   
};