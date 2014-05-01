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
    }
};
