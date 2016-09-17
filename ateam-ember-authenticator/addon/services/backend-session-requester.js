import Ember from "ember";

/**
 * This class knows how to request backend sessions or end them
 */
export default Ember.Service.extend({

  beginSession(credentials){
    var loginUrl = this._locator().loginUrl();
    var loginPayload = {
      j_username: credentials.get('login'),
      j_password: credentials.get('password')
    };
    return Ember.$.post(loginUrl, loginPayload);
  },
  endSession(){
    var logoutUrl = this._locator().logoutUrl();
    return Ember.$.post(logoutUrl, {});
  },
  getCurrentSession(){
    var sessionUrl = this._locator().resourceUrl('session');
    return Ember.$.ajax({
      method: 'GET',
      url: sessionUrl,
    });
  },

  _resourceLocator: Ember.inject.service('resource-locator'),
  _locator(){
    return this.get('_resourceLocator');
  },

});