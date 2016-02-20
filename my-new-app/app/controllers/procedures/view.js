import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import AuthenticatorInjected from '../../mixins/authenticator-injected';

export default Ember.Controller.extend(ProcedureRepositoryInjected, AuthenticatorInjected, {
  actions: {
    editProcedure : function (procedure) {
      this.transitionToRoute('procedures.edit', procedure);
    },
    deleteProcedure: function (procedure) {
      this.repo().removeProcedure(procedure)
        .then(...new ServerPromiseHandler()
          .whenSuccess(Ember.run.bind(this, this.onProcedureRemoved))
          .whenUnauthorized(Ember.run.bind(this, this.onRequestUnauthorized))
          .handlers()
        );
    }
  },
  // PRIVATE
  procedure: function(){
    return this.get('model');
  },
  onProcedureRemoved: function(){
    this.transitionToRoute('procedures.filter');
  },
  onRequestUnauthorized(){
    this.authenticator().reauthenticateAndThen(()=>{
      this.transitionToRoute('procedures.view', this.procedure());
    });
  }
});
