import Ember from 'ember';
import UserRepositoryInjected from '../../mixins/user-repository-injected';

export default Ember.Controller.extend(UserRepositoryInjected, {
  actions: {
    save: function() {
      this.promiseWaitingFor(this.repo().updateUser(this.user()))
        .whenSucceeded(Ember.run.bind(this, this.onUserUpdated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    remove: function(){
      this.promiseWaitingFor(this.repo().removeUser(this.user()))
        .whenSucceeded(Ember.run.bind(this, this.onUserRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
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
    this.navigator().navigateToUsers();
  },
  onReauthenticated(){
    this.navigator().navigateToUsersEdit(this.user());
  }
});