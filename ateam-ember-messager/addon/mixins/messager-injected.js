import Ember from 'ember';

/**
 * Adds the messager as an internal collaborator
 */
export default Ember.Mixin.create({
  messagerService: Ember.inject.service('messager'),
  messager(){
    return this.get('messagerService');
  },
});