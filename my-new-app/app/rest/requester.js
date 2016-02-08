import Ember from 'ember';

/**
 * This type represents the requester instance that knows how to generate requests to communicate with the backend
 *
 */
export default Ember.Object.extend({
  makeRequest: function(customizations){
    var defaults = {
      dataType: 'json',
      contentType: 'application/json',
    };
    var options = Ember.merge(defaults, customizations);
    var requestPromise = Ember.$.ajax(options);
    return requestPromise;
  },
});