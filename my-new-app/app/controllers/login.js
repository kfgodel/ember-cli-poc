import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    logIn: function() {
      this.requestLogin();
    }
  },

  // PRIVATE
  authenticator: Ember.inject.service('authenticator'),
  credentials(){
    return this.get('model');
  },
  requestLogin(){
    var credentials = this.credentials();
    return this.get('authenticator').login(credentials)
      .then(
        Ember.run.bind(this, this.onSuccessfulLogin),
        Ember.run.bind(this, this.onRequestError)
      );
  },
  onSuccessfulLogin(){
    this.changeErrorMessage("Success!");
  },
  onRequestError(response){
    var statusCode = response.status;
    var errorMessage;
    if(statusCode === 401){
      errorMessage = "Invalid credentials";
    }else{
      errorMessage = "Unknown error: " + statusCode + " - " + response.statusText;
    }
    this.changeErrorMessage(errorMessage);
  },
  changeErrorMessage(newMessage){
    this.set("errorMessage", newMessage);
  }
});
