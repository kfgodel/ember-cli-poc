import Ember from 'ember';
import UserRepo from '../repositories/users';

export default Ember.Controller.extend({
  repo: function(){
    return UserRepo.create();
  },
  userList: function(){
    return this.get('model');
  },
  actions: {
    create: function() {
      this.repo().createUser()
        .then(Ember.run.bind(this, this.onUserCreated));
    }
  },
  onUserCreated: function(createdUser){
    this.userList().addObject(createdUser);
    //Kill me
    createdUser.set('containerList',this.userList());

    this.transitionToRoute('users.edit', createdUser);
  }
});
