import Ember from "ember";
import RestResource from "ateam-ember-resource/rest/resource";

/**
 * This type represents a backend rest resource. In contrast to a simple RestResource, this type
 * handles ember objects as resource entities (converts ingoing and outgoing objects if needed).
 * This allows the client code to use ember instead of plain javascript objects
 *
 *   EmberResource.create({resourceName: 'users', resourceClass: anEmberClass, resourceLocator: aResourceLocator})
 */
export default Ember.Object.extend({
  getAll: function(queryParams){
    return this.emberizing(this.resource().getAll(queryParams));
  },
  getSingle: function(instanceId){
    return this.emberizing(this.resource().getSingle(instanceId));
  },
  create: function (instance) {
    return this.emberizing(this.resource().create(instance));
  },
  update: function(instance){
    return this.emberizing(this.resource().update(instance));
  },
  remove: function(instance){
    return this.emberizing(this.resource().remove(instance));
  },

  // PRIVATE
  resourceLocator: Ember.inject.service("resource-locator"),
  init: function(){
    this.initializeResource();
  },
  initializeResource: function(){
    var createdResource = RestResource.create({
      resourceLocator: this.get('resourceLocator'),
      resourceName: this.get('resourceName')
    });
    this.set('restResource', createdResource);
  },
  resource: function(){
    return this.get('restResource');
  },
  emberize: function(jsonResult){
    if(jsonResult instanceof Array){
      return Ember.A(jsonResult).map(Ember.run.bind(this, this.emberize));
    }else if(jsonResult instanceof Object){
      return this.emberClass().create(jsonResult);
    }
    // In any other case use it as given
    return jsonResult;
  },
  emberizing: function(promise){
    return promise
      .then(Ember.run.bind(this, this.emberize));
  },
  emberClass(){
    return this.get('resourceClass') || Ember.Object;
  }

});