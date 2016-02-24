import Ember from 'ember';
import ServerInteraction from '../rest/server-interaction';

/**
 * This Mixin adds a the authenticator as an injected dependency
 */
export default Ember.Mixin.create({
  authenticator(){
    return this.get('authenticatorService');
  },
  promiseWaitingFor(aPromise){
    return new ServerInteraction(aPromise)
      .whenUnauthorized((reauthenticationHandler)=>{
        this.authenticator().reauthenticateAndThen(reauthenticationHandler);
      });
  },
  // PRIVATE
  authenticatorService: Ember.inject.service('authenticator'),
});