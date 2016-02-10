import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositored from '../../mixins/procedure-repositored';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import Authenticatored from '../../mixins/authenticatored';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositored, Authenticatored, {
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
    this.transitionTo('login');
    this.authenticator().restartAndAfterAuthentication(()=>{
      this.transitionTo('procedures.edit',procedureId);
    });
  },
});
