import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  queryParams:{
    filterText:{
      refreshModel: true,  // Refresh the model whenever phylum changes
    }
  },
  model: function(params){
    var filterText = params.filterText;
    return this.repo().getAllProceduresMathing(filterText);
  },
  // PRIVATE
  repositoryLocator: Ember.inject.service('repository-locator'),
  repo: function(){
    return this.get('repositoryLocator').procedures();
  },

});