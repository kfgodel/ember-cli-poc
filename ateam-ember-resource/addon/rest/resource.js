import Ember from 'ember';
import Requester from 'ateam-ember-resource/rest/requester';

/**
 * This type represents a rest resource that can be used to manipulate remote instances under that rest url.
 * It needs to be created with a resource name and a locator to address the url
 *
 *    RestResource.create({resourceName: 'users', resourceLocator: aResourceLocator})
 */
export default Ember.Object.extend({
  getAll: function(queryParams){
    return this.makeRequest({
      method: "GET",
      url: this.resourceUrl(),
      data: queryParams
    });
  },
  getSingle: function(instanceId){
    return this.makeRequest({
      method: "GET",
      url: this.entityIdUrl(instanceId)
    });
  },
  create: function(){
    return this.makeRequest({
      method: "POST",
      url: this.resourceUrl()
    });
  },
  update: function(instance){
    return this.makeRequest({
      method: "PUT",
      url: this.entityUrl(instance),
      data: JSON.stringify(instance)
    });
  },
  remove: function(instance){
    return this.makeRequest({
      method: "DELETE",
      url: this.entityUrl(instance)
    });
  },

  // PRIVATE
  locator(){
    return this.get('resourceLocator');
  },
  resourceUrl: function(){
    var resourceName = this.get('resourceName');
    return this.locator().resourceUrl(resourceName);
  },
  entityUrl: function (instance) {
    var instanceId = instance.get('id');
    return this.entityIdUrl(instanceId);
  },
  entityIdUrl(instanceId){
    return this.locator().entityUrl(this.get('resourceName'), instanceId);
  },
  makeRequest: function(customizations){
    return Requester.create().makeRequest(customizations);
  },
});