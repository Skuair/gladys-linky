var Promise = require('bluebird');

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

	
	return gladys.param.setValue({name: 'LINKY_API_CLIENT_ID', value: 'USER'})
	.then(() => {
		return gladys.param.setValue({name: 'LINKY_API_CLIENT_SECRET', value: 'PASSWORD'});
	})
	.then(() => {
		return gladys.device.create(newDevice);
	})
	.then(() => {
		sails.log.info('Linky : Module installed');
		var type = {
			name: 'Linky',
			service: 'linky'
		};
		return gladys.notification.install(type);
	})
  	.catch(function(err){
		return false;
  	});
 			
};

