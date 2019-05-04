var queries = require('./linky.queries.js');
var Promise = require('bluebird');
var linky = require('@bokub/linky');
var shared = require('./linky.shared.js');
var getAPIConsomYear = require('./linky.getAPIConsomYear.js');


module.exports = function getAPIConsomMonth(params){
	sails.log.debug(`Linky : getAPIConsomMonth`);
	shared.success = false;
	   
try {		   
// Log in
	return linky.login(shared.clientId, shared.clientSecret)
	.then((session) => {

		return session.getMonthlyData()
		.then((result) => {
			shared.data_month = result;
			console.log(result);
			return result;
		})
		.then((result) => {
			shared.monthly = result[result.length-1];
			return shared.monthly;
		})
		.then((result) => {
			shared.success = true;
			
			return gladys.utils.sql(queries.getLinkyDeviceTypeMonth,[])
			.then((DevicesTypeSelect) => {

				return Promise.map(shared.data_month, function(data, index) {

					return gladys.deviceState.create({devicetype: DevicesTypeSelect[0].id, value: data.value || 0, datetime: data.date})
					.then(status => {
						// Device updated with success
						return true;
					}) 
					.catch(function(err){
						// something bad happened 
						return false;
					});
				})
				.then((status) => {
					//Device updated with success
					return getAPIConsomYear();
				})
				.catch(function(err){
					// something bad happened 
					console.log('linky',error);
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