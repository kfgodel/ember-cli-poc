import Ember from 'ember';
import EmberResource from '../rest/ember-resource';

export default Ember.Service.extend({
  authenticationState: Ember.Object.create({authenticated: false, message: '...'}),
  actionAfterAuthentication: null,
  ifNotAuthenticated(action){
    if(!this.isAuthenticated()){
      action();
    }
  },
  afterAuthentication(actionAfterAuthentication){
    this.set('actionAfterAuthentication', actionAfterAuthentication);
  },
  authenticate(){
    this.engageServerSession();
    return this.state();
  },
  login(credentials){
    return Ember.$.post("/j_security_check", {
      j_username: credentials.login,
      j_password: credentials.password })
      .then(Ember.run.bind(this, this.onUserLoggedIn));
  },

  // PRIVATE
  isAuthenticated(){
    return this.state().get('authenticated');
  },
  state(){
    return this.get('authenticationState');
  },
  engageServerSession(){
    Ember.$.ajax({
      method: 'GET',
      url: '/api/v1/session',
    }).then(Ember.run.bind(this, this.onSessionAvailable),
            Ember.run.bind(this, this.onRequestError));
  },
  onSessionAvailable(){
    this.markAsAuthenticated();
    var pendingAction = this.postAuthenticationAction();
    pendingAction();
  },
  markAsAuthenticated(){
    this.state().set('authenticated', true);
    this.changeStateMessageTo('OK!');
  },
  postAuthenticationAction(){
    var pendingAction = this.get('actionAfterAuthentication');
    this.set('actionAfterAuthentication', null);
    if(pendingAction == null){
      pendingAction = this.defaultPostAuthenticationAction();
    }
    return pendingAction;
  },
  changeStateMessageTo(newMessage){
    this.state().set('message', newMessage);
  },
  onRequestError(response){
    var statusCode = response.status;
    if(statusCode === 401){
      // There¡s no active session. We need the user to create one
      this.makeUserLogin();
    }else{
      // Display the error. Probably nothing else to do on our side. Server down?
      this.changeStateMessageTo(`${statusCode} - ${response.statusText}`);
    }
  },
  routing: Ember.inject.service('-routing'),
  makeUserLogin(){
    this.router().transitionTo('login');
  },
  router(){
    return this.get('routing');
  },
  defaultPostAuthenticationAction(){
    return ()=>{
      this.router().transitionTo('index');
    };
  },
  onUserLoggedIn(){
    this.onSessionAvailable();
  }
});
