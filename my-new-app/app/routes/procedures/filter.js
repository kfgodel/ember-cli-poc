import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepo from '../../repositories/procedures';

export default Ember.Route.extend(AuthenticatedRoute, {
  queryParams:{
    filterText:{
      refreshModel: true,  // Refresh the model whenever phylum changes
    }
  },
  model: function(params){
    var filterText = params.filterText;
    var repo = ProcedureRepo.create();
    return repo.getAllProceduresMathing(filterText);
  }
});