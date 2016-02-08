import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createProcedure: function() {
      this.repo().createProcedure()
        .then(Ember.run.bind(this, this.onProcedureCreated));
    }
  },

  //PRIVATE
  repositoryLocator: Ember.inject.service('repository-locator'),
  repo: function(){
    return this.get('repositoryLocator').procedures();
  },
  onProcedureCreated: function(createdTo){
    this.transitionToRoute('procedures.edit', createdTo);
  },

});
