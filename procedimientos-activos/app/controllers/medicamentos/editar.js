import Ember from 'ember';
import MedicamentoRepositoryInjected from '../../mixins/medicamento-repository-injected';

export default Ember.Controller.extend(MedicamentoRepositoryInjected, {
  actions: {
    saveModel: function() {
      this.promiseWaitingFor(this.repo().updateMedicamento(this.model))
        .whenSucceeded(Ember.run.bind(this, this.onModelUpdated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    deleteModel: function(){
      this.promiseWaitingFor(this.repo().removeMedicamento(this.model))
        .whenSucceeded(Ember.run.bind(this, this.onModelRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    cancelEdition: function(){
      this.goBackToViewOnly();
    }
  },
  // PRIVATE
  onModelUpdated: function(updatedTo){
    this.model.setProperties(updatedTo);
    this.goBackToViewOnly();
  },
  onModelRemoved: function(){
    this.navigator().navigateToMedicamentosList();
  },
  goBackToViewOnly: function(){
    this.navigator().navigateToMedicamentoView(this.model);
  },
  onReauthenticated(){
    this.navigator().navigateToMedicamentoEdit(this.model);
  },

});
