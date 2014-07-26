/**
 * Admin pages
 * 
 */
/*globals req, res, next */
/*jslint unparam: true*/
/*jslint nomen: true*/

'use strict';
var models = require('../app/models'),
  async            = require('async'),
  helpers          = require('../app/helpers'),
  loginObject      = require('../app/objects/login'),
  personObject     = require('../app/objects/person'),
  personController = require('../controllers/admin/person'),
  crmModels        = require('../app/CRMModels'),
  indexer          = require('../app/indexer');

module.exports = {
  start: function (req, res) {
    res.render('admin/index', {usr: req.user.toObject(), pageClass: 'admin-start', title: 'ADMIN'});
  },

  kundkortlista: function (req, res) {
    res.render('admin/kundkortlista', {usr: req.user.toObject(), pageClass: 'admin-kundkortlista', title: 'ADMIN'});
  },
  kundkort: function (req, res) {
    models.Country.find({}, function (err, country) {
      models.Region.find({}, function (err, region) {
        crmModels.CRMContactObject.findById(req.param("KundkortID")).populate('PersonObject').exec(function (err, page) {
          //console.log(page);
          if (page) {
            models.Organization.findOne({_id: page.PersonObject.OrgMembership[0]}, function (err, org) {
                /**
                 * Parse in org details on customer card and save
                 */
                if (org) {
                  var kundtitle = org.OrgName;
                } else {
                  var kundtitle = page.PersonObject.FirstName +' '+page.PersonObject.LastName;
                }
                
                res.render('admin/kundkort', {
                  contactObject: page.toObject(),
                  region: region,
                  country: country,
                  kundtitle: kundtitle,
                  pageClass: 'admin-kundkort', title: 'ADMIN',
                  messages: req.flash('info'),
                });
                
            });
          }
        });
      });
    });
  },
  /**
   * Save posted data from kundkort
   * 
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  savekundkort: function(req, res) {
    crmModels.CRMContactObject.findById(req.body._id, function (err, crmObj) {
      if(crmObj) {
        crmObj.Organization.OrgName     = req.body['Organization.OrgName'];
        crmObj.Organization.PostAddress = req.body['Organization.PostAddress'];
        crmObj.Organization.PostNumber  = req.body['Organization.PostNumber'];
        crmObj.Organization.PostOrt     = req.body['Organization.PostOrt'];
        crmObj.Organization.Tel1        = req.body['Organization.Tel1'];
        crmObj.Organization.Tel2        = req.body['Organization.Tel2'];
        crmObj.Organization.WWW         = req.body['Organization.WWW'];
        crmObj.Organization.OrgNumber   = req.body['Organization.OrgNumber'];
        crmObj.Organization.Lan         = req.body['Organization.Lan'];
        crmObj.Organization.Country     = req.body['Organization.Country'];
        crmObj.Invoice.OrgName          = req.body['Invoice.OrgName'];
        crmObj.Invoice.RefName          = req.body['Invoice.RefName'];
        crmObj.Invoice.PostAddress      = req.body['Invoice.PostAddress'];
        crmObj.Invoice.PostNumber       = req.body['Invoice.PostNumber'];
        crmObj.Invoice.PostOrt          = req.body['Invoice.PostOrt'];
        crmObj.Invoice.OrgNumber        = req.body['Invoice.OrgNumber'];
        crmObj.Invoice.InvoiceEmail     = req.body['Invoice.InvoiceEmail'];

        crmObj.save(function(err){
          req.flash('info', 'Kundkort uppdaterat!');
          res.redirect('/admin/kundkort/id/' + req.body._id);
        });
      } else {
        res.redirect('/admin/kundkort/id/' + req.body._id);
      }
    });
  },

  /**
   * Load person >> load login >> load group name >> save group name as fulltext to CRMContactObject
   * @return {void}     
   * @deprecated See indexer.js
   */
  reindexall: function (req, res) {
    //indexer.orgmembership(function(){
      indexer.CRMContactObjectsWithOrg(function() {
        console.log('All done!');
        //die();
      });
    //});
  },
  
  loadkundkort: function(req, res) {
    // Söka på företag / kontaktperson: 
    //  - ladda personer som matchar >> ladda CRMContactObjects med dessa personer
    //
    /*crmModels.CRMContactObject.find({'PersonObject.City' : 'STOCKHOLM'}).populate('PersonObject').exec(function (err, crm) {
      console.log(crm);
    });*/
    crmModels.CRMContactObject.findById('53a2cfd14e77b2375819706c').populate('PersonObject').exec(function (err, crm) {
      console.log(crm);
    });
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
