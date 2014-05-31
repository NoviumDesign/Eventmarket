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
            return done(null, usr);
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
      done(err, user);  
    });
  });
}