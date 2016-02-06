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
      var controller = this;
      controller.repo().createUser()
        .then(function(createdUser){
          controller.userList().addObject(createdUser);
        });
    }
  }
});
