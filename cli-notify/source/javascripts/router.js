EmberApp.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/'
    }),
    notification: Ember.Route.extend({
      route: '/notification/:options',
      connectOutlets: function(router, options) {
        var notification = EmberApp.Notification.create({text: options.text, color: options.color});
        router.get('notificationController').set('content', notification);
        router.get('applicationController').connectOutlet('notification');
      }
    })
  })
});
