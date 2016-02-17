import Ember from 'ember';
import Authenticatored from '../mixins/authenticatored';

export default Ember.Component.extend(Authenticatored, {
  tagName: 'nav',
  classNames: ['navbar','navbar-default','navbar-fixed-top'],
  action:'logout',
  actions: {
    logout: function() {
      this.authenticator().logout();
    }
  }
});
