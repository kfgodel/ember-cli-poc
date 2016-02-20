import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositored from '../../mixins/procedure-repositored';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import AuthenticatorInjected from '../../mixins/authenticator-injected';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositored, AuthenticatorInjected,{
  model: function(params){
    var procedureId = params.procedure_id;
    return this.repo().getProcedure(procedureId)
      .then(...new ServerPromiseHandler()
        .whenUnauthorized(()=>{
          this.onRequestUnauthorized(procedureId);
        })
        .handlers()
      );
  },
  // PRIVATE
  onRequestUnauthorized(procedureId){
    this.authenticator().reauthenticateAndThen(()=>{
      this.transitionTo('procedures.view',procedureId);
    });
  },
});
