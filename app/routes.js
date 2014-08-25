var   home   = require('../controllers/home'),
  contacts   = require('../controllers/contacts'),
  tickets    = require('../controllers/tickets'),
  api        = require('../controllers/api'),
  hitlist    = require('../controllers/hitlist'),
  conference = require('../controllers/conference'),
  backstage  = require('../controllers/backstage'),
  admin      = require('../controllers/admin'),
  passport   = require('passport'),
  crypto     = require('crypto');

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
    app.get('/event/arrangorer', hitlist.arrangorer);
    app.get('/event/underhallning', hitlist.underhallning);
    app.get('/event/forelasare-talare', hitlist.forelasaretalare);
    app.get('/event/catering', hitlist.catering);
    app.get('/event/event-motesplatser', hitlist.eventmotesplatser);
    app.get('/event/personal-tjanster', hitlist.personaltjanster);
    app.get('/event/reklam-expo', hitlist.reklamexpo);
    app.get('/event/transporter', hitlist.transporter);
    app.get('/event/teknik', hitlist.teknik);
    app.get('/event/uthyrning', hitlist.uthyrning);
    app.get('/event/ovrigt', hitlist.ovrigt);

    // Conference pages
    app.get('/konferens', conference.index);

    // Ticket pages
    app.get('/biljett', tickets.index);
    app.get('/biljett/teater-underhallning', tickets.theaterentertainment);

    // API 
    app.get('/api/events', api.events);
    app.get('/api/prstpage', api.prstpage);
    app.get('/api/prstpage/OwnerCard/:OwnerCard', api.prstpage);
    app.get('/api/person', api.person);
    app.get('/api/login', api.login);
    app.get('/api/banner', api.banner);
    app.get('/api/category', api.category);
    app.get('/api/newcategory', api.newcategory);
    app.get('/api/intresselista', api.intresselista);
    app.get('/api/customercards', api.customercards);
    app.get('/api/kundkorthistorik/kid/:kundkortid', api.kundkorthistorik);
    app.post('/api/kundkorthistorik/spara/kid/:kid', api.kundkorthistorikspara);
    app.post('/api/kundkorthistorik/tabort/kid/:kid', api.kundkorthistoriktabort);
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
    app.post('/adm/local', function(req, res, next) {
      passport.authenticate('local', { 
        successRedirect: req.session.redirect_to ? req.session.redirect_to : '/admin',
        failureRedirect: '/admlogin'
      })(req, res, next);
    });

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
      // Save request in session to redirect back to if we fail
      // @see Admin login
      req.session.redirect_to = req.url;
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

    // *** Added by front-end, might want to move to desired location
    app.get('/admin/personlista', admin.personlista);
    app.get('/admin/profilsidlista', admin.profilsidlista);
    app.get('/admin/erbjudandelista', admin.erbjudandelista);
    app.get('/admin/boxlista', admin.boxlista);
    app.get('/admin/inspirationsbildslista', admin.inspirationsbildslista);
    app.get('/admin/redaktionslista', admin.redaktionslista);
    app.get('/admin/crm', admin.crm);
    
    // Admin pages 
    app.get('/admin', requireAdminLogin, admin.start);
    app.get('/admin/kundkortlista', admin.kundkortlista);
    app.get('/admin/kundkort/id/:KundkortID', admin.kundkort);
    app.post('/admin/savekundkort', admin.savekundkort);

    // Profilsidor
    app.get('/admin/profilsida/id/:profilSidaId', admin.profilsida);
    app.post('/admin/saveprofilsida', admin.saveprofilsida);
    //app.get('/admin/loadkundkort', admin.loadkundkort);
    
    // Parse database stuff
    app.get('/admin/reindexall', admin.reindexall);
    //app.get('/admin/accessmembership', admin.accessmembership);
    //app.get('/admin/kundkort', admin.kundkort);
    //app.get('/admin/crmobjectresponsibility', admin.crmobjectresponsibility);

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
    app.get('/admin/intresselista', admin.intresselista);
    app.get('/admin/editintresse/id/:intresseId', admin.editintresse);
    app.post('/admin/editintresse/id/:intresseId', admin.saveintresse);
    // AWS S3
    app.get('/sign_s3', function(req, res){
      var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
      var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
      var S3_BUCKET      = process.env.S3_BUCKET;
      var object_name = req.query.s3_object_name;
      var mime_type = req.query.s3_object_type;
      
      var now = new Date();
      var expires = Math.ceil((now.getTime() + 10000)/1000); // 10 seconds from now
      var amz_headers = "x-amz-acl:public-read";

      var put_request = "PUT\n\n"+mime_type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+object_name;

      var signature = crypto.createHmac('sha1', AWS_SECRET_KEY).update(put_request).digest('base64');
      signature = encodeURIComponent(signature.trim());
      signature = signature.replace('%2B','+');

      var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+object_name;

      var credentials = {
          signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
          url: url
      };
      res.write(JSON.stringify(credentials));
      res.end();
  });
    /*app.get('/api/contacts', contacts.index);
    app.get('/api/contacts/:id', contacts.getById);
    app.post('/api/contacts', contacts.add);
    // app.put('/api/contacts', contacts.update);
    app.delete('/api/contacts/:id', contacts.delete);*/
};
