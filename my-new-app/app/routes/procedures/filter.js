import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import ProcedureRepositored from '../../mixins/procedure-repositored';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import Authenticatored from '../../mixins/authenticatored';
import Searchered from '../../mixins/searchered';

export default Ember.Route.extend(AuthenticatedRoute, ProcedureRepositored, Authenticatored, Searchered, {
  queryParams:{
    filterText:{
      refreshModel: true,  // Refresh the model whenever the query param changes
    }
  },
  model: function(params){
    var filterText = params.filterText;
    // Because the queyParam is not available to the searcher we let it know its value (needed for URL access)
    this.searcher().set('searchExpression', filterText);
    return this.repo().getAllProceduresMathing(filterText)
      .then(...new ServerPromiseHandler()
        .whenUnauthorized(()=>{
          this.onRequestUnauthorized(filterText);
        })
        .handlers()
      );
  },
  // PRIVATE
  onRequestUnauthorized(filterText){
    this.authenticator().reauthenticateAndThen(()=>{
      this.transitionTo('procedures.filter',  { queryParams: {filterText: filterText} });
    });
  },
});