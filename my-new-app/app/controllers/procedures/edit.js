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
      this.transitionToView();
    }
  },
  // PRIVATE
  procedure: function(){
    return this.get('model');
  },
  onProcedureUpdated: function(updatedTo){
    this.procedure().setProperties(updatedTo);
    this.transitionToView();
  },
  onProcedureRemoved: function(){
    this.transitionToRoute('procedures.filter');
  },
  transitionToView: function(){
    this.transitionToRoute('procedures.view', this.procedure() );
  },
  onReauthenticated(){
    this.transitionToRoute('procedures.edit', this.procedure());
  },

});
