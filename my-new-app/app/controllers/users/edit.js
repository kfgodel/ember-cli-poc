import Ember from 'ember';
import UserRepositored from '../../mixins/user-repositored';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import Authenticatored from '../../mixins/authenticatored';

export default Ember.Controller.extend(UserRepositored, Authenticatored, {
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
    this.transitionToRoute('login');
    this.authenticator().restartAndAfterAuthentication(()=>{
      this.transitionToRoute('users.edit', this.user());
    });
  }
});
