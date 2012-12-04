EmberApp.Runners.RemoteCommandRunner = Ember.Object.create({
  run: function(connection){
    var options = connection.get("remote-arguments");
    EmberApp.get('router').transitionTo('notification', {text: options.text, color: options.color});
  },
});
