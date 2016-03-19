import Ember from 'ember';
import MedicamentoRepositoryInjected from '../../mixins/medicamento-repository-injected';
import MessagerInjected from 'ateam-ember-messager/mixins/messager-injected';
import MedicamentoSearchStarted from '../../messages/medicamento-search-started';
import MedicamentoSearchStopped from '../../messages/medicamento-search-stopped';

export default Ember.Controller.extend(MedicamentoRepositoryInjected, MessagerInjected, {
  actions: {
    createNew: function() {
      this.promiseWaitingFor(this.repo().createMedicamento())
        .whenSucceeded(Ember.run.bind(this, this.onModelCreated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    tagClicked(clickedTag){
      this.showMedicamentosMatching(clickedTag);
    }
  },

  //PRIVATE
  onModelCreated(createdTo){
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
    this.messager().subscribe(MedicamentoSearchStarted.exampleMessage, ()=>{
      this.set('currentlyLoading', true);
    });
    this.messager().subscribe(MedicamentoSearchStopped.exampleMessage, ()=>{
      this.set('currentlyLoading', false);
    });
  },
  willDestroy(){
    this.messager().unsubscribe(MedicamentoSearchStarted.exampleMessage);
    this.messager().unsubscribe(MedicamentoSearchStopped.exampleMessage);
    return this._super();
  }
});
