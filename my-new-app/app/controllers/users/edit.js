import Ember from 'ember';
import UserRepo from '../../repositories/users';

export default Ember.Controller.extend({
  usersController: Ember.inject.controller('users'),
  repo: function(){
    return UserRepo.create();
  },
  user: function(){
    return this.get('model');
  },
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
  onUserUpdated: function(updatedUser){
    this.user().setProperties(updatedUser);
    this.transitionToRoute('users');
  },
  onUserRemoved: function(){
    this.get('usersController').onUserRemoved(this.user());
    this.transitionToRoute('users');
  }
});
