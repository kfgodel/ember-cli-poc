import Ember from "ember";

export default Ember.Service.extend({

  makeRequest: function (customizations) {
    var defaults = {
      dataType: 'json',
      contentType: 'application/json',
    };
    var options = Ember.merge(defaults, customizations);
    var requestPromise = Ember.$.ajax(options);
    return requestPromise;
  },

});
