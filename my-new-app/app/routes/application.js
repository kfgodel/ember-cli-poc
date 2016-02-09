import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    logout: function() {
      var self = this;
      Ember.$.post("/j_logout", {}).then(
        function(/* response */) {
          var loginController = self.controllerFor('login');
          loginController.set('authenticated', null);
          self.transitionTo('login');
        },
        function(response){
          console.log("Error logging out");
          console.log(response);
        }
      );
    }
  }
});
