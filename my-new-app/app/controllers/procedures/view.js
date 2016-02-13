import Ember from 'ember';
import ProcedureRepositored from '../../mixins/procedure-repositored';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import Authenticatored from '../../mixins/authenticatored';

export default Ember.Controller.extend(ProcedureRepositored, Authenticatored, {
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
