import Ember from 'ember';
import DS from 'ember-data';
import loginRoute from '../routes/login';

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',
  shouldReloadAll: function(){
    // We want the store to re-fetch the backend every time findAll is called (instead of using cached versions)
    return true;
  }
});
