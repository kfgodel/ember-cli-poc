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
    }
  },
  // PRIVATE
  procedure: function(){
    return this.get('model');
  },
  onProcedureRemoved: function(){
    this.transitionToRoute('procedures.filter');
  },
  onReauthenticated(){
    this.transitionToRoute('procedures.view', this.procedure());
  },
  showProceduresMatching(tagToFilter) {
    this.transitionToRoute('procedures.filter', { queryParams: {filterText: tagToFilter} });
  }

});
