import Ember from 'ember';
import AuthenticatedRoute from '../mixins/authenticated-route';
import UserRepo from '../repositories/users';

export default Ember.Route.extend(AuthenticatedRoute, {
  model: function(){
    var repo = UserRepo.create();
    return repo.getAllUsers();
  }
});
