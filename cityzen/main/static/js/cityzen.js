$(function () {

  window.Ticket = Backbone.Model.extend({
    defaults: {
      pk: 0,
      description: '',
      category: 0,
      status: 0,
      address: ''
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
    className: 'row-fluid ticket-element',
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

      this.ticket.bind('remove', function () {
        self.ticket.fetch({success: function () {
          self.render();
        }});
      });
      this.ticket.bind('add', function () {
        self.render();
      });
      this.ticket.fetch({success: function () {
        self.render();
      }});
      this.ticket.bind('update-status', function (data) {
        $.post('/api/tickets/status/update/', data, function () {
          self.ticket.fetch({success: function () {
            self.render();
          }});
        });
      });
    },
    render: function () {
      var $el = $(this.el)
        , tickets = this.ticket.models;

      $el.empty();

      if (window.marker && window.marker.length !== 0) {
        for (var i = 0; i < window.marker.length; ++i) {
          window.marker[i].setMap(null);
        }
      }

      _.each(tickets, function (ticket) {
        var attr = ticket.attributes
          , $element = new TicketView({model: ticket}).render().el;
        $el.prepend($element);

        if (window.isNotMobile)
          addPointToMap(attr.address, attr.category, attr.status);

      }, this);

      $('.btn').on('click', function () {
        var $wrapper = $(this).closest('div.row-fluid');
        window.tickets.trigger('update-status', {'pk': $wrapper.data('pk'), 'status': $wrapper.data('status')});
      });

      return this;
    }
  });

  $.get('/api/categories', function (data) {
    window.category = data;
    new CurrentStoryListView();
  });
});