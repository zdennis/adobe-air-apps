//= require "./vendor/AIRAliases"
//= require "./vendor/AIRIntrospector"

//= require "./vendor/jquery-1.8.3.min"
//= require "./vendor/underscore-min"

//= require "./vendor/handlebars-1.0.rc.1.js"
//= require "./vendor/ember-1.0.0-pre.2-54-gbee0807"

//= require "./ember-app"
//= require "./router"

//= require_tree "./models"
//= require_tree "./lib"

EmberApp.initialize();

/* this is what kicks every thing off: receiving command line arguments */
AirApp.addObserver('cli-arguments', EmberApp.Runners.CommandLineRunner, 'run');

$(function(){
  AirApp.makeModal();
  AirApp.maximizeWindow();
  AirApp.positionWindow(0, 0);
});
