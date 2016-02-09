import Ember from 'ember';
import ServerErrorHandler from '../rest/server-error';

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
    var loginUrl = this.locator().loginUrl();
    return Ember.$.post(loginUrl, {
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
  resourceLocator: Ember.inject.service('resource-locator'),
  locator(){
    return this.get('resourceLocator');
  },
  engageServerSession(){
    var sessionUrl = this.locator().resourceUrl('session');
    Ember.$.ajax({
      method: 'GET',
      url: sessionUrl,
    }).then(
      Ember.run.bind(this, this.onSessionAvailable),
      new ServerErrorHandler()
        .whenUnauthorized(Ember.run.bind(this, this.onSessionLost))
        .orElse(Ember.run.bind(this, this.onRequestError))
      );
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
  onSessionLost(){
    this.makeUserLogin();
  },
  onRequestError(response){
    // Display the error. Probably nothing else to do on our side. Server down?
    this.changeStateMessageTo(`${response.status} - ${response.statusText}`);
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
