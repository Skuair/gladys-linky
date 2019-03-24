var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var ncp = Promise.promisify(require('ncp').ncp);
var loader = require("sails-util-mvcsloader")(sails);

var path = __dirname;

module.exports = function(cb) {
  var promises = [];
  console.log("Initialize myApps =========================================");

  var hookDirName = path.split('/');
  hookDirName = hookDirName[hookDirName.length-2];

  promises.push(new Promise(function(resolve, reject) {
    loader.injectAll({
      controllers: path + '/../controllers', // Path to your hook's controllers
      config: path + '/../config'// Path to your hook's config
    }, function (err) {
      if(err) return reject(err);
      return resolve();
    });
  }));
  
  Promise.all(promises)
  .then(function(){
    return cb();
  })
  .catch(function(err) { 
    sails.log.error(err);
    return cb(err);
  });
};