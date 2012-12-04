window.AirApp = Ember.Object.create({
  console: air.Introspector.Console,
  airApp: air.NativeApplication.nativeApplication,
  airWindow: window.nativeWindow,

  init: function(){
    var self = this._super();
    this.on(air.InvokeEvent.INVOKE, $.proxy(this.processCommandLineArguments, this));
    return self;
  },

  exit: function(){
    var airApp = this.get('airApp'),
        exitingEvent = new air.Event(air.Event.EXITING, false, true);
    airApp.dispatchEvent(exitingEvent);
    if (!exitingEvent.isDefaultPrevented()) {
      airApp.exit();
    }
  },

  on: function(event, callback){
   this.get('airApp').addEventListener(event, callback);
  },

  processCommandLineArguments: function(event){
    var options = { color: "#00FF00", text: "<text>" };

    _.each(event.arguments, function(arg){
      if(arg.match(/^--.*/)){ // support args like --server and --text="foo"
        var key_value = arg.split("=");
        key = key_value[0].replace(/^--/, '');
        options[key] = key_value[1] || true;
      } else {
        options.text = arg;
      }
    });

    this.set('cli-arguments', options);
  },

  makeModal: function(){
    var airWindow = this.get("airWindow");
    airWindow.alwaysInFront = true;
  },

  maximizeWindow: function(){
    this.resizeWindow(air.Capabilities.screenResolutionX, air.Capabilities.screenResolutionY);
  },

  resizeWindow: function(width, height){
    var airWindow = this.get("airWindow");
    airWindow.width = air.Capabilities.screenResolutionX;
    airWindow.height = air.Capabilities.screenResolutionY;
  },

  positionWindow: function(x, y){
    var airWindow = this.get("airWindow");
    airWindow.x = x;
    airWindow.y = y;
  }
});

