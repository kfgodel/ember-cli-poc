import Ember from 'ember';

export default Ember.Controller.extend({
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
  repositoryLocator: Ember.inject.service('repository-locator'),
  usersController: Ember.inject.controller('users'),
  repo: function(){
    return this.get('repositoryLocator').users();
  },
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
