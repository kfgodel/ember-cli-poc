import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import MedicamentoRepositoryInjected from '../../mixins/medicamento-repository-injected';
import SearcherInjected from '../../mixins/searcher-injected';
import MessagerInjected from 'ateam-ember-messager/mixins/messager-injected';

export default Ember.Route.extend(AuthenticatedRoute, MedicamentoRepositoryInjected, SearcherInjected, MessagerInjected, {
  queryParams:{
    filterText:{
      refreshModel: true,  // Refresh the model whenever the query param changes
    }
  },
  model: function(params){
    var filterText = params.filterText;
    // Because the queyParam is not available to the searcher we let it know its value (needed when this route is accessed by url)
    this.communicateQueryParamToSearcher(filterText);

    return this.promiseWaitingFor(this.repo().getAllMedicamentosMathing(filterText))
      .whenInterruptedAndReauthenticated(()=>{
        this.navigator().navigateToMedicamentosListFilteringBy(filterText);
      });
  },
  actions: {
    // Triggered while loading procedures
    loading(transition) {
      this.messager().publish({type: 'medicamentoSearchStarted'});
      transition.promise.finally(()=>{
        this.messager().publish({type: 'medicamentoSearchStopped'});
      });
    }
  },
  // PRIVATE
  communicateQueryParamToSearcher(filterParam){
    this.searcher().set('searchExpression', filterParam);
  }
});