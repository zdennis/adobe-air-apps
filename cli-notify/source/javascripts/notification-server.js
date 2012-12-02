window.NotificationServer = (function(){
  var server = new air.ServerSocket();

  var start = function(port){
    port = _(port).isBoolean() ? 8888 : port;
    server.addEventListener(air.Event.CONNECT, onClientConnect);
    server.bind(port);
    server.listen();
  };

  var stop = function(){
    if(server.listening){
      server.close();
    }
  };

  var onClientConnect = function(event){
    var socket = event.socket;
    socket.addEventListener(air.ProgressEvent.SOCKET_DATA, clientDataReceived);
  };

  var clientDataReceived = function(event){
    var socket = event.target,
        data   = socket.readUTFBytes(socket.bytesAvailable),
        json   = null;

    try {
      json = JSON.parse(data);
      air.trace("good JSON received: ");
    } catch(e) { air.trace("bad JSON received: " + json); air.trace(e); }

    if(json){
      $(window).trigger("remote-arguments-received", json);
    }
  };

  AirApp.on(air.Event.EXITING, stop);

  return {
    start: start,
    stop:  stop
  };
})();
