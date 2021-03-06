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
            allCats: JSON.stringify(allCats),
            mainCat: '5388639224ce690000a1585c',
            title: 'Hitlist - aktiviteter', 
            pageClass: 'hitlist hitlist-aktiviteter'
          });
        });
      });
    },
    arrangorer: function(req, res) {
      models.newCategory.find({ parent: '5389ebae1b20da2549ff18bc'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {
          res.render('hitlist/index', {
            filter: 'arrangorer', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '5389ebae1b20da2549ff18bc',
            title: 'Hitlist - Arrangörer', 
            pageClass: 'hitlist hitlist-arrangorer'
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
            allCats: JSON.stringify(allCats),
            mainCat: '53db63befa98900000a3546f',
            title: 'Hitlist - Underhållning', 
            pageClass: 'hitlist hitlist-underhallning'
          });
        });
      });
    },
    forelasaretalare: function(req, res) {
      models.newCategory.find({ parent: '53e0f4ec198b7b00003ba173'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'forelasaretalare', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e0f4ec198b7b00003ba173',
            title: 'Hitlist - Föreläsare & Talare', 
            pageClass: 'hitlist hitlist-forelasaretalare'
          });
        });
      });
    },
    catering: function(req, res) {
      models.newCategory.find({ parent: '53e103aa452922000057f9c4'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'catering', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e103aa452922000057f9c4',
            title: 'Hitlist - Catering', 
            pageClass: 'hitlist hitlist-catering'
          });
        });
      });
    },
    eventmotesplatser: function(req, res) {
      models.newCategory.find({ parent: '53e11260df7d890000809784'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'eventmotesplatser', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e11260df7d890000809784',
            title: 'Hitlist - Event & Mötesplatser', 
            pageClass: 'hitlist hitlist-eventmotesplatser'
          });
        });
      });
    },
    personaltjanster: function(req, res) {
      models.newCategory.find({ parent: '53e149685c6f056e4d6f0b50'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'personaltjanster', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e149685c6f056e4d6f0b50',
            title: 'Hitlist - Personal & Tjänster', 
            pageClass: 'hitlist hitlist-personaltjanster'
          });
        });
      });
    },
    reklamexpo: function(req, res) {
      models.newCategory.find({ parent: '53e14b57d5827f555179ee2a'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'reklamexpo', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e14b57d5827f555179ee2a',
            title: 'Hitlist - Reklam & Expo', 
            pageClass: 'hitlist hitlist-reklamexpo'
          });
        });
      });
    },
    transporter: function(req, res) {
      models.newCategory.find({ parent: '53e14eda312cac53640666ae'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'transporter', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e14eda312cac53640666ae',
            title: 'Hitlist - Transporter', 
            pageClass: 'hitlist hitlist-transporter'
          });
        });
      });
    },
    teknik: function(req, res) {
      models.newCategory.find({ parent: '53e151efe05855fe6dea8f10'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'teknik', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e151efe05855fe6dea8f10',
            title: 'Hitlist - Teknik', 
            pageClass: 'hitlist hitlist-teknik'
          });
        });
      });
    },
    uthyrning: function(req, res) {
      models.newCategory.find({ parent: '53e1535b53ad117471805f88'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'uthyrning', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e1535b53ad117471805f88',
            title: 'Hitlist - Uthyrning', 
            pageClass: 'hitlist hitlist-uthyrning'
          });
        });
      });
    },
    ovrigt: function(req, res) {
      models.newCategory.find({ parent: '53e1557d9897c8f17b215c06'}, function(err, cats) {  
        models.newCategory.find({}, function(err, allCats) {  
        
          res.render('hitlist/index', {
            filter: 'ovrigt', 
            cats: cats,
            allCats: JSON.stringify(allCats),
            mainCat: '53e1557d9897c8f17b215c06',
            title: 'Hitlist - Övrigt', 
            pageClass: 'hitlist hitlist-ovrigt'
          });
        });
      });
    },
};