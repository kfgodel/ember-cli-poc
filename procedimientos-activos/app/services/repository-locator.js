import Ember from 'ember';
import UserRepository from '../repositories/users';
import ProcedureRepository from '../repositories/procedures';

export default Ember.Service.extend({
  users(){
    return UserRepository.create({resourceLocator: this.locator()});
  },
  procedures(){
    return ProcedureRepository.create({resourceLocator: this.locator()});
  },

  // PRIVATE
  resourceLocator: Ember.inject.service('resource-locator'),
  locator(){
    return this.get('resourceLocator');
  }
});
