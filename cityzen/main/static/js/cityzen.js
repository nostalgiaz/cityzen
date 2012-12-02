$(function () {
//  addPointToMap = function (address) {
//    window.geocoder.geocode(
//      {
//        'address': address
//      },
//      function (results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//          new google.maps.Marker({
//            position: results[0].geometry.location,
//            map: map
//          });
//          window.map.setCenter(results[0].geometry.location);
//        }
//        else {
//          // Google couldn't geocode this request. Handle appropriately.
//        }
//      }
//    );
//  };

//  window.map = new google.maps.Map(document.getElementById('map'), {
//    mapTypeId: google.maps.MapTypeId.TERRAIN,
//    zoom: 12,
//    panControl: false,
//    zoomControl: false,
//    mapTypeControl: false,
//    scaleControl: false,
//    streetViewControl: false,
//    overviewMapControl: false
//  });

//  window.geocoder = new google.maps.Geocoder();

//  addPointToMap('Via del revi, Roma, Italy');
//  addPointToMap('Via del cossovaro, Roma, Italy');

  var Ticket = Backbone.Model.extend({
    defaults: {
      description: '',
      category: 0,
      photo: '',
      address: ''
    },
    initialize: function () {
      console.log(this);
//      addPointToMap('Via del revi, Roma, Italy');
    }
  });

  var Tickets = Backbone.Collection.extend({
    model: Ticket,
    url: "/api/tickets/",
    parse: function (json) {
      return json.objects;
    }
  });

  var TicketView = Backbone.View.extend({
    template: _.template($('#ticket-item').html()),
    tagName: 'div',
    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    }
  });

  var CurrentStoryListView = Backbone.View.extend({
      el: $('#prova>div'),
      initialize: function () {
        var self = this;
        this.tickets = new Tickets();
        this.tickets.fetch({success: function () {
          self.render();
        }});
      },
      render: function () {
        var $el = $(this.el)
          , tickets = this.tickets;

        _.each(tickets, function (ticket, i) {
          var $element = new TicketView({model: ticket}).render().el;
          $el.append($element);
        }, this);
        return this;
      }
    });

  new CurrentStoryListView();
});