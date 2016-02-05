import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveProcedure: function() {
      var procedure = this.get('model');
      var controller = this;
      procedure.save().then(function(){
        controller.transitionToRoute('procedures.view', procedure );
      });
    },
    deleteProcedure: function(){
      var model = this.get('model');
      var controller = this;
      model.destroyRecord().then(function(){
        controller.transitionToRoute('procedures');
      });
    },
    cancelEdition: function(){
      var procedure = this.get('model');
      this.transitionToRoute('procedures.view', procedure);
    }
  }
});
