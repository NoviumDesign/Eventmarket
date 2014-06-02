// login.js
//var models('require')
var objectModel, _data = {}, 
_originalData = {}, 
models = require('../models'),
autoIncrement = require('mongoose-auto-increment'),
helpers = require('../helpers'),
loginObject = require('../objects/login');

module.exports.addPostData = function(post, next) {
  _data = post;
  next();
}
module.exports.save = function(next) {
  if (_data._id) {
    console.log('Saving existing person...');
    models.Person.findById(_data._id, function (err, person) {
      if (!err) {
        //PersonID : { type: Number },
        //PersonCreated : String,
        person.CultureID                      = _data.CultureID;
        person.Hidden                         = _data.Hidden;
        person.LastUpdated                    = helpers.sqlDateFormat(new Date());
        person.NewAutoReg                     = _data.NewAutoReg;
        person.FirstName                      = _data.FirstName;
        person.LastName                       = _data.LastName;
        person.PersonalTitle                  = _data.PersonalTitle;
        person.Address1                       = _data.Address1;
        person.Address2                       = _data.Address2;
        person.Zipcode                        = _data.Zipcode;
        person.City                           = _data.City;
        person.Phone                          = _data.Phone;
        person.Fax                            = _data.Fax;
        person.Mobile                         = _data.Mobile;
        person.Email                          = _data.Email;
        person.Url                            = _data.Url;
        person.Attribute1                     = _data.Attribute1;
        person.Attribute2                     = _data.Attribute2;
        person.Attribute3                     = _data.Attribute3;
        person.CountryID                      = _data.CountryID;
        person.RegionID                       = _data.RegionID;
        person.Notes                          = _data.Notes;
        person.IDNumber                       = _data.IDNumber;
        person.BoolField1                     = _data.BoolField1;
        person.InfoText1                      = _data.InfoText1;
        person.InfoText2                      = _data.InfoText2;
        person.InfoText3                      = _data.InfoText3;
        person.IntField1                      = _data.IntField1;
        person.IntField2                      = _data.IntField2;
        person.BoolField2                     = _data.BoolField2;
        person.NotificationTypePrstRqstOpen   = _data.NotificationTypePrstRqstOpen;
        person.NotificationTypePrstRqstDirect = _data.NotificationTypePrstRqstDirect;
        person.save(function(err, person) {
          next(err, person);
        });
      }
    });
  } else {
    console.log('Creating new PERSON!');
    // new Number(per.PersonID);
    models.Person.schema.plugin(autoIncrement.plugin, { model: 'Person', field: 'PersonID' });
    person = new models.Person(_data);
    console.log(models.Person);
    person.PersonCreated = helpers.sqlDateFormat(new Date());
    person.Hidden = 0;
    person.LastUpdated = helpers.sqlDateFormat(new Date());
    person.NewAutoReg = 0;
    person.PersonalTitle = '';
    person.CountryID = 1;
    person.save(function(err, person) {
      if (!_data.newpwd) {
        // Let's create a random password
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
          _data.newpwd += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      // Set up refering field
      _data.PersonID = person.PersonID;
      loginObject.addPostData(_data, function() {
        loginObject.save(function(err, login){
          next(err, login)
        });
      });
    });
  }
}
