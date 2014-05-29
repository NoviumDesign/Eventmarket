/**
 * Admin pages
 * 
 */
var models = require('../app/models');

module.exports = {
    prstpage: function(req, res) {
      res.render('admin/prstpage', {pageClass: 'admin-list', title: 'ADMIN'});
    },
    start: function(req, res) {
      res.render('admin/start', {pageClass: 'admin-start', title: 'ADMIN'});
    },
    editprstpage: function (req, res) {
      models.PRSTPage.findOne({ PageICID: req.param("PageICID") }, function (err, page) {
        if (page) {
          console.log(page);
          res.render('admin/editprstpage', { page: page.toObject(), pageClass: 'admin-start', title: 'ADMIN'} );
        } 
      });
    }
};
