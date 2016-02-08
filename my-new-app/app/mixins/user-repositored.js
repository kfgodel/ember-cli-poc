import Ember from 'ember';
import Repositored from './repositored';

/**
 * This Mixin adds behavior and injection to access the user repository
 */
export default Ember.Mixin.create(Repositored, {
  repo(){
    return this.repositories().users();
  },
});
