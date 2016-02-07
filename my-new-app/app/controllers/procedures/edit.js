import Ember from 'ember';
import ProcedureRepo from '../../repositories/procedures';

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
  repo: function(){
    return ProcedureRepo.create();
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
