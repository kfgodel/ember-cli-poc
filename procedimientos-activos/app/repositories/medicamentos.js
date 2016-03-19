import Ember from 'ember';
import EmberResource from 'ateam-ember-resource/rest/ember-resource';
import Medicamento from '../resources/medicamento';

export default Ember.Object.extend({
  getAllMedicamentos: function(){
    return this.medicamentoResource().getAll();
  },
  getAllMedicamentosMathing: function(searchText){
    return this.medicamentoResource().getAll({searchText: searchText});
  },
  getMedicamento: function(procedureId){
    return this.medicamentoResource().getSingle(procedureId);
  },
  createMedicamento: function(){
    return this.medicamentoResource().create();
  },
  updateMedicamento: function(procedure){
    return this.medicamentoResource().update(procedure);
  },
  removeMedicamento: function(procedure){
    return this.medicamentoResource().remove(procedure);
  },
  // PRIVATE
  medicamentoResource: function(){
    return EmberResource.create({resourceName: 'medicamentos', resourceClass: Medicamento, resourceLocator: this.get('resourceLocator')});
  },
});
