var shared = require('./linky.shared.js');

module.exports = function() {
	console.log(shared);

	if (shared.clientId == "" || shared.clientSecret == "") {
    return gladys.param.getValues(['LINKY_API_CLIENT_ID', 'LINKY_API_CLIENT_SECRET'])
            .spread((clientId, clientSecret) => {

					shared.clientId = clientId;
					shared.clientSecret = clientSecret;
					console.log(shared);
                    var compteClient = {clientId,clientSecret};			
                    return compteClient;
            })
	.catch(function(err){
		return false;
  	});
	} else {
		//var compteClient = {shared['clientId'] , shared.clientSecret};
		//return compteClient;
	}
};