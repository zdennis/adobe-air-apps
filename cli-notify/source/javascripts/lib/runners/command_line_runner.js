EmberApp.Runners.CommandLineRunner = Ember.Object.create({
  run: function(){
    var options = AirApp.get('cli-arguments');
    if(options.server){
      this.runServer(options);
    } else {
      this.runSingleNotification(options);
    }
  },

  runServer: function(options){
    EmberApp.set('isServer', true);
    EmberApp.NotificationServer.create({runner: EmberApp.Runners.RemoteCommandRunner}).start(options.server);
  },

  runSingleNotification: function(options){
    EmberApp.get('router').transitionTo('notification', {text: options.text, color: options.color});
  }
});
