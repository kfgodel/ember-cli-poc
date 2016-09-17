import Ember from "ember";

export default Ember.Mixin.create({
  _sessionRequester: Ember.inject.service('session-requester'),
  sessionRequester(){
    return this.get('_sessionRequester');
  },

});
