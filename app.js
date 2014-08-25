;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).foundation();

$(document).on('opened', '[data-reveal]', function (evt) {
  $(window).trigger('resize');
  var modalId = evt.target.id.replace('profileside', '');
  var lat = $('#maplarge'+modalId).attr('lat');
  var lon = $('#maplarge'+modalId).attr('lon');
  //div#maplarge#{_id}
  //div#mapmed
  var pos = new google.maps.LatLng(lat,lon);
  var mapOptions = {
    zoom: 16,
    center: pos,
    disableDefaultUI: true
  }
  var map1 = new google.maps.Map(document.getElementById('maplarge'+modalId), mapOptions);
  var map2 = new google.maps.Map(document.getElementById('mapmed'+modalId), mapOptions);
  $('#maplarge'+modalId).css({'width':'100%', 'height': '300px'});
  $('#mapmed'+modalId).css({'width':'100%', 'height': '300px'});

});

$(document).ready(function() {
    $('#listaside').stickySidebar();

    window.categoriesToText = function(cat) {
      var allCats = JSON.parse($('#allCats').html());
      var ret = '';
      for (var key in allCats) {
        // 
        // 
      }
      return 'hello'+cat;
    }
});

function registerClick(pageId, clickType) {
  // Ajax bla bla bla
  console.log('Click saved.');
  return true;
}

var views = {};
views.EventItem = Backbone.View.extend({
  tagName: 'div',
 
  initialize: function(options) {
    _.bindAll(this, 'render');
    // If the model changes we need to re-render
    // Probably wont happen
    this.model.bind('change', this.render);
  },
 
  render: function() {
    // Clear existing row data if needed
    $(this.el).empty();
    var lcls = this.model.toJSON();
    console.log(lcls);
    lcls.categoriesToText = window.categoriesToText;
    switch(this.model.get('pageType')) {
      case 'small': 
        $(this.el).append(JST['client/templates/hitlist-small'](lcls));
        break;
      case 'medium':
        $(this.el).append(JST['client/templates/hitlist-medium'](lcls));
        break;
      case 'large':
        $(this.el).append(JST['client/templates/hitlist'](lcls));
        break;
    };
    // Popup
    $(this.el).append(JST['client/templates/profileside'](lcls));
    
    return this;
  }
});
views.Events = Backbone.View.extend({
  // The collection will be kept here
  collection: null,
 
  // The event list view is attached to the table body
  el: '#resultrows',
 
  initialize: function(options) {
    this.collection = options.collection;
 
    // Ensure our methods keep the `this` reference to the view itself
    _.bindAll(this, 'render');
 
    // Bind collection changes to re-rendering
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.render);
    this.collection.bind('remove', this.render);
  },
 
  render: function() {
    var element = $(this.el);
    // Clear potential old entries first
    element.empty();
 
    // Go through the collection items
    this.collection.forEach(function(item) {
 
      // Instantiate a EventItem view for each
      var itemView = new views.EventItem({
        model: item
      });
 
      // Render the PeopleView, and append its element
      // to the table
      element.append(itemView.render().el);
    });
    element.prepend('<h1 class="results">Resultat: '+this.collection.length+' träffar</h1>');
    $(document).foundation('reflow');
    return this;
  }
});

