import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositored from '../../mixins/procedure-repositored';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositored, {
  model: function(params){
    return this.repo().getProcedure(params.procedure_id);
  },
});
