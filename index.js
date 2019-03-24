module.exports = function(sails) {
    
    //var setup = require('./lib/setup.js');
    //var exec = require('./lib/exec.js');
    var init = require('./lib/init.js');
    var install = require('./lib/install.js');
	var initialize = require('./lib/initialize.js');
	var getParamsClient = require('./lib/getParamsClient.js');
	var getAPIConsom = require('./lib/getAPIConsom.js');

	


    //var uninstall = require('./lib/uninstall.js');

    gladys.on('ready', function(){
        init();
    });

    return {
      //setup: setup,
      install: install,
      //uninstall: uninstall,
	  //exec: exec,
	  initialize: initialize,
	  getParamsClient: getParamsClient,
	  getAPIConsom: getAPIConsom
    };
};
