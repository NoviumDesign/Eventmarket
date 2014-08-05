var models = require('../app/models');

module.exports = {
    index: function(req, res) {
        res.render('hitlist/index', {title: 'Hitlist', filter: 'filter', pageClass: 'hitlist'});
    },
    aktiviteter: function(req, res) {
      models.newCategory.find({ parent: '5388639224ce690000a1585c'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
          res.render('hitlist/index', {
            filter: 'aktiviteter', 
            cats: cats,
            allCats: allCats,
            mainCat: '5388639224ce690000a1585c',
            title: 'Hitlist - aktiviteter', 
            pageClass: 'hitlist hitlist-aktiviteter'
          });
        });
      });
    },
    underhallning: function(req, res) {
      models.newCategory.find({ parent: '53db63befa98900000a3546f'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'underhallning', 
            cats: cats,
            allCats: allCats,
            mainCat: '53db63befa98900000a3546f',
            title: 'Hitlist - Underhållning', 
            pageClass: 'hitlist hitlist-underhallning'
          });
        });
      });
    }
};