$(function ()
{
    // Pages
    // Admin-PRSTPage
    if ($('body').hasClass('admin-list')) {
      $('#list-table').dynatable({
        dataset: {
          ajax: true,
          ajaxUrl: '/api/prstpage',
          ajaxOnLoad: true,
          records: []
        },
        writers: {
          _cellWriter: function (index, rowData) {
            console.log(rowData[index.id]);
            if (index.id == "Title") {
              return '<td><a href="/admin/prstpage/id/'+rowData['PageICID']+'">'+rowData[index.id]+'</a></td>';
            } else {
              return '<td>'+rowData[index.id]+'</td>';
            }
          }
        }
      });
    }
    if ($('body').hasClass('admin-newcategory')) {
      $('#list-categories').dynatable({
        dataset: {
          ajax: true,
          ajaxUrl: '/api/newcategory',
          ajaxOnLoad: true,
          records: []
        },
        features: {
          paginate: true,
          search: true,
          recordCount: true,
          perPageSelect: true
        },
        writers: {
          _cellWriter: function (index, rowData) {
            console.log(rowData[index.id]);
            if (index.id == "name") {
              return '<td><a href="/admin/editnewcategory/id/'+rowData['_id']+'">'+rowData[index.id]+'</a></td>';
            } else {
              return '<td>'+rowData[index.id]+'</td>';
            }
          }
        }
      });
    }
    // admin-category
    if ($('body').hasClass('admin-category')) {
      $('#list-categories').dynatable({
        dataset: {
          ajax: true,
          ajaxUrl: '/api/category',
          ajaxOnLoad: true,
          records: []
        },
        features: {
          paginate: true,
          search: true,
          recordCount: true,
          perPageSelect: true
        },
        writers: {
          _cellWriter: function (index, rowData) {
            console.log(rowData[index.id]);
            if (index.id == "Name") {
              return '<td><a href="/admin/category/id/'+rowData['CategoryICID']+'">'+rowData[index.id]+'</a></td>';
            } else {
              return '<td>'+rowData[index.id]+'</td>';
            }
          }
        }
      });
    }
    // admin-editbanner
    if ($('body').hasClass('admin-editbanner')) {
      $('#cat-tree')
        .on('changed.jstree', function (e, data) {
          var i, j, r = [];
          for(i = 0, j = data.selected.length; i < j; i++) {
            r.push(data.instance.get_node(data.selected[i]).id);
          }
          $('#newCategory').val(JSON.stringify(r));
        })
        .jstree({ 'core' : {'data' : JSON.parse($('#cat-data').html()) }, "plugins" : [ "checkbox" ] });
    }
    // admin-banner
    if ($('body').hasClass('admin-banner')) {
      $('#list-banners').dynatable({
        dataset: {
          ajax: true,
          ajaxUrl: '/api/banner',
          ajaxOnLoad: true,
          records: []
        },
        features: {
          paginate: true,
          search: false,
          recordCount: true,
          perPageSelect: true
        },
        writers: {
          _cellWriter: function (index, rowData) {
            console.log(rowData[index.id]);
            if (index.id == "BannerName") {
              return '<td><a href="/admin/editbanner/id/'+rowData['BannerICID']+'">'+rowData[index.id]+'</a></td>';
            } else {
              return '<td>'+rowData[index.id]+'</td>';
            }
          }
        }
      });
    }
    // admin-editperson
    if ($('body').hasClass('admin-editperson')) {
      var pId = $('input[name="personId"]').val();
      $('#list-banners').dynatable({
        dataset: {
          ajax: true,
          ajaxUrl: '/api/banner',
          ajaxOnLoad: true,
          records: [],
          queries: { 'PersonID': pId }
        },
        features: {
          paginate: true,
          search: false,
          recordCount: true,
          perPageSelect: true
        },
        writers: {
          _cellWriter: function (index, rowData) {
            console.log(rowData[index.id]);
            if (index.id == "BannerName") {
              return '<td><a href="/admin/editbanner/id/'+rowData['BannerICID']+'">'+rowData[index.id]+'</a></td>';
            } else {
              return '<td>'+rowData[index.id]+'</td>';
            }
          }
        }
      });
    }
    // Person
    if ($('body').hasClass('admin-person')) {
      $('#list-table').dynatable({
        dataset: {
          ajax: true,
          ajaxUrl: '/api/person',
          ajaxOnLoad: true,
          records: []
        },
        writers: {
          _cellWriter: function (index, rowData) {
            console.log(rowData[index.id]);
            if (index.id == "FirstName" || index.id == "LastName") {
              return '<td><a href="/admin/person/id/'+rowData['PersonID']+'">'+rowData[index.id]+'</a></td>';
            } else {
              return '<td>'+rowData[index.id]+'</td>';
            }
          }
        }
      });
    }
    
    // Hitlist / Events
    if ($('body').hasClass('hitlist'))
    {
      if ($('body').hasClass('hitlist-forelasaretalare')) {
        $('#showTalare1>.filtering, #showTalare2>.filtering, #showTalare3>.filtering').hide();
        // Show/hide checkboxes // #showTalare
        $('.talareRadio').on('click', function(){
          if ($(this).is(':checked')) {
            if ($(this).attr('id') == '53e0f507198b7b00003ba174' || $(this).attr('id') == '53e0f517198b7b00003ba175') {
              $('#showTalare1>.filtering, #showTalare2>.filtering, #showTalare3>.filtering').show();
            } else {
              $('#showTalare1>.filtering, #showTalare2>.filtering, #showTalare3>.filtering').hide();
              // Clear all checked boxes
              $('input[type="checkbox"]').prop('checked', false);
            }
          }
        });
      }
        var call = function(params) {
            console.log(params);
            $('h1.results').html('Söker...');
            eventCollection.fetch({
                data: $.param(params),
                success: function(data){
                    if (data.length == 0) {
                      $('h1.results').html('Inga träffar');
                    }
                    if (data.length == 1) {
                      $('h1.results').html('Resultat: 1 träff');
                    }
                    if (data.length > 1) {
                      $('h1.results').html('Resultat: '+data.length+' träffar');
                    }
                    
                }
            });    
        }
        var getParams = function() {
            var params = {};
            // Main category we are looking under
            params['mainCat'] = $('#mainCat').val();
            console.log(params);
            if ($('input[name=filtering]:checked').val()) {
                params.filtering = $('input[name=filtering]:checked').val();
            }
            var subOptions = {};
            $('input[type="checkbox"]').each(function () {
                if (this.checked) {
                    params[$(this).attr('id')] = true;
                }
            });
            return params; 
        }
        
        var Evt     = Backbone.Model.extend({});
        var Events  = Backbone.Collection.extend({
            model: Evt,
            url : '/api/events'
        });

        var eventCollection = new Events;
        
        var view = new views.Events({
            collection: eventCollection
        });
        //view.render();
        
        $('[name="filtering"], input[type="checkbox"]').on('change', function() {
            call(getParams());   
        });
        $(document).ready(function() {
          call(getParams());
        });
    }
});
},{}]},{},[1])
;