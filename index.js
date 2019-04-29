module.exports = function(sails) {
    
    //var setup = require('./lib/setup.js');
    //var exec = require('./lib/exec.js');
    var init = require('./lib/linky.init.js');
    var install = require('./lib/linky.install.js');
	var initialize = require('./lib/linky.initialize.js');
	var getParamsClient = require('./lib/linky.getParamsClient.js');
	var getAPIConsom = require('./lib/linky.getAPIConsom.js');

	


    //var uninstall = require('./lib/uninstall.js');

    gladys.on('ready', function(){
        init().catch(sails.log.warn);
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
