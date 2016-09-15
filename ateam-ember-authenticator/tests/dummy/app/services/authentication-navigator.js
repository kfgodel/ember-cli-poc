import Ember from "ember";

/**
 * This class knows how to navigate the app screens so the authenticator can make the user authenticate
 * or wait for a session recovery with a feedback screen
 */
export default Ember.Service.extend({

  goToLoginScreen(){
    this.transitioner().transitionTo('login');
  },

  goToInitialScreen(){
    this.transitioner().transitionTo('home');
  },

  goToSessionRecoveryScreen(){
    this.transitioner().transitionTo('engaging-session');
  },

  // PRIVATE
  _transitionerService: Ember.inject.service('transitioner'), // Router made as a service
  transitioner(){
    return this.get('_transitionerService');
  },

});
