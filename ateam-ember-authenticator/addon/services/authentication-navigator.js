import Ember from "ember";

/**
 * This class knows how to navigate the app screens so the authenticator can make the user authenticate
 * or wait for a session recovery with a feedback screen
 */
export default Ember.Service.extend({

  goToLoginScreen(){
    throw Error('Must be overriden by application');
  },

  goToInitialScreen(){
    throw Error('Must be overriden by application');
  },

  goToSessionRecoveryScreen(){
    throw Error('Must be overriden by application');
  }

});
