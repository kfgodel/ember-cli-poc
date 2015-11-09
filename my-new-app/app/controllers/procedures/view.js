import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editProcedure : function (procedure) {
      this.transitionToRoute('procedures.edit', procedure);
    },
    deleteProcedure: function (procedure) {
      procedure.destroyRecord();
      this.transitionToRoute('procedures');
    }
  }
});
