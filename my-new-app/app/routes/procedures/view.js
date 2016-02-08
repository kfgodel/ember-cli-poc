import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model: function(params){
    return this.repo().getProcedure(params.procedure_id);
  },
  // PRIVATE
  repositoryLocator: Ember.inject.service('repository-locator'),
  repo: function(){
    return this.get('repositoryLocator').procedures();
  },
});
