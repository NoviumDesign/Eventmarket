var home = require('../controllers/home'),
    contacts = require('../controllers/contacts'),
    tickets = require('../controllers/tickets'),
    api = require('../controllers/api'),
    hitlist = require('../controllers/hitlist'),
    conference = require('../controllers/conference'),
    backstage = require('../controllers/backstage'),
    admin = require('../controllers/admin'),
    passport = require('passport');

module.exports.initialize = function(app) {
    // General pages
    app.get('/', home.index);
    app.get('/om-eventmarket', home.about);
    app.get('/annonsera', home.advertising);
    app.get('/annonsera', home.advertising);
    app.get('/kontakta-oss', home.contact);
    app.get('/redaktionen', home.editor);
    app.get('/tips', home.tips);
    app.get('/bildarkiv', home.photoarchive);
    app.get('/erbjudanden', home.offers);

    // Event pages
    app.get('/event', hitlist.index);
    app.get('/event/aktiviteter', hitlist.aktiviteter);
    
    // Conference pages
    app.get('/konferens', conference.index);

    // Ticket pages
    app.get('/biljett', tickets.index);
    app.get('/biljett/teater-underhallning', tickets.theaterentertainment);

    // API 
    app.get('/api/events', api.events);
    app.get('/api/prstpage', api.prstpage);
    app.get('/api/person', api.person);
    app.get('/api/login', api.login);
    app.get('/api/banner', api.banner);
    app.get('/api/category', api.category);
    app.get('/api/newcategory', api.newcategory);

    // Protected pages
    app.get('/login', home.login);
    app.get('/admlogin', home.admlogin);
    app.post('/auth/local', 
      passport.authenticate('local', { 
        successRedirect: '/backstage/start',
        failureRedirect: '/login'
      })
    );
    // Admin login
    app.post('/adm/local', 
      passport.authenticate('local', { 
        successRedirect: '/admin',
        failureRedirect: '/admlogin'
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

    function requireAdminLogin(req, res, next) {
      if (req.user && req.user.RootAdmin == '1') {
        next();
      } else {
        res.redirect("/admlogin");
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
    app.get("/backstage/medlems-tips", backstage.membertips);

    /** 
     * Automatically apply the `requireLogin` middleware to all
     * backstage routes
     */
    app.all("/admin/*", requireAdminLogin, function(req, res, next) {
      console.log('Protected route.');
      next();
    });
    
    // Admin pages 
    app.get('/admin', requireAdminLogin, admin.start);
    app.get('/admin/prstpage', admin.prstpage);
    app.get('/admin/prstpage/id/:PageICID', admin.editprstpage);
    
    // Person / login
    app.get('/admin/person', admin.person);
    app.get('/admin/person/id/:PersonID', admin.editperson);
    app.post('/admin/person/id/:PersonID', admin.saveperson);


    // Banner
    app.get('/admin/banner', admin.banner);
    app.get('/admin/editbanner/id/:BannerICID', admin.editbanner);
    app.post('/admin/editbanner/id/:BannerICID', admin.savebanner);
    
    app.get('/admin/category', admin.category);
    app.get('/admin/category/id/:CategoryICID', admin.editcategory);
    app.get('/admin/newcategory', admin.newcategory);
    app.get('/admin/editnewcategory/id/:categoryId', admin.editnewcategory);
    app.post('/admin/editnewcategory/id/:categoryId', admin.savenewcategory);
    
    /*app.get('/api/contacts', contacts.index);
    app.get('/api/contacts/:id', contacts.getById);
    app.post('/api/contacts', contacts.add);
    // app.put('/api/contacts', contacts.update);
    app.delete('/api/contacts/:id', contacts.delete);*/
};
