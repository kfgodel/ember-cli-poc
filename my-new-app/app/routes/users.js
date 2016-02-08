import Ember from 'ember';
import AuthenticatedRoute from '../mixins/authenticated-route';
import UserRepositored from '../mixins/user-repositored';

export default Ember.Route.extend(AuthenticatedRoute, UserRepositored, {
  model: function(){
    return this.repo().getAllUsers();
  },
});
