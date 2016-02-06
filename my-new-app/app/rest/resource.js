import Ember from 'ember';

/**
 * This type represents a rest resource that can be used to manipulate remote instances under that resource.
 * It needs to be created with a namespace as root url, and the specific resource name:
 *
 *    RestResource.create({namespace: '/api/v1', resourceName: 'users'})
 */
export default Ember.Object.extend({
  rootUrl: function(){
    return this.get('namespace') || '';
  },
  resourceUrl: function(){
    return this.subUrl(this.rootUrl(), this.get('resourceName'));
  },
  subUrl: function(parentUrl, subElement){
    return parentUrl + '/' + subElement;
  },
  instanceUrl: function (instance) {
    var instanceId;
    if(instance.get){
      instanceId = instance.get('id');
    }else{
      // REMOVE me
      instanceId = instance.id;
    }

    var elementUrl = this.subUrl(this.resourceUrl(), instanceId);
    return elementUrl;
  },
  makeRequest: function(customizations){
    var defaults = {
      dataType: 'json',
      contentType: 'application/json',
    };
    var options = Ember.merge(defaults, customizations);
    return Ember.$.ajax(options);
  },
  // PUBLIC
  getAll: function(){
    return this.makeRequest({
        method: "GET",
        url: this.resourceUrl()
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
      url: this.instanceUrl(instance),
      data: JSON.stringify(instance)
    });
  },
  remove: function(instance){
    return this.makeRequest({
      method: "DELETE",
      url: this.instanceUrl(instance)
    });
  }

});