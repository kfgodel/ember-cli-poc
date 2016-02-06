import Ember from 'ember';
import UserRepo from '../../repositories/users';

export default Ember.Controller.extend({
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
        .then(Ember.run.bind(this, this.onUserDeleted));
    }
  },
  onUserUpdated: function(updatedUser){
    this.user().setProperties(updatedUser);
    this.transitionToRoute('users');
  },
  onUserDeleted: function(){
    // Fix me please
    var userList = this.user().get('containerList');
    userList.removeObject(this.user());

    this.transitionToRoute('users');
  }
});
