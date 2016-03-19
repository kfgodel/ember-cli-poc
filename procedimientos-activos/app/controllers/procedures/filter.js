import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';
import MessagerInjected from 'ateam-ember-messager/mixins/messager-injected';
import ProcedureSearchStarted from '../../messages/procedure-search-started';
import ProcedureSearchStopped from '../../messages/procedure-search-stopped';

export default Ember.Controller.extend(ProcedureRepositoryInjected, MessagerInjected, {
  actions: {
    createNew: function() {
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
    this.messager().subscribe(ProcedureSearchStarted.exampleMessage, ()=>{
      this.set('currentlyLoading', true);
    });
    this.messager().subscribe(ProcedureSearchStopped.exampleMessage, ()=>{
      this.set('currentlyLoading', false);
    });
  },
  willDestroy(){
    this.messager().unsubscribe(ProcedureSearchStarted.exampleMessage);
    this.messager().unsubscribe(ProcedureSearchStopped.exampleMessage);
    return this._super();
  }
});
