import Ember from 'ember';
import UserRepositoryInjected from '../../mixins/user-repository-injected';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import AuthenticatorInjected from '../../mixins/authenticator-injected';

export default Ember.Controller.extend(UserRepositoryInjected, AuthenticatorInjected, {
  actions: {
    save: function() {
      this.repo().updateUser(this.user())
        .then(...new ServerPromiseHandler()
          .whenSuccess(Ember.run.bind(this, this.onUserUpdated))
          .whenUnauthorized(Ember.run.bind(this, this.onRequestUnauthorized))
          .handlers()
        );
    },
    remove: function(){
      this.repo().removeUser(this.user())
        .then(...new ServerPromiseHandler()
          .whenSuccess(Ember.run.bind(this, this.onUserRemoved))
          .whenUnauthorized(Ember.run.bind(this, this.onRequestUnauthorized))
          .handlers()
        );
    }
  },

  // PRIVATE
  usersController: Ember.inject.controller('users'),
  user: function(){
    return this.get('model');
  },
  onUserUpdated: function(updatedUser){
    this.user().setProperties(updatedUser);
    this.transitionToRoute('users');
  },
  onUserRemoved: function(){
    this.get('usersController').onUserRemoved(this.user());
    this.transitionToRoute('users');
  },
  onRequestUnauthorized(){
    this.authenticator().reauthenticateAndThen(()=>{
      this.transitionToRoute('users.edit', this.user());
    });
  }
});
