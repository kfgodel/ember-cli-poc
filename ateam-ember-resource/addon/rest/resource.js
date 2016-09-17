import Ember from "ember";
import Requester from "ateam-ember-resource/rest/requester";

/**
 * This type represents a rest resource that can be used to manipulate remote instances under that rest url.
 * It needs to be created with a resource name and a locator to address the url
 *
 *    RestResource.create({resourceName: 'users', resourceLocator: aResourceLocator})
 */
export default Ember.Object.extend({

  getAll: function(queryParams){
    return this._makeRequest({
      method: "GET",
      url: this._resourceUrl(),
      data: queryParams
    });
  },

  getSingle: function(instanceId){
    return this._makeRequest({
      method: "GET",
      url: this._entityIdUrl(instanceId)
    });
  },

  create: function (optionalState) {
    var requestArgument = {
      method: "POST",
      url: this._resourceUrl(),
    };
    if (optionalState) {
      requestArgument['data'] = JSON.stringify(optionalState);
    }
    return this._makeRequest(requestArgument);
  },

  update: function(instance){
    return this._makeRequest({
      method: "PUT",
      url: this._entityUrl(instance),
      data: JSON.stringify(instance)
    });
  },

  remove: function(instance){
    return this._makeRequest({
      method: "DELETE",
      url: this._entityUrl(instance)
    });
  },

  // PRIVATE
  _locator(){
    return this.get('resourceLocator');
  },
  _resourceUrl: function () {
    var resourceName = this.get('resourceName');
    return this._locator().resourceUrl(resourceName);
  },
  _entityUrl: function (instance) {
    var instanceId = instance.get('id');
    return this._entityIdUrl(instanceId);
  },
  _entityIdUrl(instanceId){
    return this._locator().entityUrl(this.get('resourceName'), instanceId);
  },
  _makeRequest: function (customizations) {
    return Requester.create().makeRequest(customizations);
  },
});