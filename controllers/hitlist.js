var models = require('../app/models');

module.exports = {
    index: function(req, res) {
        res.render('hitlist/index', {title: 'Hitlist', filter: 'filter', pageClass: 'hitlist'});
    },
    aktiviteter: function(req, res) {
      models.newCategory.find({ parent: '5388639224ce690000a1585c'}, function(err, cats) {  
        console.log(cats);
        res.render('hitlist/index', {
          filter: 'aktiviteter', 
          cats: cats,
          title: 'Hitlist - aktiviteter', 
          pageClass: 'hitlist hitlist-aktiviteter'
        });
      });
    }
};