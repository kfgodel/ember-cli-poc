import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['nameOrDescription'],
  nameOrDescription: "",
  actions: {
    createProcedure: function() {
      var newRecord = this.store.createRecord('procedure', {});
      newRecord.save();
      this.transitionToRoute('procedures.edit', newRecord);
    }
  },

  filteredProcedures: Ember.computed('nameOrDescription', function() {
    var nameOrDescription = this.get('nameOrDescription');
    var filteredProcedures = this.store.find('procedure', {searchText: nameOrDescription});
    return filteredProcedures;
  })
});
