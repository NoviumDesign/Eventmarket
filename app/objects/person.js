// login.js
//var models('require')
var objectModel, _data = {}, 
_originalData = {}, 
models = require('../models'),
autoIncrement = require('mongoose-auto-increment'),
loginObject = require('../objects/login');

module.exports.addPostData = function(post, next) {
  _data = post;
  next();
}
module.exports.save = function(next) {
  if (_data._id) {
    /*models.Login.findById(_data._id, function (err, login) {
      if (!err) {
        login.LoginID          = _data.LoginID;
        login.DisabledUntil    = _data.DisabledUntil;
        login.Disabled         = _data.Disabled;
        //login.LastOKLogin      =_data.LastOKLogin;
        login.LoginName        = _data.LoginName;
        login.SuperUser        = _data.SuperUser;
        //login.NoOfFailedLogins =_data.NoOfFailedLogins;
        login.PersonID         = _data.PersonID;
        login.ValidUntil       = _data.ValidUntil;
        login.AutoLogin        = _data.AutoLogin;
        //login.CreatedBy        =_data.CreatedBy;
        login.RootAdmin        = _data.RootAdmin;

        login.LastUpdated      = new Date();
        // login.Pwd = _data.Pwd: 'w4/t/pJRX5qqo09fMVdSSm4HdAU¯',
        // login.PwdCreated=_data.PwdCreated;
        if (_data.newpwd != '') {
          bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(_data.newpwd, salt, function(err, hash) {
                    login.password   = hash;
                    login.PwdCreated = new Date();
                    login.save(function(err, user) {
                      next(err, user);
                    });
                });
            });
        } else {
          login.save(function(err, user) {
            next(err, user);
          });  
        }
      }
    });*/
  } else {
    console.log('Creating new PERSON!');
    // new Number(per.PersonID);
    Person.plugin(autoIncrement.plugin, { model: 'Person', field: 'PersonID' });
    person = new models.Person(_data);
    person.PersonCreated = new Date();
    person.Hidden = 0;
    person.LastUpdated = new Date();
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
