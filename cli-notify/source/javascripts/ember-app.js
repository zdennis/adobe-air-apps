var EmberApp = Ember.Application.create();

EmberApp.Notification = Ember.Object.extend({
  state: '',
  text: ''
});

EmberApp.notification = EmberApp.Notification.create();

EmberApp.ApplicationController = Ember.Controller.extend({
  notification: EmberApp.notification
});

EmberApp.ApplicationView = Ember.View.extend({
  templateName: 'application',
  classNames: 'app-container',
  didInsertElement: function(){
    var header = this.$("h1");

    header.bind("webkitTransitionEnd", $.proxy(this.transitionedIn, this));
    header.addClass("phase-in").css({
      "color": this.controller.notification.color,
      "top": air.Capabilities.screenResolutionY - header.height()
    });
  },

  transitionedIn: function(event){
    var header = $(event.target);
    // AirApp.on(air.Event.DEACTIVATE, this.transitionOut);
    $(window).keypress(this.transitionOut);
    header.unbind("webkitTransitionEnd");
  },

  transitionOut: function(){
    var header = $(this.$("h1"));

    header.unbind("webkitTransitionEnd");
    header.removeClass("phase-in").addClass("done").css({
      "top": air.Capabilities.screenResolutionY + header.height()
    });
  }
});

EmberApp.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/'
    })
  })
});

EmberApp.initialize();