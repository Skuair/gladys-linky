var getParamsClient = require('./linky.getParamsClient.js');
var Promise = require('bluebird');
var getAPIConsom = require('./linky.getAPIConsom.js');

module.exports = function init(){
    return getParamsClient()
        .then((paramsUser) => {
			var timerecupconso = 720;
            // get consomation frequency
            sails.log.debug(`getConsumption will scan device each ${timerecupconso} minutes.`);
            // scan checkuserspresence at the given frequency
            setInterval(function(){
                getAPIConsom({'data': paramsUser});
                }, parseInt(timerecupconso)*60*1000);
        })
		.catch(function(err){
			return false;
		});
};