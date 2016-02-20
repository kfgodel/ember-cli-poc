import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';
import AuthenticatorInjected from '../../mixins/authenticator-injected';

export default Ember.Controller.extend(ProcedureRepositoryInjected, AuthenticatorInjected, {
  actions: {
    editProcedure : function (procedure) {
      this.transitionToRoute('procedures.edit', procedure);
    },
    deleteProcedure: function (procedure) {
      this.promiseWaitingFor(this.repo().removeProcedure(procedure))
        .whenSucceeded(Ember.run.bind(this, this.onProcedureRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated))
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
  }
});
