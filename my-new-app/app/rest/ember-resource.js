import Ember from 'ember';
import RestResource from './resource';

/**
 * This type represents a backend rest resource. In contrast to a simple RestResource, this type
 * handles ember objects as resource instances (converts ingoing and outgoing objects if needed).
 * This allows the client code to use ember objects in any case
 *
 *   RestResource.create({namespace: '/api/v1', resourceName: 'users'})
 */
export default Ember.Object.extend({
  getAll: function(queryParams){
    return this.emberizing(this.resource().getAll(queryParams));
  },
  getSingle: function(instanceId){
    return this.emberizing(this.resource().getSingle(instanceId));
  },
  create: function(){
    return this.emberizing(this.resource().create());
  },
  update: function(instance){
    return this.emberizing(this.resource().update(instance));
  },
  remove: function(instance){
    return this.emberizing(this.resource().remove(instance));
  },

  // PRIVATE
  init: function(){
    this.initializeResource();
  },
  initializeResource: function(){
    var createdResource = RestResource.create({
      namespace: this.get('namespace'),
      resourceName: this.get('resourceName')
    });
    this.set('restResource', createdResource);
  },
  resource: function(){
    return this.get('restResource');
  },
  emberize: function(jsonResult){
    if(jsonResult instanceof Array){
      return Ember.A(jsonResult).map(this.emberize);
    }else if(jsonResult instanceof Object){
      return Ember.Object.create(jsonResult);
    }
    // In any other case use as given
    return jsonResult;
  },
  emberizing: function(promise){
    return promise
      .then(Ember.run.bind(this, this.emberize))
  },

});