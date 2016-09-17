import Ember from "ember";
import ResourceLocatorInjected from "ateam-ember-resource/mixins/resource-locator-injected";
/**
 * This class knows how to request backend sessions or end them
 */
export default Ember.Service.extend(ResourceLocatorInjected, {

  beginSession(credentials){
    var loginUrl = this.resourceLocator().loginUrl();
    var loginPayload = {
      j_username: credentials.get('login'),
      j_password: credentials.get('password')
    };
    return Ember.$.post(loginUrl, loginPayload);
  },

  endSession(){
    var logoutUrl = this.resourceLocator().logoutUrl();
    return Ember.$.post(logoutUrl, {});
  },

  getCurrentSession(){
    var sessionUrl = this.resourceLocator().resourceUrl('session');
    return Ember.$.ajax({
      method: 'GET',
      url: sessionUrl,
    });
  },

});
