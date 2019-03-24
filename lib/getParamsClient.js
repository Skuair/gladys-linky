
module.exports = function() {
    return gladys.param.getValues(['LINKY_API_CLIENT_ID', 'LINKY_API_CLIENT_SECRET'])
            .spread((clientId, clientSecret) => {
                    
                    var compteClient = {clientId,clientSecret}; 

                    return compteClient;
            });
	.catch(function(err){
		return false;
  	});
}