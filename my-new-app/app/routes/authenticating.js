import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    var authenticator = this.get('authenticator');
    return authenticator.authenticate();
  },
  // PRIVATE
  authenticator: Ember.inject.service('authenticator'),
});