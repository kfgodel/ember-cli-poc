import Ember from 'ember';
import AuthenticatedRoute from '../mixins/authenticated-route';
import UserRepositoryInjected from '../mixins/user-repository-injected';
import ServerPromiseHandler from '../rest/server-promise-handler';
import AuthenticatorInjected from '../mixins/authenticator-injected';


export default Ember.Route.extend(AuthenticatedRoute, UserRepositoryInjected, AuthenticatorInjected, {
  model: function(){
    return this.repo().getAllUsers()
      .then(...new ServerPromiseHandler()
        .whenUnauthorized(()=>{
          this.onRequestUnauthorized();
        })
        .handlers()
      );
  },
  // PRIVATE
  onRequestUnauthorized(){
    this.authenticator().reauthenticateAndThen(()=>{
      this.transitionTo('users');
    });
  },
});
