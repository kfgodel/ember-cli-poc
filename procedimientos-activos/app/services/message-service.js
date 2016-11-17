import Ember from "ember";
import RequesterServiceInjected from "ateam-ember-resource/mixins/requester-service-injected";
import ResourceLocatorInjected from "ateam-ember-resource/mixins/resource-locator-injected";
import ResultEmberizer from "ateam-ember-resource/utils/result-emberizer";

/**
 * Esta clase permite comunicarse con el backend a travez de un solo endpoint (sin utilizar la convecion rest)
 */
export default Ember.Service.extend(RequesterServiceInjected, ResourceLocatorInjected, {

  sendMessage(messageContent, claseEmber) {
    var requestArgument = {
      method: "POST",
      url: this._resourceUrl(),
      data: JSON.stringify(messageContent)
    };
    var promise = this.requesterService().makeRequest(requestArgument);
    return this._emberizer(claseEmber).emberizing(promise);
  },

  // PRIVATE
  _resourceUrl: function () {
    var resourceName = 'messages';
    return this.resourceLocator().resourceUrl(resourceName);
  },
  _emberizer(claseEmber){
    let config = null;
    if (claseEmber) {
      config = {claseEmber: claseEmber};
    }
    return ResultEmberizer.create();
  },

});