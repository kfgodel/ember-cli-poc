import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import AuthenticatorInjected from '../../mixins/authenticator-injected';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositoryInjected, AuthenticatorInjected, {
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
      this.transitionTo('procedures.edit',procedureId);
    });
  },
});
