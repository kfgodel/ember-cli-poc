import Ember from 'ember';
import ProcedureRepo from '../repositories/procedures';

export default Ember.Controller.extend({
  queryParams: ['nameOrDescription'],
  nameOrDescription: "",
  actions: {
    createProcedure: function() {
      this.repo().createProcedure()
        .then(Ember.run.bind(this, this.onProcedureCreated));
    }
  },

  //PRIVATE
  repo: function(){
    return ProcedureRepo.create();
  },
  onProcedureCreated: function(createdTo){
    this.procedures().addObject(createdTo);
    this.transitionToRoute('procedures.edit', createdTo);
  },
  procedures: function(){
    return this.get('model');
  },
  onNameOrDescriptionChanged: Ember.observer('nameOrDescription', function() {
    var nameOrDescription = this.get('nameOrDescription');
    this.repo().getAllProceduresMathing(nameOrDescription)
      .then(Ember.run.bind(this, this.onProceduresReloaded));
  }),
  onProceduresReloaded: function(loadedProcedures){
    this.set('model', loadedProcedures);
  },
  onProcedureRemoved: function(removedProcedure){
    this.procedures().removeObject(removedProcedure);
  }

});
