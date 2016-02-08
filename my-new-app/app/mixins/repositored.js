import Ember from 'ember';

/**
 * This Mixin adds behavior and injection to access repositories
 */
export default Ember.Mixin.create({
  repositories(){
    return this.get('repositoryLocator');
  },
  // PRIVATE
  repositoryLocator: Ember.inject.service('repository-locator'),
});
