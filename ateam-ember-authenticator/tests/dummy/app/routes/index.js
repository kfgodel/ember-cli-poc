import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function () {
    this.transitioner().transitionTo('login');
  },

  // PRIVATE
  _transitionerService: Ember.inject.service('transitioner'), // Router made as a service
  transitioner(){
    return this.get('_transitionerService');
  },

});
