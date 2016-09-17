import Ember from "ember";
import UserRepository from "../repositories/users";
import ProcedureRepository from "../repositories/procedures";
import ResourceLocatorInjected from "ateam-ember-authenticator/mixins/resource-locator-injected";

export default Ember.Service.extend(ResourceLocatorInjected, {
  users(){
    return UserRepository.create({resourceLocator: this.resourceLocator()});
  },
  procedures(){
    return ProcedureRepository.create({resourceLocator: this.resourceLocator()});
  },

});
