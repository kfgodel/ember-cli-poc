import Ember from "ember";

/**
 * This type represents a backend rest resource. In contrast to a simple RestResource, this type
 * handles ember objects as resource entities (converts ingoing and outgoing objects if needed).
 * This allows the client code to use ember instead of plain javascript objects
 *
 *   EmberResource.create({restResouce: aRestResource, resultemberizer: aResultEmberizer})
 */
export default Ember.Object.extend({

  getAll: function (queryParams) {
    return this._emberizing(this._restResource().getAll(queryParams));
  },
  getSingle: function (instanceId) {
    return this._emberizing(this._restResource().getSingle(instanceId));
  },
  create: function (instance) {
    return this._emberizing(this._restResource().create(instance));
  },
  update: function (instance) {
    return this._emberizing(this._restResource().update(instance));
  },
  remove: function (instance) {
    return this._emberizing(this._restResource().remove(instance));
  },

  // PRIVATE
  init(){
    this._super(...arguments);
    if (!this._restResource()) {
      throw new Error('Falto indicar el restResource como argumento de este emberized-resource');
    }
    if (!this._emberizer()) {
      throw new Error('Falto indicar el resultEmberizer como argumento de este emberized-resource');
    }
  },
  _restResource(){
    return this.get('restResource');
  },
  _emberizer(){
    return this.get('resultEmberizer');
  },
  _emberizing: function (promise) {
    return this._emberizer().emberizing(promise);
  },

});