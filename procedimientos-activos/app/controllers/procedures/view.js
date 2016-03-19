import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';

export default Ember.Controller.extend(ProcedureRepositoryInjected, {
  actions: {
    editModel() {
      this.transitionToRoute('procedures.edit', this.model);
    },
    deleteModel() {
      this.promiseWaitingFor(this.repo().removeProcedure(this.model))
        .whenSucceeded(Ember.run.bind(this, this.onModelRemoved))
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
  onModelRemoved: function(){
    this.navigator().navigateToProceduresList();
  },
  onReauthenticated(){
    this.navigator().navigateToProcedureView(this.model);
  },
  showProceduresMatching(tagToFilter) {
    this.navigator().navigateToProceduresListFilteringBy(tagToFilter);
  }

});
