EmberApp.NotificationConnection = Ember.Object.extend({
  runner: null,

  init: function(){
    var self   = this._super(),
        socket = this.get("socket"),
        runner = this.get("runner");
    this.addObserver("remote-arguments", runner, "run");
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
      this.set("remote-arguments", json);
    }
  }
});
