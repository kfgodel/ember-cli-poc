import Ember from 'ember';
import ProcedureRepositoryInjected from '../../mixins/procedure-repository-injected';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import AuthenticatorInjected from '../../mixins/authenticator-injected';

export default Ember.Controller.extend(ProcedureRepositoryInjected, AuthenticatorInjected, {
  actions: {
    saveProcedure: function() {
      this.repo().updateProcedure(this.procedure())
        .then(...new ServerPromiseHandler()
          .whenSuccess(Ember.run.bind(this, this.onProcedureUpdated))
          .whenUnauthorized(Ember.run.bind(this, this.onRequestUnauthorized))
          .handlers()
        );
    },
    deleteProcedure: function(){
      this.repo().removeProcedure(this.procedure())
        .then(...new ServerPromiseHandler()
          .whenSuccess(Ember.run.bind(this, this.onProcedureRemoved))
          .whenUnauthorized(Ember.run.bind(this, this.onRequestUnauthorized))
          .handlers()
        );
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
  },
  onRequestUnauthorized(){
    this.authenticator().reauthenticateAndThen(()=>{
      this.transitionToRoute('procedures.edit', this.procedure());
    });
  },

});
