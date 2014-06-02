/**
 * Admin pages
 * 
 */
/*globals req, res, next */
/*jslint unparam: true*/
/*jslint nomen: true*/

'use strict';
var models = require('../app/models'),
  async            = require("async"),
  helpers          = require('../app/helpers'),
  loginObject      = require('../app/objects/login'),
  personObject     = require('../app/objects/person'),
  personController = require('../controllers/admin/person');

module.exports = {
  start: function (req, res) {
    res.render('admin/start', {usr: req.user.toObject(), pageClass: 'admin-start', title: 'ADMIN'});
  },
  /**
   * Person stuff
   * 
   */
  person     : personController.person,
  editperson : personController.editperson,
  saveperson : personController.saveperson,

  prstpage: function (req, res) {
    res.render('admin/prstpage', {pageClass: 'admin-list', title: 'ADMIN'});
  },
  editprstpage: function (req, res) {
    models.PRSTPage.findOne({ PageICID: req.param("PageICID") }, function (err, page) {
      if (page) {
        res.render('admin/editprstpage', { page: page.toObject(), pageClass: 'admin-start', title: 'ADMIN'});
      }
    });
  },

  banner: function (req, res) {
    res.render('admin/banner', {pageClass: 'admin-banner', title: 'ADMIN'});
  },
  editbanner: function (req, res) {
    var massagedCats = [];

    models.BANRBanner.findOne({ BannerICID: req.param("BannerICID") }, function (err, banner) {
      if (banner) {
        var checked = banner.subCategory.map(
          function (elem) {
            return elem.value;
          }
        );
        models.newCategory.find({}, function (err, cats) {
          async.each(
            cats,
            function (cat, callback) {
              cat = cat.toObject();
              var ncat = {};
              ncat.id = cat._id;
              ncat.text = cat.displayName;
              ncat.parent = cat.parent === '' ? '#' : cat.parent;
              ncat.icon = '';
              ncat.state = {};
              if (checked.indexOf(cat._id.toString()) !== -1) {
                ncat.state.selected = true;
              }

              massagedCats.push(ncat);
              callback();
            },
            function (err) {
              res.render('admin/editbanner', {
                banner: banner.toObject(),
                cats: JSON.stringify(massagedCats),
                pageClass: 'admin-editbanner',
                title: 'ADMIN'
              });
            }
          );
        }); // new category find
      } // if banner 
    }); // Banner findOne
  },
  /**
   * Save banner
   *
   */
  savebanner: function (req, res) {
    if (req.body._id !== '') {
      var cats = JSON.parse(req.body.newCategory),
        reCats = [];
      async.each(
        cats,
        function (cat, callback) {
          console.log(cat);
          reCats.push({ value : cat });
          callback();
        },
        function (err) {
          //console.log(err);// All tasks are done now

          models.BANRBanner.findById(req.body._id, function (err, bnr) {
            bnr.category        = [{}];
            bnr.subCategory     = reCats;
            bnr.BannerICID      = req.body.BannerICID;
            bnr.ModInstanceICID = req.body.ModInstanceICID;
            bnr.BannerName      = req.body.BannerName;
            bnr.StartDate       = req.body.StartDate;
            bnr.EndDate         = req.body.EndDate;
            bnr.FormatID        = req.body.FormatID;
            bnr.ImageID         = req.body.ImageID;
            bnr.ExpCounterID    = req.body.ExpCounterID;
            bnr.ClickCounterID  = req.body.ClickCounterID;
            bnr.Url             = req.body.Url;
            bnr.AltText         = req.body.AltText;
            bnr.OwnerID         = req.body.OwnerID;
            bnr.OwnerName       = req.body.OwnerName;
            bnr.OwnerOrg        = req.body.OwnerOrg;
            bnr.Notes           = req.body.Notes;
            bnr.Completed       = req.body.Completed;
            bnr.Lang            = req.body.Lang;
            bnr.LastUpdated     = req.body.LastUpdated;
            bnr.OwnerEmail      = req.body.OwnerEmail;

            bnr.save(function (err, bnr) {
              console.log(err);
              res.redirect('/admin/editbanner/id/' + bnr.BannerICID);
            });
          });
        }
      );

    } else {
      delete req.body._id;
      //var cats = JSON.parse(req.body.newCategory);
      //console.log(cats);
      /*
      var newBnr = new models.BANRBanner(req.body);
      newBnr.createdDate = new Date();
      newBnr.lastUpdate = new Date();
      newBnr.save(function(err, events) {
          console.log(err);
          console.log(events);
          res.redirect('/admin/newcategory');
      });
      */
    }
  },
  category: function (req, res) {
    res.render('admin/category', {pageClass: 'admin-category', title: 'ADMIN'});
  },
  editcategory: function (req, res) {
    models.Category.findOne({ CategoryICID: req.param("CategoryICID") }, function (err, cat) {
      if (cat) {
        res.render('admin/editcategory', { category: cat.toObject(), pageClass: 'admin-editcategory', title: 'ADMIN'});
      }
    });
  },

  /**
   * List new categories
   * 
   */
  newcategory: function (req, res) {
    res.render('admin/newcategory', {pageClass: 'admin-newcategory', title: 'ADMIN'});
  },

  /**
   * Edit a new category
   * 
   */
  editnewcategory: function (req, res) {
    models.newCategory.find({ topLevel: 1}, function (err, parents) {
      if (req.param("categoryId") === 'new') {
        res.render('admin/editnewcategory', {
          user : req.user,
          category: {},
          parents: parents,
          pageClass: 'admin-editnewcategory',
          title: 'ADMIN'
        });
      } else {
        models.newCategory.findOne({ _id: req.param("categoryId") }, function (err, cat) {
          if (cat) {
            res.render('admin/editnewcategory', {
              user : req.user,
              category: cat.toObject(),
              parents: parents,
              pageClass: 'admin-editnewcategory',
              title: 'ADMIN'
            });
          }
        });
      } // End if new
    });
  },
  /**
   * Save a new category
   * 
   */
  savenewcategory: function (req, res) {
    if (req.body._id !== '') {
      models.newCategory.findById(req.body._id, function (err, cat) {
        cat.topLevel    = req.body.topLevel;
        cat.parent      = req.body.parent;
        cat.name        = req.body.name;
        cat.displayName = req.body.displayName;
        cat.visible     = req.body.visible;
        cat.sortOrder   = req.body.sortOrder;
        cat.lastUpdate  = helpers.sqlDateFormat(new Date());
        cat.notes       = req.body.notes;
        cat.icon        = req.body.icon;
        cat.createdBy   = req.user._id;
        cat.save(function (err, cat) {
          console.log(err);
          res.redirect('/admin/editnewcategory/id/' + cat._id);
        });
      });
    } else {
      delete req.body._id;
      var newCat = new models.newCategory(req.body);
      newCat.createdDate = helpers.sqlDateFormat(new Date());
      newCat.lastUpdate  = helpers.sqlDateFormat(new Date());
      newCat.save(function (err, events) {
        console.log(err);
        console.log(events);
        res.redirect('/admin/newcategory');
      });
    }
  }

};
