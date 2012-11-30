window.AirApp = (function(){
  var console    = air.Introspector.Console,
      app        = air.NativeApplication.nativeApplication,
      airWindow  = window.nativeWindow;

  var exit = function(){
    app.exit();
  };

  var on = function(event, callback){
    air.Introspector.Console.log("adding event");
    app.addEventListener(event, callback);
  };

  var processCommandLineArguments = function(event){
    var argv = {};
    _.each(event.arguments, function(arg){
      var key_value = arg.split("=");
      key = key_value[0].replace(/^--/, '');
      argv[key] = key_value[1];
    });
    $(window).trigger("cli-arguments-received", argv);
  };

  var makeModal = function(){
    window.nativeWindow.alwaysInFront = true;
  };

  var maximizeWindow = function(){
    resizeWindow(air.Capabilities.screenResolutionX, air.Capabilities.screenResolutionY);
  };

  var resizeWindow = function(width, height){
    airWindow.width = air.Capabilities.screenResolutionX;
    airWindow.height = air.Capabilities.screenResolutionY;
  };

  var positionWindow = function(x, y){
    airWindow.x = x;
    airWindow.y = y;
  };

  on(air.InvokeEvent.INVOKE, processCommandLineArguments);

  return {
    exit: exit,
    on:   on,
    makeModal: makeModal,
    maximizeWindow: maximizeWindow,
    resizeWindow: resizeWindow,
    positionWindow: positionWindow
  };
})();
