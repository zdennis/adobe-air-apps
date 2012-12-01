//= require "./vendor/AIRAliases"
//= require "./vendor/AIRIntrospector"

//= require "./vendor/jquery-1.8.3.min"
//= require "./vendor/underscore-min"

//= require "./vendor/handlebars-1.0.rc.1.js"
//= require "./vendor/ember-1.0.0-pre.2-54-gbee0807"

//= require "./air-app"

//= require "./ember-app"

AirApp.makeModal();

$(window).on('cli-arguments-received', function(e, options){
  EmberApp.notification.
    set('text', options['text']).
    set('color', options['color']);
});

$(function(){
  AirApp.maximizeWindow();
  AirApp.positionWindow(0, 0);
});
