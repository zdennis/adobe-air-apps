window.NotificationServer = Ember.Object.extend({
  init: function(){
    var self = this._super();
    AirApp.on(air.Event.EXITING, $.proxy(this.stop, this));
    return self;
  },

  start: function(port){
    var server = new air.ServerSocket();
    this.set('server', server);
    port = _(port).isBoolean() ? 8888 : port;
    server.addEventListener(air.Event.CONNECT, $.proxy(this.spawnClient, this));
    server.bind(port);
    server.listen();
  },

  stop: function(){
    var server = this.get('server');
    if(server && server.listening){
      server.close();
    }
  },

  spawnClient: function(event){
    var socket = event.socket;
    window.NotificationConnection.create({socket: socket});
  }
});

window.NotificationConnection = Ember.Object.extend({
  init: function(){
    var self   = this._super(),
        socket = this.get('socket');
    socket.addEventListener(air.ProgressEvent.SOCKET_DATA, $.proxy(this.dataReceived, this));
    return self;
  },

  dataReceived: function(event){
    var socket = event.target,
        data   = socket.readUTFBytes(socket.bytesAvailable),
        json   = null;

    try {
      json = JSON.parse(data);
    } catch(e) { air.trace("bad JSON received: " + json); air.trace(e); }

    if(json){
      $(window).trigger("remote-arguments-received", json);
    }
  }
});
