import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';

export default Ember.Controller.extend(ProcedureRepositoryInjected, {
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
    this.transitionToRoute('procedures.edit', createdTo);
  },
  onReauthenticated(){
    this.transitionToRoute('procedures.filter');
  },
  showProceduresMatching(clickedTag) {
    this.transitionToRoute('procedures.filter', { queryParams: {filterText: clickedTag} });
  }
});
