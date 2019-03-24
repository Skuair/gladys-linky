/**
 * Routes rules
 * @doc http://sailsjs.org/documentation/concepts/routes
 */

module.exports.routes = {
  'GET /linky/getAPIPeriod/:date_start/:date_end': 'Linky.getAPIPeriod',
  'GET /linky/getAPIConsomation/': 'Linky.getAPIConsomation',
  
};