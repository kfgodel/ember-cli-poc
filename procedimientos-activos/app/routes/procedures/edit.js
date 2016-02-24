import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositoryInjected, {
  model: function(params){
    var procedureId = params.procedure_id;

    return this.promiseWaitingFor(this.repo().getProcedure(procedureId))
      .whenInterruptedAndReauthenticated(()=>{
        this.navigator().navigateToProcedureEdit(procedureId);
      });
  },
  // PRIVATE
});
