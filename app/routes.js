var home = require('../controllers/home'),
    contacts = require('../controllers/contacts'),
    api = require('../controllers/api'),
    hitlist = require('../controllers/hitlist'),
    conference = require('../controllers/conference'),
    backstage = require('../controllers/backstage'),
    passport = require('passport');

module.exports.initialize = function(app) {
    // General pages
    app.get('/', home.index);
    app.get('/om-eventmarket', home.about);
    app.get('/annonsera', home.advertising);
    app.get('/annonsera', home.advertising);
    app.get('/kontakta-oss', home.contact);
    
    // Event pages
    app.get('/event', hitlist.index);
    
    // Conference pages
    app.get('/konferens', conference.index);

    // API 
    app.get('/api/events', api.events);


    // Protected pages
    app.get('/login', home.login);
    app.post('/auth/local', 
      passport.authenticate('local', { 
        successRedirect: '/backstage/start',
        failureRedirect: '/login'
      })
    );
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    /**
     * Check backstage login for all backstage routes
     */
    function requireLogin(req, res, next) {
      if (req.user) {
        next();
      } else {
        res.redirect("/login");
      }
    }

    /** 
     * Automatically apply the `requireLogin` middleware to all
     * backstage routes
     */
    app.all("/backstage/*", requireLogin, function(req, res, next) {
      console.log('Protected route.');
      next();
    });

    app.get("/backstage/start", backstage.start);

    
    
    /*app.get('/api/contacts', contacts.index);
    app.get('/api/contacts/:id', contacts.getById);
    app.post('/api/contacts', contacts.add);
    // app.put('/api/contacts', contacts.update);
    app.delete('/api/contacts/:id', contacts.delete);*/
};
