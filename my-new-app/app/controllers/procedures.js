import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['nameOrDescription'],
  nameOrDescription: "",
  actions: {
    createProcedure: function() {
      var newRecord = this.store.createRecord('procedure', {});
      var controller = this;
      newRecord.save().then(function(){
        controller.transitionToRoute('procedures.edit', newRecord);
      });
    }
  },

  filteredProcedures: Ember.computed('nameOrDescription', function() {
    var nameOrDescription = this.get('nameOrDescription');
    var filteredProcedures = this.store.query('procedure', {searchText: nameOrDescription});
    return filteredProcedures;
  })
});
