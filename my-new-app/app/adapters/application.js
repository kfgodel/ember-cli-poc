import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',
  shouldReloadAll: function(){
    // We want the store to re-fetch the backend every time findAll is called (instead of using cached versions)
    return true;
  },
  shouldReloadRecord: function(){
    // We want the store to re-fetch the backend every time find is called (instead of using cached versions)
    return true;
  }
});
