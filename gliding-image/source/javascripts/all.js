//= require_tree .

// Make the application window modal-by-default
window.nativeWindow.alwaysInFront = true;

// +ARGV+ will house command line arguments
var ARGV = {};

var App = {
  console: air.Introspector.Console,
  window: window.nativeWindow,

  exit: function(){
    air.NativeApplication.nativeApplication.exit();
  },

  onAirEvent: function(event, callback){
    air.NativeApplication.nativeApplication.addEventListener(event, callback);
  },

  on: function(event, callback){
    App.__eventListeners = App.__eventListeners ? App.__eventListeners : {};
    App.__eventListeners[event] = App.__eventListeners[event] || [];
    App.__eventListeners[event].push(callback);
  },

  trigger: function(event){
    var callbacks;
    if(App.__eventListeners && App.__eventListeners[event]){
      callbacks = App.__eventListeners[event];
      _.each(callbacks, function(callback){
        callback();
      });
    }
  },

  processCommandLineArguments: function(event){
    _.each(event.arguments, function(arg){
      var key_value = arg.split("=");
      key = key_value[0].replace(/^--/, '');
      ARGV[key] = key_value[1];
    });
    App.trigger("cli-arguments-received");
  },

  resizeWindow: function(width, height){
    App.window.width = air.Capabilities.screenResolutionX;
    App.window.height = air.Capabilities.screenResolutionY;
  },

  positionWindow: function(x, y){
    App.window.x = x;
    App.window.y = y;
  }
};

App.onAirEvent(air.InvokeEvent.INVOKE, App.processCommandLineArguments);

$(function(){
  App.resizeWindow(air.Capabilities.screenResolutionX, air.Capabilities.screenResolutionY);
  App.positionWindow(0, 0);

  App.on("cli-arguments-received", function(){
    var header = $("h1"), body = $("body");

    // kill the app
    var finish = function(){
      $("body").delegate("h1.done", "webkitTransitionEnd", App.exit);
      header.css({
        "top": air.Capabilities.screenResolutionY + header.height()
      }).removeClass("phase-in").addClass("done");
    };

    // Second-step, occurs after the phase in transition occurs
    body.delegate("h1.phase-in", "webkitTransitionEnd", function(){
      //header.on("click", function(){ air.Introspector.Console.log("hai"); });
      App.onAirEvent(air.Event.DEACTIVATE, finish);
      $(window).keypress(finish);
    });

    // Kick everything-off!
    header.text(ARGV["text"]).addClass("phase-in").css({
      "opacity": 1,
      "top": air.Capabilities.screenResolutionY - header.height(),
      "color": ARGV["color"]
    });
  });

});