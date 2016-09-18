import Ember from "ember";
import TransitionerInjected from "ateam-ember-supplement/mixins/transitioner-injected";

export default Ember.Route.extend(TransitionerInjected, {
  beforeModel: function () {
    this.transitioner().transitionTo('login');
  },
});
