import Ember from 'ember';
import UserRepositored from '../../mixins/user-repositored';

export default Ember.Controller.extend(UserRepositored, {
  actions: {
    save: function() {
      this.repo().updateUser(this.user())
        .then(Ember.run.bind(this, this.onUserUpdated));
    },
    remove: function(){
      this.repo().removeUser(this.user())
        .then(Ember.run.bind(this, this.onUserRemoved));
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
  }
});
