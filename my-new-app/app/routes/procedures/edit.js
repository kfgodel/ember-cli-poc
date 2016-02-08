import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositored from '../../mixins/procedure-repositored';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositored, {
  model: function(params){
    var procedureId = params.procedure_id;
    return this.repo().getProcedure(procedureId);
  },
});
