import Ember from 'ember';
import MedicamentoRepositoryInjected from '../../mixins/medicamento-repository-injected';
import MessagerInjected from 'ateam-ember-messager/mixins/messager-injected';

export default Ember.Controller.extend(MedicamentoRepositoryInjected, MessagerInjected, {
  actions: {
    createNew: function() {
      this.promiseWaitingFor(this.repo().createMedicamento())
        .whenSucceeded(Ember.run.bind(this, this.onMedicamentoCreated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    tagClicked(clickedTag){
      this.showMedicamentosMatching(clickedTag);
    }
  },

  //PRIVATE
  onMedicamentoCreated(createdTo){
    this.navigator().navigateToMedicamentoEdit(createdTo);
  },
  onReauthenticated(){
    this.navigator().navigateToMedicamentosList();
  },
  showMedicamentosMatching(clickedTag) {
    this.navigator().navigateToMedicamentosListFilteringBy(clickedTag);
  },
  init(){
    this._super();
    this.messager().subscribe({type: 'medicamentoSearchStarted'}, ()=>{
      this.set('currentlyLoading', true);
    });
    this.messager().subscribe({type: 'medicamentoSearchStopped'}, ()=>{
      this.set('currentlyLoading', false);
    });
  },
  willDestroy(){
    this.messager().unsubscribe({type: 'medicamentoSearchStarted'});
    this.messager().unsubscribe({type: 'medicamentoSearchStopped'});
    return this._super();
  }
});
