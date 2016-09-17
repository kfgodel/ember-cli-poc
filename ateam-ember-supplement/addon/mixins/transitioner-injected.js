import Ember from "ember";

export default Ember.Mixin.create({
  _transitionerService: Ember.inject.service('transitioner'),
  transitioner(){
    return this.get('_transitionerService');
  },
});
