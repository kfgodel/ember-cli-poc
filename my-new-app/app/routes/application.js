import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    /**
     * This error handler can recover from unauthenticated requests while transitioning to a route.
     * It tries to authenticate first, and then will retry the transition.
     * Helpful for non authenticated routes that make authenticated requests
     */
    error: function(error, transition) {
      if(error.status === '401' || (error.errors && error.errors[0].status === '401')){
        //It's an authentication problem? Try to authenticate first
        var loginController = this.controllerFor('login');
        loginController.set('previousTransition', transition);
        this.transitionTo('login');
      }else{
        // For other error, just log it
        console.log("Route error:");
        console.log(error);
        console.log("Failed transition:");
        console.log(transition);
        return this._super(error, transition);
      }
    }
  }
});
