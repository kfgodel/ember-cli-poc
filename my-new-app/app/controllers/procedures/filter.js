import Ember from 'ember';
import ProcedureRepositored from '../../mixins/procedure-repositored';
import ServerPromiseHandler from '../../rest/server-promise-handler';
import AuthenticatorInjected from '../../mixins/authenticator-injected';

export default Ember.Controller.extend(ProcedureRepositored, AuthenticatorInjected, {
  actions: {
    createProcedure: function() {
      this.repo().createProcedure()
        .then(...new ServerPromiseHandler()
          .whenSuccess(Ember.run.bind(this, this.onProcedureCreated))
          .whenUnauthorized(Ember.run.bind(this, this.onRequestUnauthorized))
          .handlers()
        );
    }
  },

  //PRIVATE
  onProcedureCreated: function(createdTo){
    this.transitionToRoute('procedures.edit', createdTo);
  },
  onRequestUnauthorized(){
    this.authenticator().reauthenticateAndThen(()=>{
      this.transitionToRoute('procedures.filter');
    });
  }
});
