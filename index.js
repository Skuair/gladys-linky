module.exports = function(sails) {
    
    //var setup = require('./lib/setup.js');
    //var exec = require('./lib/exec.js');
    var init = require('./lib/linky.init.js');
    var install = require('./lib/linky.install.js');
	//var initialize = require('./lib/linky.initialize.js');
	var getParamsClient = require('./lib/linky.getParamsClient.js');
	var getAPIConsomDay = require('./lib/linky.getAPIConsomDay.js');
	var getAPIConsomMonth = require('./lib/linky.getAPIConsomMonth.js');
	var getAPIConsomYear = require('./lib/linky.getAPIConsomYear.js');

	


    //var uninstall = require('./lib/uninstall.js');

    gladys.on('ready', function(){
        init().catch(sails.log.warn);
    });

    return {
		//setup: setup,
		install: install,
		//uninstall: uninstall,
		//exec: exec,
		//initialize: initialize,
		getParamsClient: getParamsClient,
		getAPIConsomDay: getAPIConsomDay,
		getAPIConsomMonth: getAPIConsomMonth,
		getAPIConsomYear: getAPIConsomYear

    };
};
