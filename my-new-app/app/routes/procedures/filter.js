import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';
import SearcherInjected from '../../mixins/searcher-injected';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositoryInjected, SearcherInjected, {
  queryParams:{
    filterText:{
      refreshModel: true,  // Refresh the model whenever the query param changes
    }
  },
  model: function(params){
    var filterText = params.filterText;
    // Because the queyParam is not available to the searcher we let it know its value (needed for URL access)
    this.searcher().set('searchExpression', filterText);

    return this.promiseWaitingFor(this.repo().getAllProceduresMathing(filterText))
      .whenInterruptedAndReauthenticated(()=>{
        this.transitionTo('procedures.filter',  { queryParams: {filterText: filterText} });
      });
  },
  // PRIVATE
});