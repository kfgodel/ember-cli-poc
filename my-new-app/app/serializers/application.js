import DS from 'ember-data';

// Change default JSON format to avoid root object name
// Makes backend aware of frontend type names
export default DS.RESTSerializer.extend({
  extractArray: function(store, type, payload) {
    var payloadTemp = {};
    payloadTemp[type.typeKey] = payload;
    return this._super(store, type, payloadTemp);
  },
  extractSingle: function(store, type, payload, id) {
    var payloadTemp = {};
    payloadTemp[type.typeKey] = [payload];
    return this._super(store, type, payloadTemp, id);
  },
  serializeIntoHash: function(hash, type, snapshot, options) {
    var serialized = this.serialize(snapshot, options);
    serialized["id"] = snapshot.id;
    Ember.$.extend(hash, serialized);
  }
});
