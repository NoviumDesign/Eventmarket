var passport = require('passport'),
    bcrypt = require('bcrypt'),
    models = require('./models.js'),
    localStrategy = require('passport-local').Strategy;


module.exports.initialize = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new localStrategy(
    function(username, password, done) {
      models.Login.findOne({ LoginName: username }, function(err, usr) {
        if (err) { return done(err); }
        if (!usr) {
          return done(null, false, { message: 'Incorrect details.' });
        }
        bcrypt.compare(password, usr.Pwd, function(err, res) {
          if (res == true) {
            usr.Pwd = undefined;
            // Load person data and attach to object
            models.Person.find({PersonID: parseInt(usr.PersonID, 10)}, function(err, bla){
              if (err) {
                console.log(err);
              } else {
                usr.PersonData = bla[0];
              }
              return done(null, usr);
            });
          } else {
            return done(null, false, { message: 'Incorrect details.' });
          }
        });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    models.Login.findById(id, function (err, user) {
      user.Pwd = undefined;
      // Load person data and attach to object
      models.Person.find({PersonID: parseInt(user.PersonID, 10)}, function(err, bla){
        if (err) {
          console.log(err);
        } else {
          user.PersonData = bla[0];
        }
        done(err, user);  
      });
      
    });
  });
}