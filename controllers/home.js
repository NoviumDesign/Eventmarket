module.exports = {
    index: function(req, res) {
        res.render('home/home', {pageClass: 'home', title: 'Home'});
    },
    login: function(req, res) {
        res.render('home/login', {pageClass:'login', title: 'Logga in'});
    },

    about: function(req, res) {
      res.render('home/about', {pageClass:'about', title: 'Om Eventmarket'});
    },
    advertising: function (req, res) {
      res.render('home/advertising', {pageClass:'advertising', title: 'Annonsera'});
    },
    contact: function (req, res) {
      res.render('home/contact', {pageClass:'contact', title: 'Kontakta Oss'});
    },
    editor: function (req, res) {
      res.render('home/editor', {pageClass:'editor', title: 'Redaktionen'});
    },
    tips: function (req, res) {
      res.render('home/tips', {pageClass:'tips', title: 'Tips & Råd'});
    },
    photoarchive: function (req, res) {
      res.render('home/photoarchive', {pageClass:'photoarchive', title: 'Bildarkiv'});
    },
    offers: function (req, res) {
      res.render('home/offers', {pageClass:'offers', title: 'Erbjudanden'});
    }
};
