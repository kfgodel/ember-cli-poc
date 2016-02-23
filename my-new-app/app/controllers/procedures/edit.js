import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';

export default Ember.Controller.extend(ProcedureRepositoryInjected, {
  actions: {
    saveProcedure: function() {
      this.promiseWaitingFor(this.repo().updateProcedure(this.procedure()))
        .whenSucceeded(Ember.run.bind(this, this.onProcedureUpdated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    deleteProcedure: function(){
      this.promiseWaitingFor(this.repo().removeProcedure(this.procedure()))
        .whenSucceeded(Ember.run.bind(this, this.onProcedureRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    cancelEdition: function(){
      this.goBackToViewOnly();
    }
  },
  // PRIVATE
  procedure: function(){
    return this.get('model');
  },
  onProcedureUpdated: function(updatedTo){
    this.procedure().setProperties(updatedTo);
    this.goBackToViewOnly();
  },
  onProcedureRemoved: function(){
    this.navigator().navigateToProceduresList();
  },
  goBackToViewOnly: function(){
    this.navigator().navigateToProcedureView(this.procedure());
  },
  onReauthenticated(){
    this.navigator().navigateToProcedureEdit(this.procedure());
  },

});
