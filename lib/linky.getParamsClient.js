var shared = require('linky.shared.js');

module.exports = function() {
	
	if (shared.username == "" or shared.password == "") {
    return gladys.param.getValues(['LINKY_API_CLIENT_ID', 'LINKY_API_CLIENT_SECRET'])
            .spread((clientId, clientSecret) => {

					shared.username = clientId;
					shared.password = clientSecret;
					console.log(shared);
                    var compteClient = {clientId,clientSecret};			
                    return compteClient;
            })
	.catch(function(err){
		return false;
  	});
	} else {
		var compteClient = {shared.username,shared.password};
		return compteClient;
	}
}