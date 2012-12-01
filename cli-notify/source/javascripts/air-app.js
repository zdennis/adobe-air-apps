window.AirApp = (function(){
  var console    = air.Introspector.Console,
      app        = air.NativeApplication.nativeApplication,
      airWindow  = window.nativeWindow;

  var exit = function(){
    app.exit();
  };

  var on = function(event, callback){
    app.addEventListener(event, callback);
  };

  var processCommandLineArguments = function(event){
    var options = { color: "#00FF00", text: "<text>" };

    _.each(event.arguments, function(arg){
      if(arg.match(/^--.*/)){ // support args like --server and --text="foo"
        var key_value = arg.split("=");
        key = key_value[0].replace(/^--/, '');
        options[key] = key_value[1] || true;
      } else {
        options["text"] = arg
      }
    });

    $(window).trigger("cli-arguments-received", options);
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
