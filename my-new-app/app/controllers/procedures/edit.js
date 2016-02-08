import Ember from 'ember';
import ProcedureRepositored from '../../mixins/procedure-repositored';

export default Ember.Controller.extend(ProcedureRepositored, {
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
