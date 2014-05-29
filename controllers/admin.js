/**
 * Admin pages
 * 
 */
var models = require('../app/models');

module.exports = {
  start: function(req, res) {
    res.render('admin/start', {pageClass: 'admin-start', title: 'ADMIN'});
  },
  prstpage: function(req, res) {
    res.render('admin/prstpage', {pageClass: 'admin-list', title: 'ADMIN'});
  },
  editprstpage: function (req, res) {
    models.PRSTPage.findOne({ PageICID: req.param("PageICID") }, function (err, page) {
      if (page) {
        res.render('admin/editprstpage', { page: page.toObject(), pageClass: 'admin-start', title: 'ADMIN'} );
      } 
    });
  },
  person: function(req, res) {
    res.render('admin/person', {pageClass: 'admin-person', title: 'ADMIN'});
  },
  editperson: function (req, res) {
    models.Person.findOne({ PersonID: req.param("PersonID") }, function (err, person) {
      if (person) {
        res.render('admin/editperson', { person: person.toObject(), pageClass: 'admin-editperson', title: 'ADMIN'} );
      }
    });
  }
};
