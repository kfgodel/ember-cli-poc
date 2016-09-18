import Ember from "ember";
import EmberizedResource from "ateam-ember-resource/utils/emberized-resource";
import ResourceLocatorInjected from "ateam-ember-resource/mixins/resource-locator-injected";
import RequesterServiceInjected from "ateam-ember-resource/mixins/requester-service-injected";
import RestResource from "ateam-ember-resource/utils/rest-resource";
import ResultEmberizer from "ateam-ember-resource/utils/result-emberizer";

/**
 * This services eases the creation of an emberized resource that involves different classes
 * stitched together.
 * Using this service app code can depend on one only serviceto abstract the creation details
 */
export default Ember.Service.extend(ResourceLocatorInjected, RequesterServiceInjected, {

  /**
   * Creates an emberized resource that has verbs as methods and emberizes the result of each
   * response to be binding compatible
   * @param resourceName The name of the api resource that will be requested by the resource
   * @returns The emberized resource linked to the given api path
   */
  createResource(resourceName){
    var restResource = this._createRestResource(resourceName);
    var resultEmberizer = this._createResultEmberizer();
    return this._createResourceWith(restResource, resultEmberizer);
  },

  createResourceMapping(resourceName, resourceClass){
    var restResource = this._createRestResource(resourceName);
    var resultEmberizer = this._createResultEmberizer(resourceClass);
    return this._createResourceWith(restResource, resultEmberizer);
  },


  _createResourceWith(restResource, resultEmberizer){
    let emberizedArguments = {
      restResource: restResource,
      resultEmberizer: resultEmberizer
    };
    var emberizedResource = EmberizedResource.create(emberizedArguments);
    return emberizedResource;
  },
  _createRestResource(resourceName){
    let resourceArguments = {
      resourceName: resourceName,
      resourceLocator: this.resourceLocator(),
      requesterService: this.requesterService()
    };
    return RestResource.create(resourceArguments);
  },
  _createResultEmberizer(optionalClass){
    let emberizerArguments;
    if (optionalClass) {
      emberizerArguments = {claseEmber: optionalClass};
    }
    return ResultEmberizer.create(emberizerArguments);
  },

});
