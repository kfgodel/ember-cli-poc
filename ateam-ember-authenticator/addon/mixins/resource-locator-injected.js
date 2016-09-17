import Ember from "ember";

/**
 * This Mixin offers a method to access the resource locator
 */
export default Ember.Mixin.create({
  _resourceLocator: Ember.inject.service("resource-locator"),
  resourceLocator(){
    return this.get('_resourceLocator');
  }
});
