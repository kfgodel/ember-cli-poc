import Ember from 'ember';
import ProcedureRepo from '../../repositories/procedures';

export default Ember.Controller.extend({
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
    this.transitionToRoute('procedures.edit', createdTo);
  },

});
