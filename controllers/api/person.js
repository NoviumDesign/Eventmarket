/**
 * API to find persons (personregister)
 * 
 * 
 * 
 * 
 */
var url     = require('url'),
  models    = require('../../app/models'),
  crmModels = require('../../app/CRMModels'),
  async     = require('async');

module.exports = function (req, res) {
  var q = {}, sortKey = "PersonID", sortDir = 1, searchTerm = '', sortObj = {};
  var url_parts = url.parse(req.url, true);

  for( var key in url_parts.query){
    var sp = key.split('[');
    if(sp[0] == 'sorts'){
      sortKey = sp[1].replace(']', '');
      sortDir = url_parts.query[key];
    }
    if(sp[0] == 'queries'){
      searchTerm = url_parts.query[key];
    }
  }

  if (searchTerm != '') {
    q.$or = [];
    var term = { FirstName : new RegExp(searchTerm, "i") };
    q.$or.push(term);
    var term = { LastName : new RegExp(searchTerm, "i") };
    q.$or.push(term);
    var term = { Email : new RegExp(searchTerm, "i") };
    q.$or.push(term);
  }

  sortObj[sortKey] = parseInt(sortDir, 10);

  var perPage = parseInt(url_parts.query.perPage, 10)
  , page = parseInt(url_parts.query.page, 10);
  
  models.Person.count(q, function(err, c) {
  
    models.Person.find(
      q, 
      null, 
      { sort: sortObj, skip: (perPage * page) - perPage , limit: perPage }).populate('OrgMembership').exec(
      function (err, data) {
        var sendBack = [];
        async.each(
          data,
          function(pers, callback) {
            crmModels.CRMContactObject.find({'Personal.personObject': pers._id.toString()}, function(err, ress){
              var personObject = pers.toObject();
              personObject.cards = [];
              for (var resKey in ress) {
                personObject.cards.push({'id':ress[resKey].id, 'name': ress[resKey].Organization.OrgName});
              }
              sendBack.push(personObject);
              callback();
            });
          },
          function (err) {
            // Dynatable response
            var response = {
              "records": sendBack,
              "queryRecordCount": c,
              "totalRecordCount": sendBack.length
            }
            res.json(response);
          }
        );
      }
      );
    });
}