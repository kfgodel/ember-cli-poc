import Ember from "ember";

/**
 * This mixins offer a local method to access the requester service
 */
export default Ember.Mixin.create({
  _requesterService: Ember.inject.service('requester-service'),
  requesterService(){
    return this.get('_requesterService');
  }
});
