import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['navbar','navbar-default','navbar-fixed-top'],
  action:'logout',
  actions: {
    logout: function() {
      //Send the default action that is 'logout'
      this.sendAction('action');
    }
  }
});
