import Ember from 'ember';
import ServerPromiseHandler from '../rest/server-promise-handler';
import Authenticatored from '../mixins/authenticatored';

export default Ember.Controller.extend(Authenticatored, {
  actions: {
    logIn: function() {
      this.requestLogin();
    }
  },

  // PRIVATE
  credentials(){
    return this.get('model');
  },
  requestLogin(){
    var credentials = this.credentials();
    return this.authenticator().login(credentials)
      .then(...new ServerPromiseHandler()
        .whenSuccess(Ember.run.bind(this, this.onSuccessfulLogin))
        .whenUnauthorized(Ember.run.bind(this, this.onBadCredentials))
        .orElse(Ember.run.bind(this, this.onRequestError))
      );
  },
  onSuccessfulLogin(){
    this.changeErrorMessage("");
  },
  onBadCredentials(){
    this.changeErrorMessage("Invalid credentials");
  },
  onRequestError(response){
    var errorMessage = `Unknown error: ${response.status} - ${response.statusText}`;
    this.changeErrorMessage(errorMessage);
  },
  changeErrorMessage(newMessage){
    this.set("errorMessage", newMessage);
  }
});
