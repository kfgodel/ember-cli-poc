import Ember from 'ember';
import AuthenticatedRoute from '../mixins/authenticated-route';
import UserRepositoryInjected from '../mixins/user-repository-injected';
import AuthenticatorInjected from '../mixins/authenticator-injected';


export default Ember.Route.extend(AuthenticatedRoute, UserRepositoryInjected, AuthenticatorInjected, {
  model: function(){
    return this.promiseWaitingFor(this.repo().getAllUsers())
      .whenInterruptedAndReauthenticated(()=>{
        this.transitionTo('users');
      });
  },
  // PRIVATE
});
