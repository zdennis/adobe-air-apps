EmberApp.Notification = Ember.Object.extend({
  text: '',
  ready: function(){
    var text = this.get('text');
    return !_(text).isEmpty();
  }.property('text')
});
