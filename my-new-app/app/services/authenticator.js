import Ember from 'ember';
import ServerPromiseHandler from '../rest/server-promise-handler';

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
  logout(){
    Ember.$.post("/j_logout", {})
      .then(Ember.run.bind(this, this.onUserLoggedOut),
        function(response){
          console.log("Error logging out");
          console.log(response);
        }
      );
  },
  reauthenticateAndThen(action){
    this.markAsNotAuthenticated();
    this.afterAuthentication(action);
    this.makeUserLogin();
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
    }).then(...new ServerPromiseHandler()
        .whenSuccess(Ember.run.bind(this, this.onSessionAvailable))
        .whenUnauthorized(Ember.run.bind(this, this.onSessionMissing))
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
  markAsNotAuthenticated(){
    this.state().set('authenticated', false);
    this.changeStateMessageTo('...');
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
  onSessionMissing(){
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
  },
  onUserLoggedOut(){
    this.markAsNotAuthenticated();
    this.makeUserLogin();
  },
  currentUrl(){
    var completeUrl = window.location.href;
    var protocolSeparator = completeUrl.indexOf('//');
    if(protocolSeparator === -1){
      // The url is not as expected, return wathever it is
      return completeUrl;
    }
    var hostSeparator = completeUrl.indexOf("/", protocolSeparator + 2);
    if(hostSeparator === -1){
      // The url is not as expected, return wathever it is
      return completeUrl;
    }
    var currentUrl = completeUrl.substring(hostSeparator);
    return currentUrl;
  }
});
