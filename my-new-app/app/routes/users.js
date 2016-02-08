import Ember from 'ember';
import AuthenticatedRoute from '../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model: function(){
    var repo = this.get('repositoryLocator').users();
    return repo.getAllUsers();
  },
  // PRIVATE
  repositoryLocator: Ember.inject.service('repository-locator'),
});
