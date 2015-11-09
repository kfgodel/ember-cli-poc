import Ember from 'ember';

/**
 * This Mixin adds a pre-transition step to authenticate the user if not authenticated yet.<br>
 *   This prevents accessing to routes where requests will fail if not authenticated.
 *   However, this doesn't help recovering the session if lost, once in.
 */
export default Ember.Mixin.create({
  beforeModel: function(transition) {
    var loginController = this.controllerFor('login');
    if (!loginController.get('authenticated')) {
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});
