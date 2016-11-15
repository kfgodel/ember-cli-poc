import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
import Procedure from "../resources/procedure";
import MessageServiceInjected from "../mixins/message-service-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los procedures
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, MessageServiceInjected, {

  getAllProcedures: function () {
    return this.procedureResource().getAll();
  },
  getAllProceduresMathing: function (searchText) {
    return this.send({recurso: 'GET/procedures', searchText: searchText});
  },
  getProcedure: function (procedureId) {
    return this.send({recurso: 'GET/procedure', id: procedureId});
  },
  createProcedure: function () {
    return this.procedureResource().create();
  },
  updateProcedure: function (procedure) {
    var message = procedure.getProperties(Object.keys(procedure));
    message.recurso = 'PUT/procedure';
    return this.send(message);
  },
  removeProcedure: function (procedure) {
    return this.send({recurso: 'DELETE/procedure', id: procedure.get('id')});
  },

  // PRIVATE
  procedureResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResourceMapping('procedures', Procedure);
    return resource;
  },

  send(messageContent){
    var message = Ember.Object.create(messageContent);
    return this.messageService().sendMessage(message);
  }

});