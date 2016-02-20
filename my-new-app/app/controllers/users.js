import Ember from 'ember';
import UserRepositoryInjected from '../mixins/user-repository-injected';

export default Ember.Controller.extend(UserRepositoryInjected, {
  actions: {
    create: function() {
      this.promiseWaitingFor(this.repo().createUser())
        .whenSucceeded(Ember.run.bind(this, this.onUserCreated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
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
  onReauthenticated(){
    this.transitionToRoute('users');
  }
});
