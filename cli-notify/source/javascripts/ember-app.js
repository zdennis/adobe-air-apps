var EmberApp = Ember.Application.create({
  isServer: false
});

EmberApp.ApplicationController = Ember.Controller.extend();
EmberApp.ApplicationView = Ember.View.extend({
  templateName: 'application',
  classNames: 'app-container'
});

EmberApp.NotificationController = Ember.Controller.extend();
EmberApp.NotificationView = Ember.View.extend({
  templateName: 'notification',
  classNames: 'notification-container',

  didInsertElement: function(){
    var header       = this.$("h1"),
        notification = this.get('controller').get('content');

    if(!notification.get('ready')){
      setTimeout($.proxy(this.didInsertElement, this), 50);
      return;
    }

    header.bind("webkitTransitionEnd", $.proxy(this.transitionedIn, this));
    header.addClass("phase-in").css({
      "color": notification.color,
      "top": air.Capabilities.screenResolutionY - header.height()
    });
  },

  transitionedIn: function(event){
    var header = $(event.target);
    // AirApp.on(air.Event.DEACTIVATE, this.transitionOut);
    $(window).keypress(this.transitionOut);
    header.bind("click", $.proxy(this.transitionOut, this));
    header.unbind("webkitTransitionEnd");
  },

  transitionOut: function(){
    var header = $(this.$("h1"));

    header.unbind("webkitTransitionEnd");
    header.bind("webkitTransitionEnd", $.proxy(this.finishedDisplaying, this));
    header.removeClass("phase-in").addClass("done").css({
      "top": air.Capabilities.screenResolutionY + header.height()
    });
  },

  finishedDisplaying: function(){
    if(EmberApp.get('isServer')){
      // no-op
    } else {
      AirApp.exit();
    }
  }
});

