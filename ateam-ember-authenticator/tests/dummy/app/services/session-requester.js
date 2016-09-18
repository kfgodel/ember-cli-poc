import Ember from "ember";
/* global jQuery */

/**
 * We override the default to resolve locally instead of using a real backend
 */
export default Ember.Service.extend({

  beginSession(){
    var deferred = jQuery.Deferred();
    Ember.run.later(this, function () {
      deferred.resolve('Session granted');
    }, 100);
    return deferred.promise();
  },
  endSession(){
    var deferred = jQuery.Deferred();
    Ember.run.later(this, function () {
      deferred.resolve('Session lost');
    }, 100);
    return deferred.promise();
  },
  getCurrentSession(){
    var deferred = jQuery.Deferred();
    Ember.run.later(this, function () {
      deferred.resolve('Session fetched');
    }, 2000);
    return deferred.promise();
  },

});
