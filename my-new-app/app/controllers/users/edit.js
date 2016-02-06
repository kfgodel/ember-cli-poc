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
      this.user().save();
    },
    remove: function(){
      this.repo().deleteUser(this.user())
        .then(Ember.run.bind(this, this.onUserDeleted));
    }
  },
  onUserDeleted: function(){
    // Fix me please
    var userList = this.user().get('containerList');
    userList.removeObject(this.user());

    this.transitionToRoute('users');
  }
});
