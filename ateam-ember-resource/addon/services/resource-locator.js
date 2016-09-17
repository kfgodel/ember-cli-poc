import Ember from "ember";

/**
 * Default implementation of the resource locator that uses a base /api/v1
 * path for resource requests and defines authentications paths.
 * It translates partial sub paths to backend full paths
 */
export default Ember.Service.extend({
  resourceUrl(resourceName){
    var resourceUrl = this._inside(this.apiUrl(), resourceName);
    return resourceUrl;
  },
  entityUrl: function (resourceName, instanceId) {
    var resourceUrl = this.resourceUrl(resourceName);
    var entityUrl = this._inside(resourceUrl, instanceId);
    return entityUrl;
  },
  apiUrl(){
    return this.get('apiPath');
  },
  loginUrl(){
    return this.get('loginPath');
  },
  logoutUrl(){
    return this.get('logoutPath');
  },

  // PRIVATE
  apiPath: '/api/v1',
  loginPath: '/j_security_check',
  logoutPath: '/j_logout',

  _inside(parent, child){
    return `${parent}/${child}`;
  }

});
