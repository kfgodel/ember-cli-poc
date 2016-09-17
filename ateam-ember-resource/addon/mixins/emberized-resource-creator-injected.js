import Ember from "ember";

export default Ember.Mixin.create({
  _emberResourceCreator: Ember.inject.service('emberized-resource-creator'),
  resourceCreator(){
    return this.get('_emberResourceCreator');
  }
});
