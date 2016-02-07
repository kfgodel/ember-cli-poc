import Ember from 'ember';
import ProcedureRepo from '../../repositories/procedures';


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
  repo: function(){
    return ProcedureRepo.create();
  },
  procedure: function(){
    return this.get('model');
  },
  onProcedureRemoved: function(){
    this.transitionToRoute('procedures.filter');
  },

});
