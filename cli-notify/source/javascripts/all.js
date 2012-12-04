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

$(window).on('cli-arguments-received', function(e, options){
  if(options['server']){
    EmberApp.set('isServer', true);
    NotificationServer.create().start(options['server']);
  } else {
    EmberApp.get('router').transitionTo('notification', {text: options.text, color: options.color});
  }
});

$(window).on('remote-arguments-received', function(e, options){
  EmberApp.get('router').transitionTo('notification', {text: options.text, color: options.color});
});

$(function(){
  AirApp.maximizeWindow();
  AirApp.positionWindow(0, 0);
});
