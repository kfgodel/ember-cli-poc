import Ember from 'ember';
import AuthenticatorInjected from '../mixins/authenticator-injected';

export default Ember.Component.extend(AuthenticatorInjected, {
  tagName: 'nav',
  classNames: ['navbar','navbar-default','navbar-fixed-top'],
  action:'logout',
  actions: {
    logout: function() {
      this.authenticator().logout();
    }
  }
});
