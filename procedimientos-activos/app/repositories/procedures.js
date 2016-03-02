import Ember from 'ember';
import EmberResource from 'ateam-ember-resource/rest/ember-resource';
import Procedure from '../resources/procedure';

export default Ember.Object.extend({
  getAllProcedures: function(){
    return this.procedureResource().getAll();
  },
  getAllProceduresMathing: function(searchText){
    return this.procedureResource().getAll({searchText: searchText});
  },
  getProcedure: function(procedureId){
    return this.procedureResource().getSingle(procedureId);
  },
  createProcedure: function(){
    return this.procedureResource().create();
  },
  updateProcedure: function(procedure){
    return this.procedureResource().update(procedure);
  },
  removeProcedure: function(procedure){
    return this.procedureResource().remove(procedure);
  },
  // PRIVATE
  procedureResource: function(){
    return EmberResource.create({resourceName: 'procedures', resourceClass: Procedure, resourceLocator: this.get('resourceLocator')});
  },
});
