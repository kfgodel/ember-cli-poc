import Ember from "ember";
import TransitionerInjected from "ateam-ember-supplement/mixins/transitioner-injected";

/**
 * This class knows how to navigate the app screens so the authenticator can make the user authenticate
 * or wait for a session recovery with a feedback screen
 */
export default Ember.Service.extend(TransitionerInjected, {

  goToLoginScreen(){
    this.transitioner().transitionTo('login');
  },

  goToInitialScreen(){
    this.transitioner().transitionTo('home');
  },

  goToSessionRecoveryScreen(){
    this.transitioner().transitionTo('engaging-session');
  },

});
