import Ember from "ember";

export default Ember.Mixin.create({
  _authenticationNavigator: Ember.inject.service('authentication-navigator'),
  authenticationNavigator(){
    return this.get('_authenticationNavigator');
  },
});
