import Ember from 'ember';
import Authenticatored from './authenticatored';

/**
 * This Mixin adds a pre-transition step to authenticate the user if not authenticated yet.<br>
 *   This prevents accessing to routes where requests will fail if not authenticated.
 *   However, this doesn't help recovering the session if lost, once in.
 */
export default Ember.Mixin.create(Authenticatored, {
  beforeModel: function(transition) {
    this.authenticator().ifNotAuthenticated(()=>{
      this.transitionTo('authenticating');
      this.authenticator().afterAuthentication(function(){
        transition.retry();
      });
    });
  },
});
