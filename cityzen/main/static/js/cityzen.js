$(function () {
  addPointToMap = function (address, category, myStatus) {
    geocoder.geocode(
      {
        'address': address
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var image;

          if (category === 0) // barriere
            if (myStatus === 0)
              image = 'http://www.gettyicons.com/free-icons/218/mixed/png/32/blue_pin_32.png';
            else image = 'http://www.gettyicons.com/free-icons/218/mixed/png/32/green_pin_32.png'
          else if (category === 1)
            if (myStatus === 0)
              image = 'http://www.gettyicons.com/free-icons/218/mixed/png/32/red_pin_32.png';
            else image = 'http://www.gettyicons.com/free-icons/218/mixed/png/32/black_pin_32.png'

          new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            icon: new google.maps.MarkerImage(
              image,
              new google.maps.Size(32, 32),
              new google.maps.Point(0, 0),
              new google.maps.Point(0, 32)
            )
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
      pk: 0,
      description: '',
      category: 0,
      status: 0,
      address: ''
    },
    initialize: function () {
      var attr = this.attributes;
      addPointToMap(attr.address, attr.category, attr.status);
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

      this.ticket.bind('add', function () {
        self.render();
      });
      this.ticket.fetch({success: function () {
        self.render();
      }});
      this.ticket.bind('update-status', function(data) {
        $.post('/api/tickets/status/update/', data, function (response) {
          console.log(response);
        })
      });
    },
    render: function () {
      var $el = $(this.el)
        , tickets = this.ticket.models;

      $el.empty();

      _.each(tickets, function (ticket, i) {
        var $element = new TicketView({model: ticket}).render().el;
        $el.prepend($element);
      }, this);

      $('.btn').on('click', function () {
        var $wrapper = $(this).closest('div.row-fluid');
          window.tickets.trigger('update-status', {'pk': $wrapper.data('pk'), 'status': $wrapper.data('status')});
      });

      return this;
    }
  });

  new CurrentStoryListView();
});