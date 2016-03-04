import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';
import MessagerInjected from 'ateam-ember-messager/mixins/messager-injected';

export default Ember.Controller.extend(ProcedureRepositoryInjected, MessagerInjected, {
  actions: {
    createProcedure: function() {
      this.promiseWaitingFor(this.repo().createProcedure())
        .whenSucceeded(Ember.run.bind(this, this.onProcedureCreated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    tagClicked(clickedTag){
      this.showProceduresMatching(clickedTag);
    }
  },

  //PRIVATE
  onProcedureCreated(createdTo){
    this.navigator().navigateToProcedureEdit(createdTo);
  },
  onReauthenticated(){
    this.navigator().navigateToProceduresList();
  },
  showProceduresMatching(clickedTag) {
    this.navigator().navigateToProceduresListFilteringBy(clickedTag);
  },
  init(){
    this._super();
    this.messager().subscribe({type: 'procedureSearchStarted'}, ()=>{
      this.set('currentlyLoading', true);
    });
    this.messager().subscribe({type: 'procedureSearchStopped'}, ()=>{
      this.set('currentlyLoading', false);
    });
  },
  willDestroy(){
    this.messager().unsubscribe({type: 'procedureSearchStarted'});
    this.messager().unsubscribe({type: 'procedureSearchStopped'});
    return this._super();
  }
});
