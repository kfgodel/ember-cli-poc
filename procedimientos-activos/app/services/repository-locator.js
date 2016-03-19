import Ember from 'ember';
import UserRepository from '../repositories/users';
import ProcedureRepository from '../repositories/procedures';
import MedicamentoRepository from '../repositories/medicamentos';

export default Ember.Service.extend({
  users(){
    return UserRepository.create({resourceLocator: this.locator()});
  },
  procedures(){
    return ProcedureRepository.create({resourceLocator: this.locator()});
  },
  medicamentos(){
    return MedicamentoRepository.create({resourceLocator: this.locator()});
  },

  // PRIVATE
  resourceLocator: Ember.inject.service('resource-locator'),
  locator(){
    return this.get('resourceLocator');
  }
});
