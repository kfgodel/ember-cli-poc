import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
import Procedure from "../resources/procedure";

/**
 * Esta clase permite interactuar con el backend para modificar los procedures
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getAllProcedures: function () {
    return this.procedureResource().getAll();
  },
  getAllProceduresMathing: function (searchText) {
    return this.procedureResource().getAll({searchText: searchText});
  },
  getProcedure: function (procedureId) {
    return this.procedureResource().getSingle(procedureId);
  },
  createProcedure: function () {
    return this.procedureResource().create();
  },
  updateProcedure: function (procedure) {
    return this.procedureResource().update(procedure);
  },
  removeProcedure: function (procedure) {
    return this.procedureResource().remove(procedure);
  },

  // PRIVATE
  procedureResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResourceMapping('procedures', Procedure);
    return resource;
  },

});