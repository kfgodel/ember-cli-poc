import Ember from 'ember';
import AuthenticatedRoute from '../mixins/authenticated-route';
import ProcedureRepo from '../repositories/procedures';

export default Ember.Route.extend(AuthenticatedRoute, {
  model: function(){
    var repo = ProcedureRepo.create();
    return repo.getAllProcedures();
  }
});
