import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositored from '../../mixins/procedure-repositored';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositored, {
  queryParams:{
    filterText:{
      refreshModel: true,  // Refresh the model whenever phylum changes
    }
  },
  model: function(params){
    var filterText = params.filterText;
    return this.repo().getAllProceduresMathing(filterText);
  },
});