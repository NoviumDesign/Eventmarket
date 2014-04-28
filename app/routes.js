var home = require('../controllers/home'),
    contacts = require('../controllers/contacts'),
    api = require('../controllers/api'),
    hitlist = require('../controllers/hitlist'),
    passport = require('passport');

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/hitlist', hitlist.index);

    app.get('/login', home.login);
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });
    
    app.get('/auth/google', passport.authenticate('google'));
    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    app.get('/auth/google/return', 
      passport.authenticate('google', { successRedirect: '/',
                                        failureRedirect: '/login' }));
    app.get('/api/events', api.events);

    /*app.get('/api/contacts', contacts.index);
    app.get('/api/contacts/:id', contacts.getById);
    app.post('/api/contacts', contacts.add);
    // app.put('/api/contacts', contacts.update);
    app.delete('/api/contacts/:id', contacts.delete);*/
};
