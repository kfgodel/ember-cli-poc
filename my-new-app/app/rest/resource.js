import Ember from 'ember';

/**
 * This type represents a rest resource that can be used to manipulate remote instances under that resource.
 * It needs to be created with a namespace as root url, and the specific resource name:
 *
 *    RestResource.create({namespace: '/api/v1', resourceName: 'users'})
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
      url: this.instanceUrl(instanceId)
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
      url: this.urlFor(instance),
      data: JSON.stringify(instance)
    });
  },
  remove: function(instance){
    return this.makeRequest({
      method: "DELETE",
      url: this.urlFor(instance)
    });
  },

  // PRIVATE
  rootUrl: function(){
    return this.get('namespace') || '';
  },
  resourceUrl: function(){
    return this.subUrl(this.rootUrl(), this.get('resourceName'));
  },
  subUrl: function(parentUrl, subElement){
    return `${parentUrl}/${subElement}`;
  },
  urlFor: function (instance) {
    var instanceId = instance.get('id');
    return this.instanceUrl(instanceId);
  },
  instanceUrl: function (instanceId) {
    var elementUrl = this.subUrl(this.resourceUrl(), instanceId);
    return elementUrl;
  },
  makeRequest: function(customizations){
    var defaults = {
      dataType: 'json',
      contentType: 'application/json',
    };
    var options = Ember.merge(defaults, customizations);
    var requestPromise = Ember.$.ajax(options);
    return requestPromise;
  },
});