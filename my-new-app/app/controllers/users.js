import Ember from 'ember';

export default Ember.Controller.extend({
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
  repositoryLocator: Ember.inject.service('repository-locator'),
  repo: function(){
    return this.get('repositoryLocator').users();
  },
  userList: function(){
    return this.get('model');
  },
  onUserCreated: function(createdUser){
    this.userList().addObject(createdUser);
    this.transitionToRoute('users.edit', createdUser);
  },
});
