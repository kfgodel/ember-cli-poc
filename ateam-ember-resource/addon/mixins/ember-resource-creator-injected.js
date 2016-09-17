import Ember from "ember";

export default Ember.Mixin.create({
  _emberResourceCreator: Ember.inject.service('ember-resource-creator'),
  resourceCreator(){
    return this.get('_emberResourceCreator');
  }
});
