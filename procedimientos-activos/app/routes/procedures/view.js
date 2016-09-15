import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import ProcedureRepositoryInjected from "../../mixins/procedure-repository-injected";

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositoryInjected, {
  model: function(params){
    var procedureId = params.procedure_id;

    return this.promiseWaitingFor(this.repo().getProcedure(procedureId))
      .whenInterruptedAndReauthenticated(()=>{
        this.navigator().navigateToProcedureView(procedureId);
      });
  },
  // PRIVATE
});
