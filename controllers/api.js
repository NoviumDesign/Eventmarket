var models = require('../app/models');
var url    = require('url');

module.exports = {
    prstpage: function (req, res) {
      var q = {}, sortKey = "Title", sortDir = 1, searchTerm = '', sortObj = {};
      var url_parts = url.parse(req.url, true);
      console.log(url_parts.query);

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
    events: function(req, res) {
        var q = {};

        var url_parts = url.parse(req.url, true);
        q["$or"] = [];
        
        for (var key in url_parts.query) {
            if (key == 'filtering') {
                if (url_parts.query[key] !== 'All') {
                    q["$and"] = [];
                    q["$and"].push( { subCategory: { $elemMatch: { value: url_parts.query[key] } } } );
                } 
            } else {
                q["$or"].push( { subCategory: { $elemMatch: { value: key } } } );
            }
        }

        console.log(q);
        
        models.BANRBanner.find(q, function(err, data) {
            console.log(data);
            res.json(data);
        });
    }
}