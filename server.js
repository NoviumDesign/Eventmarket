require('newrelic');

var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./app/routes'),
    mongoose = require('mongoose'),
    seeder = require('./app/seeder'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    passport = require('./app/passport.js'),
    flash = require('connect-flash'),
    autoIncrement = require('mongoose-auto-increment'),
    app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser('some-secret-value-here'));
app.use(session({
  secret: 'morphing through time', 
  key: 'sid', 
  cookie: { secure: false }, 
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(logger('dev'));

//connect to the db server:
mongoose.connect(process.env.MONGODB_CONNECTION || 'mongodb://localhost/Eventmarket');
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose...");
    var models = require('./app/models');
    // check if the db is empty, if so seed it with some contacts:
    seeder.check();

    // Login strategies
    passport.initialize(app);

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
});


