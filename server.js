var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./app/routes'),
    mongoose = require('mongoose'),
    seeder = require('./app/seeder'),
    models = require('./app/models'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,
    app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser('some-secret-value-here'));
app.use(session({ secret: 'morphing through time', key: 'sid', cookie: { secure: false }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));


//connect to the db server:
mongoose.connect(process.env.MONGODB_CONNECTION || 'mongodb://localhost/Eventmarket');
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose...");

    // check if the db is empty, if so seed it with some contacts:
    seeder.check();
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3300/auth/google/return',
    realm: 'http://localhost:3300/'
  },
  function(identifier, profile, done) {
    models.User.findOne({ mainEmail: profile.emails[0]['value'] }, function(err, user) {
            if (err) {
                return done(err);
            } else {
                if (!user) {
                    // Add it to oppstore db
                    var newUser = new models.User();
                    newUser.profile = profile;
                    newUser.mainEmail = profile.emails[0]['value']; 
                    newUser.save(function(err, contact) {
                        if (err) {
                                console.log('Error adding user'); //res.json({error: 'Error adding contact.'});
                        } else {
                            done(null, newUser);
                        }
                    });
                } else {
                    done(null, user);
                }
            }
        });
    }
));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  models.User.findOne({ _id : id }, function(err, user) {
    console.log(user);
    done(err, user);
  });
});

//routes list:
routes.initialize(app);

app.use('/', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}


//finally boot up the server:
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
