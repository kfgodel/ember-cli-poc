import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveProcedure: function() {
      this.repo().updateProcedure(this.procedure())
        .then(Ember.run.bind(this, this.onProcedureUpdated));
    },
    deleteProcedure: function(){
      this.repo().removeProcedure(this.procedure())
        .then(Ember.run.bind(this, this.onProcedureRemoved));
    },
    cancelEdition: function(){
      this.transitionToView();
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
  onProcedureUpdated: function(updatedTo){
    this.procedure().setProperties(updatedTo);
    this.transitionToView();
  },
  onProcedureRemoved: function(){
    this.transitionToRoute('procedures.filter');
  },
  transitionToView: function(){
    this.transitionToRoute('procedures.view', this.procedure() );
  }
});
