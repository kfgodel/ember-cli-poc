import Ember from 'ember';
import UserRepositoryInjected from '../mixins/user-repository-injected';
import ServerPromiseHandler from '../rest/server-promise-handler';
import AuthenticatorInjected from '../mixins/authenticator-injected';

export default Ember.Controller.extend(UserRepositoryInjected, AuthenticatorInjected, {
  actions: {
    create: function() {
      this.repo().createUser()
        .then(...new ServerPromiseHandler()
          .whenSuccess(Ember.run.bind(this, this.onUserCreated))
          .whenUnauthorized(Ember.run.bind(this, this.onRequestUnauthorized))
          .handlers()
        );
    }
  },
  onUserRemoved: function(removedUser){
    this.userList().removeObject(removedUser);
  },
  // PRIVATE
  userList: function(){
    return this.get('model');
  },
  onUserCreated: function(createdUser){
    this.userList().addObject(createdUser);
    this.transitionToRoute('users.edit', createdUser);
  },
  onRequestUnauthorized(){
    this.authenticator().reauthenticateAndThen(()=>{
      this.transitionToRoute('users');
    });
  }
});
