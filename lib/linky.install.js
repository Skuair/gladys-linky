var Promise = require('bluebird');
var shared = require('./linky.shared.js');

// Create parameters
module.exports = function install () {

    var newDevice = {
      device: {
        name: 'Compteur Linky',
        protocol: 'network',
        service: 'linky',
        identifier: 'linky',
      },
      types: [
        {
			identifier:'Consommation',
			name:'Consommation Linky',
			type:'binary',
			display: true,
			unit: 'kWh',
			sensor: true,
			min: 0,
			max: 65535,
			value: 0
        }]
	};

  return gladys.param.getValues([shared.params.param1.name, shared.params.param2.name])
    .catch(() => {
      
        //is they doesn't, we create them
		return Promise.all([
			gladys.param.setValue(shared.params.param1),
			gladys.param.setValue(shared.params.param2)
		]);
  })
	.then(() => {
		return gladys.device.create(newDevice);
	})
	.then(() => {
		sails.log.info('Linky : Module installed');
		return Promise.resolve(true);
	})
  	.catch(function(err){
		return false;
  	});
 			
};

