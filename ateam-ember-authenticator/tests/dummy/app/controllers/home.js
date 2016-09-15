import Ember from "ember";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";

export default Ember.Controller.extend(AuthenticatorInjected, {
  actions: {
    logout: function () {
      this.authenticator().logout();
    }
  },
});
