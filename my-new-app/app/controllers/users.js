import Ember from 'ember';
import UserRepositored from '../mixins/user-repositored';

export default Ember.Controller.extend(UserRepositored, {
  actions: {
    create: function() {
      this.repo().createUser()
        .then(Ember.run.bind(this, this.onUserCreated));
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
});
