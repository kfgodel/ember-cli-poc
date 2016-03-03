import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';
import SearcherInjected from '../../mixins/searcher-injected';
import MessagerInjected from 'ateam-ember-messager/mixins/messager-injected';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositoryInjected, SearcherInjected, MessagerInjected, {
  queryParams:{
    filterText:{
      refreshModel: true,  // Refresh the model whenever the query param changes
    }
  },
  model: function(params){
    var filterText = params.filterText;
    // Because the queyParam is not available to the searcher we let it know its value (needed when this route is accessed by url)
    this.communicateQueryParamToSearcher(filterText);

    return this.promiseWaitingFor(this.repo().getAllProceduresMathing(filterText))
      .whenInterruptedAndReauthenticated(()=>{
        this.navigator().navigateToProceduresListFilteringBy(filterText);
      });
  },
  actions: {
    // Triggered while loading procedures
    loading(transition, originRoute) {
      this.messager().publish({type: 'procedureSearchStarted'});
      transition.promise.finally(()=>{
        this.messager().publish({type: 'procedureSearchStopped'});
      });
    }
  },
  // PRIVATE
  communicateQueryParamToSearcher(filterParam){
    this.searcher().set('searchExpression', filterParam);
  }
});