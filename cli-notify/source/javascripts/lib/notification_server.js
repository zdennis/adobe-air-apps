EmberApp.NotificationServer = Ember.Object.extend({
  runner: null,

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
    var socket = event.socket,
        runner = this.get("runner");
    EmberApp.NotificationConnection.create({socket: socket, runner: runner});
  }
});

