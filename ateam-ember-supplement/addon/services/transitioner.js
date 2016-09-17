import Ember from "ember";

/**
 * This type represents a globally available service to manage transitions to routes from any place in the code.
 *  By using this type the internal routing method is abstracted and controllers and routes can use the same interface,
 *  as well as components or any other code
 *
 *  This class may lose its purpose if Ember releases a public routing service
 */
export default Ember.Service.extend({
  /**
   * Similar semantics as http://emberjs.com/api/classes/Ember.Route.html#method_transitionTo
   */
  transitionTo(routeName, models, queryParams, shouldReplace){
    if(models && !(models instanceof Array)){
      // The router expects an array for model as argument
      models = [models];
    }
    this.router().transitionTo(routeName, models, queryParams, shouldReplace);
  },
  // PRIVATE
  internalRoutingService: Ember.inject.service('-routing'), // Not declared on ember public api
  router(){
    return this.get('internalRoutingService');
  },

});