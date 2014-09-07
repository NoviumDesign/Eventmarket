/**
 * Admin/Person routes
 * 
 */
/*globals req, res, next */
/*jslint unparam: true*/
/*jslint nomen: true*/

'use strict';
var models = require('../../app/models'),
  async = require("async"),
  helpers = require('../../app/helpers'),
  loginObject = require('../../app/objects/login'),
  personObject = require('../../app/objects/person');

module.exports = {
  /**
   * List persons
   * 
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  person: function (req, res, next) {
    /*models.Person.find({}, function (err, pers) {
      async.each(
        pers,
        function (per, callback) {
          console.log('Writing person id' + per.PersonID);
          per.PersonID = Number(per.PersonID);
          per.save(function (err, p) {
            callback();
          });
        },
        function (err) {
          console.log('done!');
        }
      );
    });
    models.Login.find({}, function (err, pers) {
      async.each(
        pers,
        function (per, callback) {
          console.log('Writing login id' + per.LoginID);
          per.LoginID = Number(per.LoginID);
          per.PersonID = Number(per.PersonID);
          per.save(function (err, p) {
            callback();
          });
        },
        function (err) {
          console.log('done!');
        }
      );
    }); */

    res.render('admin/personlista', {messages: req.flash(), pageClass: 'admin-person', title: 'ADMIN'});
  },

  /**
   * Edit a person (form)
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  editperson: function (req, res) {
    var country = {}, culture = {};
    models.Country.find({}, function (err, country) {
      models.Culture.find({}, function (err, culture) {
        models.Region.find({}, function (err, region) {


          if (req.param("PersonID") === 'new') {
            res.render(
              'admin/newperson',
              {
                messages: req.flash('info'),
                pageClass: 'admin-newperson',
                title: 'ADMIN',
                country: country,
                culture: culture,
                region: region
              }
            );
          } else {
            // Edit existing person
            console.log('Loading PersonID ' + req.param("PersonID"));
            models.Person.findOne({ PersonID: req.param("PersonID") }, function (err, person) {
              if (err) {
                console.log(err);
              }
              if (person) {
                models.Login.findOne({PersonID: req.param("PersonID")}, function (err, login) {
                  if (err) {
                    next(err);
                  }
                  res.render(
                    'admin/editperson',
                    {
                      messages: req.flash('info'),
                      login: login ? login.toObject() : {},
                      person: person.toObject(),
                      pageClass: 'admin-editperson',
                      title: 'ADMIN',
                      country: country,
                      culture: culture,
                      region: region
                    }
                  );
                });
              } else {
                req.flash('info', 'Cant load this person');
                res.redirect('/admin/personlista');
              }
            });
          }
        }); // Region
      }); // Culture
    }); // Country
  },

  /**
   * Save a person and a login (is a tab under person form)
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  saveperson: function (req, res) {
    if (req.body.editLogin) {
      loginObject.addPostData(req.body, function () {
        loginObject.save(function (err, login) {
          req.flash('info', 'Loginuppgifter sparade');
          res.redirect('/admin/person/id/' + login.PersonID);
        });
      });
    }
    if (req.body.editperson) {
      personObject.addPostData(req.body, function () {
        personObject.save(function (err, person) {
          if (!err) {
            req.flash('info', 'Personlig data sparat');
            res.redirect('/admin/person/id/' + person.PersonID);
          } else {
            console.log(err);
          }
        });
      }); // addPostData
    }
    if (req.body.newperson) {
      personObject.addPostData(req.body, function () {
        personObject.save(function (err, person) {

          //req.flash('info', 'User was saved.');
          res.redirect('/admin/personlista');
        });
      }); // addPostData
    }
  }
};