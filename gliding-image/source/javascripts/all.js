//= require_tree .

window.nativeWindow.alwaysInFront = true;

var ARGV = {};
air.NativeApplication.nativeApplication.addEventListener(air.InvokeEvent.INVOKE, function(e){
  _.each(e.arguments, function(val){
    var args = val.split("=");
    key = args[0].replace(/^--/, '');
    ARGV[key] = args[1];
  });
});

$(function(){
  // Align native AIR application window horizontally and vertically
  // air.nativeWindow.x = (air.Capabilities.screenResolutionX - window.nativeWindow.width) / 2;
  // air.nativeWindow.y = (air.Capabilities.screenResolutionY - window.nativeWindow.height) / 2;
  window.nativeWindow.height = air.Capabilities.screenResolutionY;

  window.nativeWindow.x = 0;
  window.nativeWindow.y = 0;

  var interval;
  var updateText = function(){
    if(ARGV["text"]){
      clearInterval(interval);

      var header = $("h1");

      $("body").delegate("h1.done", "webkitTransitionEnd", function(){
        air.NativeApplication.nativeApplication.exit();
      });

      $("body").delegate("h1.phase-in", "webkitTransitionEnd", function(){
        setTimeout(function(){
          header.css({
            "top": air.Capabilities.screenResolutionY + header.height()
          }).removeClass("phase-in").addClass("done");
       }, 2000);
      });

      header.
        text(ARGV["text"]).
        addClass("phase-in").
        css({
          "opacity": 1,
          "top": air.Capabilities.screenResolutionY - header.height(),
          "color": ARGV["color"]
        })

      setTimeout(function(){
//        $("h1").css({"opacity": 0, "top": });
      }, 2000);

      setTimeout(function(){
//       air.NativeApplication.nativeApplication.exit();
      }, 4000);
    }
  };
  interval = setInterval(updateText, 200);
});