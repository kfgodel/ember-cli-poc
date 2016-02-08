import Ember from 'ember';
import ProcedureRepositored from '../../mixins/procedure-repositored';

export default Ember.Controller.extend(ProcedureRepositored, {
  actions: {
    createProcedure: function() {
      this.repo().createProcedure()
        .then(Ember.run.bind(this, this.onProcedureCreated));
    }
  },

  //PRIVATE
  onProcedureCreated: function(createdTo){
    this.transitionToRoute('procedures.edit', createdTo);
  },

});
