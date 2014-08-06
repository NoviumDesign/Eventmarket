var models = require('../app/models'),
  crmModels = require('../app/CRMModels'),
  helpers = require('../app/helpers'),
  async = require('async'),
  url    = require('url');

module.exports = {
    prstpage: function (req, res) {
      var q = {}, sortKey = "Title", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      console.log('Searching for prstpage');
      //console.log(url_parts);
      console.log(url_parts.query);
      if (req.param('OwnerCard')) {
        q.OwnerCard = req.param('OwnerCard');
      }
      // @deprecated
      q.IsStructural = "0";
      
      for( var key in url_parts.query){
        var sp = key.split('[');
        if(sp[0] == 'sorts'){
            sortKey = sp[1].replace(']', '');
            sortDir = url_parts.query[key];
        }
        if(sp[0] == 'queries'){
            searchTerm = url_parts.query[key];
        }
      }
      
      if (searchTerm != '') {
        q.$or = [];
        var term = { Title : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { TextField1 : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { Email : new RegExp(searchTerm, "i") };
        q.$or.push(term);
      }
      
      console.log(q);
      sortObj[sortKey] = parseInt(sortDir, 10);
      
      var perPage = parseInt(url_parts.query.perPage, 10)
        , page = parseInt(url_parts.query.page, 10);

      models.PRSTPage.count(q, function(err, c) {
        
        models.PRSTPage.find(
          q, 
          null, 
          { sort: sortObj, skip: (perPage * page) - perPage , limit: perPage }, 
          function (err, data) {
            // Dynatable response
            var response = {
              "records": data,
              "queryRecordCount": c,
              "totalRecordCount": data.length
            }
            res.json(response);
          }
        );
      });
    },
    // newCategory
    newcategory: function (req, res) {
      var q = {}, sortKey = "_id", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      
      for( var key in url_parts.query){
        var sp = key.split('[');
        if(sp[0] == 'sorts'){
            sortKey = sp[1].replace(']', '');
            sortDir = url_parts.query[key];
        }
        if(sp[0] == 'queries'){
            searchTerm = url_parts.query[key];
        }
      }
      
      if (searchTerm != '') {
        q.$or = [];
        var term = { Name : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { DisplayName : new RegExp(searchTerm, "i") };
        q.$or.push(term);
      }
      
      sortObj[sortKey] = parseInt(sortDir, 10);
      
      var perPage = parseInt(url_parts.query.perPage, 10)
        , page = parseInt(url_parts.query.page, 10);
      models.newCategory.count(q, function(err, c) {
        models.newCategory.find(
          q, 
          null, 
          { sort: sortObj, skip: (perPage * page) - perPage , limit: perPage }, 
          function (err, data) {
            // Dynatable response
            var response = {
              "records": data,
              "queryRecordCount": c,
              "totalRecordCount": data.length
            }
            res.json(response);
          }
        );
      });
    },
    // Category
    category: function (req, res) {
      var q = {}, sortKey = "CategoryICID", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      
      for( var key in url_parts.query){
        var sp = key.split('[');
        if(sp[0] == 'sorts'){
            sortKey = sp[1].replace(']', '');
            sortDir = url_parts.query[key];
        }
        if(sp[0] == 'queries'){
            searchTerm = url_parts.query[key];
        }
      }
      
      if (searchTerm != '') {
        q.$or = [];
        var term = { Name : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { DisplayName : new RegExp(searchTerm, "i") };
        q.$or.push(term);
      }
      
      sortObj[sortKey] = parseInt(sortDir, 10);
      
      var perPage = parseInt(url_parts.query.perPage, 10)
        , page = parseInt(url_parts.query.page, 10);
      models.Category.count(q, function(err, c) {
        models.Category.find(
          q, 
          null, 
          { sort: sortObj, skip: (perPage * page) - perPage , limit: perPage }, 
          function (err, data) {
            // Dynatable response
            var response = {
              "records": data,
              "queryRecordCount": c,
              "totalRecordCount": data.length
            }
            res.json(response);
          }
        );
      });
    },
    // Person
    person: function (req, res) {
      var q = {}, sortKey = "PersonID", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      
      for( var key in url_parts.query){
        var sp = key.split('[');
        if(sp[0] == 'sorts'){
            sortKey = sp[1].replace(']', '');
            sortDir = url_parts.query[key];
        }
        if(sp[0] == 'queries'){
            searchTerm = url_parts.query[key];
        }
      }
      
      if (searchTerm != '') {
        q.$or = [];
        var term = { FirstName : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { LastName : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { Email : new RegExp(searchTerm, "i") };
        q.$or.push(term);
      }
      
      sortObj[sortKey] = parseInt(sortDir, 10);
      
      var perPage = parseInt(url_parts.query.perPage, 10)
        , page = parseInt(url_parts.query.page, 10);
        console.log(q);
      models.Person.count(q, function(err, c) {
        console.log(c);
        models.Person.find(
          q, 
          null, 
          { sort: sortObj, skip: (perPage * page) - perPage , limit: perPage }, 
          function (err, data) {
            // Dynatable response
            var response = {
              "records": data,
              "queryRecordCount": c,
              "totalRecordCount": data.length
            }
            res.json(response);
          }
        );
      });
    },
    // Banners
    banner: function (req, res) {
      var q = {}, sortKey = "BannerICID", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      //console.log(url_parts);

      for( var key in url_parts.query){
        var sp = key.split('[');
        if(sp[0] == 'sorts'){
            sortKey = sp[1].replace(']', '');
            sortDir = url_parts.query[key];
        }
        if(sp[0] == 'queries'){
          if(sp[1] == 'PersonID]') {
            q.OwnerID = url_parts.query[key];  
          } else {
            searchTerm = url_parts.query[key];     
          }
        }
      }
      
      if (searchTerm != '') {
        q.$or = [];
        var term = { FirstName : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { LastName : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { Email : new RegExp(searchTerm, "i") };
        q.$or.push(term);
      }
      
      sortObj[sortKey] = parseInt(sortDir, 10);
      
      var perPage = parseInt(url_parts.query.perPage, 10)
        , page = parseInt(url_parts.query.page, 10);
        console.log(q);
      models.BANRBanner.count(q, function(err, c) {
        console.log(c);
        models.BANRBanner.find(
          q, 
          null, 
          { sort: sortObj, skip: (perPage * page) - perPage , limit: perPage }, 
          function (err, data) {
            // Dynatable response
            var response = {
              "records": data,
              "queryRecordCount": c,
              "totalRecordCount": data.length
            }
            res.json(response);
          }
        );
      });
    },
    customercards: function(req, res) {
      var q = {}, sortKey = "ContactObjectID", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      var perPage = parseInt(url_parts.query.perPage, 10)
        , page = parseInt(url_parts.query.page, 10);
      
      var and = [];
      //q.$or = [];
      for( var key in url_parts.query){
        searchTerm = '';
        var sp = key.split('[');
        if(sp[0] == 'sorts'){
            sortKey = sp[1].replace(']', '');
            sortDir = url_parts.query[key];
        }
        if(sp[0] == 'queries'){
            searchKey = sp[1].replace(']', '');
            searchTerm = url_parts.query[key];
        }
        if (searchTerm !== '') {
          if (searchKey == 'ResponsibleFullText') {
            and.push({ResponsibleFullText: new RegExp(searchTerm, 'i')});
          }
          if (searchKey == 'AccessGroupFullText') {
            and.push({AccessGroupFullText: new RegExp(searchTerm, 'i')});
          }
          if (searchKey == 'search') {
            and.push({PersonFullText: new RegExp(searchTerm, 'i')});
          }
          if (searchKey == 'Active') {
            if (searchTerm == '0-12 mån') {
              var today = new Date();
              var oneyear = new Date();
              oneyear.setMonth(oneyear.getMonth() - 12);
              and.push({"LogTimeIndexed" : { $gte : helpers.sqlDateFormat(oneyear), $lte:  helpers.sqlDateFormat(today) }});
            }
            if (searchTerm == '12-36 mån') {
              var today = new Date();
              today.setMonth(today.getMonth() - 12);
              var oneyear = new Date();
              oneyear.setMonth(oneyear.getMonth() - 36);
              and.push({"LogTimeIndexed" : { $gte : helpers.sqlDateFormat(oneyear), $lte:  helpers.sqlDateFormat(today) }});
            }
            if (searchTerm == '36+ mån') {
              var today = new Date();
              today.setMonth(today.getMonth() - 36);
              and.push({"LogTimeIndexed" : { $lte:  helpers.sqlDateFormat(today) }});
            }
          }
          /*var term = { searchKey : new RegExp(searchTerm, "i") };
          q.$or.push(term);
          var term = { LastName : new RegExp(searchTerm, "i") };
          q.$or.push(term);
          var term = { Email : new RegExp(searchTerm, "i") };
          q.$or.push(term);*/
        }
      }
      if (and.length > 0) {
        q.$and = and;
      }

      sortObj[sortKey] = parseInt(sortDir, 10);

      crmModels.CRMContactObject.count(q, function(err, c) {
        if (err) console.log(err);
        if (c) {
          console.log('Count: '+c);
          crmModels.CRMContactObject.find(
            q, 
            null,
            { sort: sortObj, skip: (perPage * page) - perPage , limit: perPage }, 
            function (err, data) {
              var response = {
                "records": data,
                "queryRecordCount": c,
                "totalRecordCount": data.length
              }
              res.json(response);
            }
          );
        } else {
          res.json({ 'records': {}, 'queryRecordCount': 0, 'totalRecordCount': 0 });
        }
      });
    },
    // Login
    login: function (req, res) {
      var q = {}, sortKey = "LoginID", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      
      for( var key in url_parts.query){
        var sp = key.split('[');
        if(sp[0] == 'sorts'){
            sortKey = sp[1].replace(']', '');
            sortDir = url_parts.query[key];
        }
        if(sp[0] == 'queries'){
            searchTerm = url_parts.query[key];
        }
      }
      
      if (searchTerm != '') {
        q.$or = [];
        var term = { FirstName : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { LastName : new RegExp(searchTerm, "i") };
        q.$or.push(term);
        var term = { Email : new RegExp(searchTerm, "i") };
        q.$or.push(term);
      }
      
      sortObj[sortKey] = parseInt(sortDir, 10);
      
      var perPage = parseInt(url_parts.query.perPage, 10)
        , page = parseInt(url_parts.query.page, 10);
        console.log(q);
      models.Login.count(q, function(err, c) {
        console.log(c);
        models.Login.find(
          q, 
          null, 
          { sort: sortObj, skip: (perPage * page) - perPage , limit: perPage }, 
          function (err, data) {
            // Dynatable response
            var response = {
              "records": data,
              "queryRecordCount": c,
              "totalRecordCount": data.length
            }
            res.json(response);
          }
        );
      });
    },
    kundkorthistorikspara: function(req, res) {
      crmModels.CRMContactObject.findById(req.param('kid'), function(err, kkort){
        if (kkort) {
          var hist = {
            typ : req.body.typ,
            freeContent: req.body.freeContent,
            datum: helpers.sqlDateFormat(new Date()),
            createdBy: req.body.createdBy
          };
          kkort.Historik.push(hist);
          kkort.save(function(err) {
            if (err) console.log(err);
            res.json('Tack');
          });
        }
      });
    },
    kundkorthistoriktabort: function(req, res) {
      crmModels.CRMContactObject.findById(req.param('kid'), function(err, kkort){
        if (kkort) {
          var hist = kkort.Historik;
          kkort.Historik = [];
          for (var hKey in hist) {
            console.log(hist[hKey]);
            if (hist[hKey]._id != req.body.idToDelete) {
              kkort.Historik.push(hist[hKey]);
            }
          }
          kkort.save(function(err) {
            if (err) console.log(err);
            res.json('Tack');
          });
        }
      });
    },
    kundkorthistorik: function(req, res) {
      var q = {}, sortKey = "_id", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      
      for( var key in url_parts.query){
        var sp = key.split('[');
        if(sp[0] == 'sorts'){
            sortKey = sp[1].replace(']', '');
            sortDir = url_parts.query[key];
        }
        if(sp[0] == 'queries'){
            searchTerm = url_parts.query[key];
        }
      }
      
      // Load actual customer card
      crmModels.CRMContactObject.findById(req.param('kundkortid'), function(err, kkort){
        var responseArray = [];
        if (searchTerm != '' && searchTerm !== 'all-history') {
          for (var cKey in kkort.Historik) {
            if (kkort.Historik[cKey].typ == searchTerm) {
              responseArray.push(kkort.Historik[cKey]);
            }
          }
        } else {
          responseArray = kkort.Historik;
        }
        var response = {
          "records": responseArray,
          "queryRecordCount": responseArray.length,
          "totalRecordCount": responseArray.length
        }
        res.json(response);
      });
    },
    events: function(req, res) {
        var q = {};

        var url_parts = url.parse(req.url, true);
        
        // Main category
        var mainCat = null;
        if (url_parts.query['mainCat']) {
          var mainCat = url_parts.query['mainCat'];
          delete url_parts.query['mainCat'];
        }

        // Build coins, if any
        var coins = [];
        for (var key in url_parts.query) {
          if (key == '1-10' || key == '10-30' || key == '30-100' || key == '100') {
            coins.push({ price: key });
            delete url_parts.query[key];
          }
        }

        var catSelected = false;
        for (var key in url_parts.query) {
            if (key == 'filtering') {
                if (url_parts.query[key] !== 'All') {
                    if (typeof q["$and"] !== 'object') {
                      q["$and"] = [];
                    }
                    q["$and"].push( { newCategory: { $elemMatch: { value: url_parts.query[key] } } } );
                } 
            } else {
                catSelected = true;
                if (typeof q["$or"] !== 'object') {
                  q["$or"] = [];
                }
                q["$or"].push( { newCategory: { $elemMatch: { value: key } } } );
            }
        }

        // Add coins
        if (coins.length > 0) {
          if (typeof q["$and"] !== 'object') {
            q["$and"] = [];
          }
          q["$and"].push({ $or: coins } );
        } else {

        }
        
        // Maincat?
        if (mainCat && !catSelected) {
          models.newCategory.find({ parent: mainCat}, function(err, cats) {
            async.each(
              cats,
              function(cat, callback) {
                if (typeof q["$or"] !== 'object') {
                  q["$or"] = [];
                }
                q["$or"].push( { newCategory: { $elemMatch: { value: cat._id } } } );
                callback();
              },
              function (err) {
                models.PRSTPage.find(q, function(err, data) {
                    if (err) console.log(err);
                    // @todo Async each (add view data such as isRoom etc)
                    // @todo isRoom
                    console.log('Maincat select');
                    console.log('OR:');
                    //console.log(q['$or'][0]);
                    console.log('and: ');
                    //console.log(q['$and'][0]);
                    console.log(data.length);
                    res.json(data);
                });
              }
            );
          });
        } else {
          //console.log(q['$or'][0]);
          //console.log(q['$and'][0]);
          
          models.PRSTPage.find(q, function(err, data) {
              // @todo Async each (add view data such as isRoom etc)
              // @todo isRoom
              console.log(data.length);
              res.json(data);
          });
        }
        
        // Randomize!
        function shuffle(array) {
          var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }
        //shuffle(arr);
    }
}