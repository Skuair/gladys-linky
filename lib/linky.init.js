var getParamsClient = require('./linky.getParamsClient.js');
var Promise = require('bluebird');
var getAPIConsomDay = require('./linky.getAPIConsomDay.js');

module.exports = function init(){
    return getParamsClient()
        .then((paramsUser) => {
	    var timerecupconso = 720;
            // get consomation frequency
            sails.log.debug(`getConsumption will scan device each ${timerecupconso} minutes.`);
            // scan checkuserspresence at the given frequency
            setInterval(function(){getAPIConsomDay();}, parseInt(timerecupconso)*60*1000);
        })
		.catch(function(err){
			return false;
		});
};