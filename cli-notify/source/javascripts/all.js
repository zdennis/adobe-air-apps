//= require "./vendor/AIRAliases"
//= require "./vendor/AIRIntrospector"

//= require "./vendor/jquery-1.8.3.min"
//= require "./vendor/underscore-min"

//= require "./vendor/handlebars-1.0.rc.1.js"
//= require "./vendor/ember-1.0.0-pre.2-54-gbee0807"

//= require "./air-app"

//= require "./ember-app"

//= require "./notification-server"

AirApp.makeModal();

var CommandLineRunner = Ember.Object.create({
  run: function(){
    var options = AirApp.get('cli-arguments');
    if(options.server){
      this.runServer(options);
    } else {
      this.runSingleNotification(options);
    }
  },

  runServer: function(options){
    EmberApp.set('isServer', true);
    NotificationServer.create({runner: RemoteCommandRunner}).start(options.server);
  },

  runSingleNotification: function(options){
    EmberApp.get('router').transitionTo('notification', {text: options.text, color: options.color});
  }
});

var RemoteCommandRunner = Ember.Object.create({
  run: function(connection){
    var options = connection.get("remote-arguments");
    EmberApp.get('router').transitionTo('notification', {text: options.text, color: options.color});
  },
});

AirApp.addObserver('cli-arguments', CommandLineRunner, 'run');

$(function(){
  AirApp.maximizeWindow();
  AirApp.positionWindow(0, 0);
});
