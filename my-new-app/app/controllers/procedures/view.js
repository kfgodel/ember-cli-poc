import Ember from 'ember';
import ProcedureRepositored from '../../mixins/procedure-repositored';

export default Ember.Controller.extend(ProcedureRepositored, {
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
  procedure: function(){
    return this.get('model');
  },
  onProcedureRemoved: function(){
    this.transitionToRoute('procedures.filter');
  },

});
