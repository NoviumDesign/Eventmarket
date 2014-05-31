// login.js
//var models('require')
var objectModel, _data = {}, _originalData = {}, bcrypt = require('bcrypt'), models = require('../models');

module.exports.addPostData = function(post, next) {
  _data = post;
  next();
}
module.exports.save = function(next) {
  if (_data._id) {
    models.Login.findById(_data._id, function (err, login) {
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

        login.LastUpdated      = helpers.sqlDateFormat(new Date());
        // login.Pwd = _data.Pwd: 'w4/t/pJRX5qqo09fMVdSSm4HdAU¯',
        // login.PwdCreated=_data.PwdCreated;
        if (_data.newpwd != '') {
          bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(_data.newpwd, salt, function(err, hash) {
                    login.password   = hash;
                    login.PwdCreated = helpers.sqlDateFormat(new Date());
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
    });
  } else {
    console.log('Creating new user!');
    login = new models.Login(_data);
    login.LastUpdated      = helpers.sqlDateFormat(new Date());

    if (_data.newpwd != '') {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(_data.newpwd, salt, function(err, hash) {
          login.Pwd   = hash;
          login.PwdCreated = helpers.sqlDateFormat(new Date());
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
}