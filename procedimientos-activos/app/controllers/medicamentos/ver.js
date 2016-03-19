import Ember from 'ember';
import MedicamentoRepositoryInjected from '../../mixins/medicamento-repository-injected';

export default Ember.Controller.extend(MedicamentoRepositoryInjected, {
  actions: {
    editModel() {
      this.transitionToRoute('medicamentos.editar', this.model);
    },
    deleteModel() {
      this.promiseWaitingFor(this.repo().removeMedicamento(this.model))
        .whenSucceeded(Ember.run.bind(this, this.onModelRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    tagClicked(clickedTag){
      this.showMedicamentosMatching(clickedTag);
    },
    goBack(){
      this.navigator().navigateToMedicamentosList();
    }
  },
  // PRIVATE
  onModelRemoved: function(){
    this.navigator().navigateToMedicamentosList();
  },
  onReauthenticated(){
    this.navigator().navigateToMedicamentoView(this.model);
  },
  showMedicamentosMatching(tagToFilter) {
    this.navigator().navigateToMedicamentosListFilteringBy(tagToFilter);
  }

});
