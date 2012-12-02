$(function () {
  addPointToMap = function (address) {
    geocoder.geocode(
      {
        'address': address
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
          });
          map.setCenter(results[0].geometry.location);
        }
        else {
          // Google couldn't geocode this request. Handle appropriately.
        }
      }
    );
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    zoom: 12,
    panControl: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false
  });

  geocoder = new google.maps.Geocoder();

  window.Ticket = Backbone.Model.extend({
    defaults: {
      description: '',
      category: 0,
      address: ''
    },
    initialize: function () {
      addPointToMap(this.attributes.address);
    }
  });

  var Tickets = Backbone.Collection.extend({
    model: Ticket,
    url: "/api/tickets/",
    parse: function (json) {
      return json.object;
    }
  });

  var TicketView = Backbone.View.extend({
    template: _.template($('#ticket-item').html()),
    tagName: 'article',
    className: 'row-fluid',
    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var CurrentStoryListView = Backbone.View.extend({
      el: $('#tickets'),
      initialize: function () {
        var self = this;
        this.ticket = new Tickets();

        window.tickets = this.ticket;

        this.ticket.bind('add', function() {
          self.render();
        });
        this.ticket.fetch({success: function () {
          self.render();
        }});
      },
      render: function () {
        var $el = $(this.el)
          , tickets = this.ticket.models;

        $el.empty();

        _.each(tickets, function (ticket, i) {
          var $element = new TicketView({model: ticket}).render().el;
          $el.prepend($element);
        }, this);
        return this;
      }
    });

  new CurrentStoryListView();
});