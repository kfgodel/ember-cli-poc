import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';

export default Ember.Controller.extend(ProcedureRepositoryInjected, {
  actions: {
    editProcedure(procedure) {
      this.transitionToRoute('procedures.edit', procedure);
    },
    deleteProcedure(procedure) {
      this.promiseWaitingFor(this.repo().removeProcedure(procedure))
        .whenSucceeded(Ember.run.bind(this, this.onProcedureRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    tagClicked(clickedTag){
      this.showProceduresMatching(clickedTag);
    },
    goBack(){
      this.navigator().navigateToProceduresList();
    }
  },
  // PRIVATE
  procedure: function(){
    return this.get('model');
  },
  onProcedureRemoved: function(){
    this.navigator().navigateToProceduresList();
  },
  onReauthenticated(){
    this.navigator().navigateToProcedureView(this.procedure());
  },
  showProceduresMatching(tagToFilter) {
    this.navigator().navigateToProceduresListFilteringBy(tagToFilter);
  }

});
