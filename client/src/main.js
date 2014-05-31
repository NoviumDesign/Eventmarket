$(document).foundation();

$('.reveal-modal').on('opened', function(){
    $(window).trigger('resize');
});

$(document).ready(function() {
    $('#listaside').stickySidebar();
});

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
    
    $(this.el).append(JST['client/templates/hitlist'](this.model.toJSON()));
    $(this.el).append(JST['client/templates/profileside'](this.model.toJSON()));
    
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
    // admin-newcategory
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
              return '<td><a href="/admin/banner/id/'+rowData['BannerICID']+'">'+rowData[index.id]+'</a></td>';
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
        var call = function(params) {
            console.log(params);
            eventCollection.fetch({
                data: $.param(params),
                success: function(){
                    //console.log(eventCollection);
                }
            });    
        }
        var getParams = function() {
            var params = {};
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
    }
});