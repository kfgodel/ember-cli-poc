import Ember from 'ember';
import EmberResource from '../rest/ember-resource';

export default Ember.Object.extend({
  procedureResource: function(){
    return EmberResource.create({namespace: '/api/v1', resourceName: 'procedures'});
  },
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
  }
});
