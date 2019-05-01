var queries = require('./linky.queries.js');
var Promise = require('bluebird');
var linky = require('@bokub/linky');
var shared = require('./linky.shared.js');

module.exports = function getAPIConsomDay(params){
       sails.log.debug(`Linky : getAPIConsomDay`);

	   
try {		   
// Log in
	return linky.login(shared.clientId, shared.clientSecret)
	.then((session) => {

		return session.getDailyData()
		.then((result) => {
			shared.data = result;
			return result;
		})
		.then((result) => {
			shared.daily = result[result.length-1].value || 0;
				
			return shared.daily;
		})
		.then((result) => {
			shared.success = true;

			return gladys.utils.sql(queries.getLinkyDeviceTypeDay,[])
			.then((DevicesTypeSelect) => {

				return gladys.deviceState.create({devicetype: DevicesTypeSelect[0].id, value: shared.daily})
				.then((status) => {
					//Device updated with success
					return true;
				})
				.catch(function(err){
					// something bad happened 
					return false;
				});
			});
		});

	});

}
catch(error) {
	shared.success = false;
	console.log('linky',error);
	return false;
};
	   
};