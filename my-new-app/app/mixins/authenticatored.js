import Ember from 'ember';

/**
 * This Mixin adds a the authenticator as an injected dependency
 */
export default Ember.Mixin.create({
  authenticator(){
    return this.get('authenticatorService');
  },
  // PRIVATE
  authenticatorService: Ember.inject.service('authenticator'),
});