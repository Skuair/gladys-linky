var getParamsClient = require('./getParamsClient.js');
var Promise = require('bluebird');
var getAPIConsom = require('./getAPIConsom.js');

module.exports = function init(){
    return getParamsClient()
        .then((paramsUser) => {
			var timerecupconso = 30;
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