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