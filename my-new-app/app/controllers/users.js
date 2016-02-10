import Ember from 'ember';
import UserRepositored from '../mixins/user-repositored';
import ServerPromiseHandler from '../rest/server-promise-handler';
import Authenticatored from '../mixins/authenticatored';

export default Ember.Controller.extend(UserRepositored, Authenticatored, {
  actions: {
    create: function() {
      this.repo().createUser()
        .then(...new ServerPromiseHandler()
          .whenSuccess(Ember.run.bind(this, this.onUserCreated))
          .whenUnauthorized(Ember.run.bind(this, this.onRequestUnauthorized))
          .handlers()
        );
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
  onRequestUnauthorized(){
    this.transitionToRoute('login');
    this.authenticator().restartAndAfterAuthentication(()=>{
      this.transitionToRoute('users');
    });
  }
});
