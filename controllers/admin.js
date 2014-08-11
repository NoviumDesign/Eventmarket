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
    models.intresse.find({},null, {sort:{sortOrder: -1}}, function (err, intresse) {
      console.log(intresse);
      res.render('admin/kundkortlista', {
        usr: req.user.toObject(),
        pageClass: 'admin-kundkortlista',
        title: 'ADMIN',
        intresse: intresse
      });
    });
  },
  kundkort: function (req, res) {
    var massagedIntressen = [];
    
    models.Country.find({}, function (err, country) {
      models.Region.find({}, function (err, region) {
        crmModels.CRMContactObject.findById(req.param("KundkortID")).populate('PersonObject').exec(function (err, page) {
          //console.log(page);
          if (page) {
            models.Organization.findOne({_id: page.PersonObject.OrgMembership[0]}, function (err, org) {
                /**
                 * All checked interests
                 */
                var checked = page.intresse.map(
                  function (elem) {
                    return elem.value;
                  }
                );
                /**
                 * Parse in org details on customer card and save
                 */
                /*if (org) {
                  var kundtitle = org.OrgName;
                } else {
                  var kundtitle = page.PersonObject.FirstName +' '+page.PersonObject.LastName;
                }*/
                var kundtitle = page.PersonFullText.replace('<br/>', ' | ');
                // Setup person hidden input
                var hiddenPersonal = '';
                for(var i = 0; i < page.Personal.length; i++){
                  if (i === 0) {
                    hiddenPersonal += page.Personal[i].personObject;
                  } else {
                    hiddenPersonal += ','+page.Personal[i].personObject;
                  }
                }
                var historik = JSON.stringify(page.Historik);
                
                models.intresse.find({}, function (err, cats) {
                  async.each(
                    cats,
                    function (cat, callback) {
                      cat = cat.toObject();
                      var ncat = {};
                      ncat.id = cat._id;
                      ncat.text = cat.name;
                      ncat.parent = cat.parent === '' ? '#' : cat.parent;
                      ncat.icon = '';
                      ncat.state = {};
                      if (checked.indexOf(cat._id.toString()) !== -1) {
                        ncat.state.selected = true;
                      }

                      massagedIntressen.push(ncat);
                      callback();
                    },
                    function (err) {
                      res.render('admin/kundkort', {
                        contactObject: page.toObject(),
                        hiddenPersonal: hiddenPersonal,
                        currentUser: req.user,
                        region: region,
                        historik: historik,
                        country: country,
                        intresse: JSON.stringify(massagedIntressen),
                        kundtitle: kundtitle,
                        pageClass: 'admin-kundkort', 
                        title: 'ADMIN',
                        messages: req.flash('info'),
                      });
                    }
                  );
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
        // Intressen
        var cats = [];
        if (req.body.intresse.length > 0) {
          cats = JSON.parse(req.body.intresse);
        }
        var reCats = [];
        async.each(
          cats,
          function (cat, callback) {
            reCats.push({ value : cat });
            callback();
          },
          function (err) {
            if (err) console.log(err);
            crmObj.intresse = reCats;
            // Logo url
            crmObj.LogoURL             = req.body.LogoURL;
            crmObj.AccessGroupFullText = req.body.AccessGroupFullText;

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

            // Personal
            crmObj.Personal = [];
            var personal = req.body.hiddenPersonal.split(',');
            async.eachSeries(
              personal,
              function (personId, callback) {
                models.Person.findById(personId).exec(function(err, prs){
                  var pers = { 
                    img: '',
                    fullName: prs.FirstName+' '+prs.LastName,
                    title: prs.PersonalTitle,
                    email: prs.Email,
                    phone: prs.Phone,
                    rank: 1,
                    personObject: prs._id
                  }
                  crmObj.Personal.push(pers);
                  callback();
                });
              },
              function (err) {
                // Setup fulltext for search
                if (crmObj.Organization.OrgName.length > 0) {
                  crmObj.PersonFullText = crmObj.Organization.OrgName +'<br/>'+ crmObj.Personal[0].fullName;
                } else {
                  crmObj.PersonFullText = crmObj.Personal[0].fullName;
                }
                crmObj.save(function(err){
                  req.flash('info', 'Kundkort uppdaterat!');
                  res.redirect('/admin/kundkort/id/' + req.body._id);
                });
              }
            ); // End async eachSeries
          }
        ); // End async each cats
      } else {
        res.redirect('/admin/kundkort/id/' + req.body._id);
      }
    });
  },

  /**
   * Edit profile page
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  profilsida: function(req, res) {
    var massagedCats = [];

    models.Country.find({}, function (err, country) {
      models.Region.find({}, function (err, region) {
        models.PRSTPage.findById(req.param('profilSidaId'), function (err, page) {
          if (page) {
            // Fetch from CrmContactObject if empty
            // page.OrgName : String,
            

            var checked = page.newCategory.map(
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
                  var geocoderProvider = 'google';
                  var httpAdapter = 'http';
                  // optionnal
                  /*var extra = {
                      apiKey: 'YOUR_API_KEY', // for map quest
                      formatter: null         // 'gpx', 'string', ...
                  };
                  */
                  var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);
                  geocoder.geocode(page.Address1 + ' '+ page.Zipcode + ' ' + page.City, function(err, geo) {
                    res.render('admin/profilsida', {
                      page: page.toObject(),
                      region: region,
                      country: country,
                      geo: geo,
                      cats: JSON.stringify(massagedCats),
                      pageClass: 'admin-profilsida',
                      title: 'ADMIN',
                      messages: req.flash('info')
                    });
                  });

                  
                }
              );
            }); // new category find



          }
        });
      });
    });
  },
  saveprofilsida: function(req, res) {
    if (req.body._id !== '') {
      if (req.body.deletePage == 'Radera') {
      
        models.PRSTPage.findById(req.body._id, function (err, bnr) {
          if (err) console.log(err);
          bnr.remove(function(err) {
            if (err) console.log(err);
            res.redirect('/admin');
          });
        });
        
      } else {

        // Sort cats
        var cats = [];
        if (req.body.newCategory.length > 0) {
          cats = JSON.parse(req.body.newCategory);
        } 
        var reCats = [];
        async.each(
          cats,
          function (cat, callback) {
            reCats.push({ value : cat });
            callback();
          },
          function (err) {
            if (err) console.log(err);

            models.PRSTPage.findById(req.body._id, function (err, bnr) {
              bnr.Title = req.body.Title;
              bnr.OrgName = req.body.OrgName;
              bnr.TextField1 = req.body.TextField1;
              bnr.Address1 = req.body.Address1;
              bnr.Zipcode = req.body.Zipcode;
              bnr.City = req.body.City;
              bnr.RegionID = req.body.RegionID;
              bnr.CountryID = req.body.CountryID;
              bnr.Phone = req.body.Phone;
              bnr.Mobile = req.body.Mobile;
              bnr.Email = req.body.Email;
              bnr.FacebookURL = req.body.FacebookURL;
              bnr.TwitterURL = req.body.TwitterURL;
              bnr.InstaURL = req.body.InstaURL;
              bnr.LogoImg = req.body.LogoImg;
              bnr.EventText = req.body.EventText;
              bnr.LargestCompany = req.body.LargestCompany;
              bnr.NoMeetingRooms = req.body.NoMeetingRooms;
              bnr.LargestMeetingRoom = req.body.LargestMeetingRoom;
              bnr.SittingGuests = req.body.SittingGuests;
              bnr.MingleGuests = req.body.MingleGuests;
              bnr.NoBeds = req.body.NoBeds;
              bnr.price = req.body.price;
              bnr.newCategory = reCats;
              bnr.presTitle = req.body.presTitle;
              bnr.InfoText1 = req.body.InfoText1;
              bnr.extraTabName = req.body.extraTabName;
              bnr.extraTitle = req.body.extraTitle;
              bnr.extraText = req.body.extraText;
              var media = [];
              for (var mkey in req.body.mediaImg) {
                media.push({img: req.body.mediaImg[mkey], bildtext: req.body.mediaText[mkey]});
              }
              bnr.media = media;
              //bnr.media950 = req.body.media950;
              //bnr.text950 = req.body.text950;
              bnr.mapAddress = req.body.mapAddress;
              bnr.pageType = req.body.pageType;
              bnr.ActivatedDate = req.body.ActivatedDate;
              bnr.ExpiryDate = req.body.ExpiryDate;
              bnr.TopDate = req.body.TopDate;
              bnr.TopEndDate = req.body.TopEndDate;
              bnr.Visible = req.body.Visible;
              bnr.seoUrl = req.body.seoUrl;
              // @deprecated bnr.seoTitle = req.body.seoTitle;
              bnr.seoDescription = req.body.seoDescription;
              bnr.seoTags = req.body.seoTags;
              bnr.CreatedDate = req.body.CreatedDate;
              bnr.LastUpdated = req.body.LastUpdated;
              bnr.lat = req.body.lat;
              bnr.lon = req.body.lon;
              bnr.Url = req.body.url;
              bnr.TextField4 = req.body.TextField4;
              bnr.TextField3 = req.body.TextField3;
              bnr.InfoText2 = req.body.InfoText2;
              
              bnr.save(function (err, bnr) {
                console.log(err);
                res.redirect('/admin/profilsida/id/' + req.body._id);
              });
            });
          }
        ); // End async.each
      } // Endif not delete
    } else {
      // New page
      
    }
  },
  /**
   * Load person >> load login >> load group name >> save group name as fulltext to CRMContactObject
   * @return {void}     
   * @deprecated See indexer.js
   */
  reindexall: function (req, res) {
    //indexer.orgmembership(function(){
      indexer.CRMContactObjectsWithHistory(function() {
        console.log('All done!');
        //die();
      });
    //});
  },
  
  // loadkundkort: function(req, res) {
  //   // Söka på företag / kontaktperson: 
  //   //  - ladda personer som matchar >> ladda CRMContactObjects med dessa personer
  //   //
  //   crmModels.CRMContactObject.findById('53a2cfd14e77b2375819706c').populate('PersonObject').exec(function (err, crm) {
  //     console.log(crm);
  //   });
  // },
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
  intresselista: function(req, res) {
    res.render('admin/intresselista', {pageClass: 'admin-intresselista', title: 'ADMIN'});
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
  editintresse: function(req, res) {
    models.intresse.find({ topLevel: 1}, function (err, parents) {
      if (req.param("intresseId") === 'new') {
        res.render('admin/editintresse', {
          user : req.user,
          category: {},
          parents: parents,
          pageClass: 'admin-editintresse',
          title: 'ADMIN',
          messages: req.flash('info')
        });
      } else {
        models.intresse.findOne({ _id: req.param("intresseId") }, function (err, cat) {
          if (cat) {
            res.render('admin/editintresse', {
              user : req.user,
              category: cat.toObject(),
              parents: parents,
              pageClass: 'admin-editintresse',
              title: 'ADMIN',
              messages: req.flash('info')
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
  },
  saveintresse: function (req, res) {
    if (req.body._id !== '') {
      models.intresse.findById(req.body._id, function (err, cat) {
        cat.topLevel    = req.body.topLevel;
        cat.parent      = req.body.parent;
        cat.name        = req.body.name;
        cat.visible     = req.body.visible;
        cat.sortOrder   = req.body.sortOrder;
        cat.lastUpdate  = helpers.sqlDateFormat(new Date());
        cat.notes       = req.body.notes;
        cat.icon        = req.body.icon;
        cat.createdBy   = req.user._id;
        cat.save(function (err, cat) {
          if (err) console.log(err);
          req.flash('info', 'Intressekategori uppdaterad.');
          res.redirect('/admin/editintresse/id/' + cat._id);
        });
      });
    } else {
      delete req.body._id;
      var newCat = new models.intresse(req.body);
      newCat.createdDate = helpers.sqlDateFormat(new Date());
      newCat.lastUpdate  = helpers.sqlDateFormat(new Date());
      newCat.save(function (err, events) {
        if (err) console.log(err);
        req.flash('info', 'Ny intressekategori sparad.');
        res.redirect('/admin/editintresse/id/'+ events._id);
      });
    }
  }

};
