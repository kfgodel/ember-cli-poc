import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editProcedure : function (procedure) {
      this.transitionToRoute('procedures.edit', procedure);
    },
    deleteProcedure: function (procedure) {
      this.repo().removeProcedure(procedure)
        .then(Ember.run.bind(this, this.onProcedureRemoved));
    }
  },
  // PRIVATE
  repositoryLocator: Ember.inject.service('repository-locator'),
  repo: function(){
    return this.get('repositoryLocator').procedures();
  },
  procedure: function(){
    return this.get('model');
  },
  onProcedureRemoved: function(){
    this.transitionToRoute('procedures.filter');
  },

});
