import Ember from "ember";

/**
 * This type represents a rest resource that can be used to manipulate remote instances under that rest url.
 * It needs to be created with a resource name and a locator to address the url
 *
 *    RestResource.create({resourceName: 'users', resourceLocator: aResourceLocator})
 */
export default Ember.Object.extend({

  getAll: function (queryParams) {
    return this._makeRequest({
      method: "GET",
      url: this._resourceUrl(),
      data: queryParams
    });
  },

  getSingle: function (instanceId) {
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

  update: function (instance) {
    return this._makeRequest({
      method: "PUT",
      url: this._entityUrl(instance),
      data: JSON.stringify(instance)
    });
  },

  remove: function (instance) {
    return this._makeRequest({
      method: "DELETE",
      url: this._entityUrl(instance)
    });
  },

  // PRIVATE
  init(){
    this._super(...arguments);
    if (!this._locator()) {
      throw new Error('Falto indicar el resourceLocator como argumento de este resource');
    }
    if (!this._requester()) {
      throw new Error('Falto indicar el requesterService como argumento de este resource');
    }
    if (!this._resourceName()) {
      throw new Error('Falto indicar el resourceName como argumento de este resource');
    }
  },

  _locator(){
    return this.get('resourceLocator');
  },
  _requester(){
    return this.get('requesterService');
  },
  _resourceName(){
    return this.get('resourceName');
  },
  _resourceUrl: function () {
    var resourceName = this._resourceName();
    var locator = this._locator();
    return locator.resourceUrl(resourceName);
  },
  _entityUrl: function (instance) {
    var instanceId = instance.get('id');
    return this._entityIdUrl(instanceId);
  },
  _entityIdUrl(instanceId){
    var resourceName = this._resourceName();
    var locator = this._locator();
    return locator.entityUrl(resourceName, instanceId);
  },
  _makeRequest: function (customizations) {
    var requester = this._requester();
    return requester.makeRequest(customizations);
  },
});