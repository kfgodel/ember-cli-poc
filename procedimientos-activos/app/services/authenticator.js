import Ember from 'ember';
import ServerInteraction from 'ateam-ember-resource/rest/server-interaction';
import NavigatorInjected from '../mixins/navigator-injected';

export default Ember.Service.extend(NavigatorInjected, {
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
      .then(
        Ember.run.bind(this, this.onUserLoggedOut),
        Ember.run.bind(this, this.onFailedLogout)
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
    new ServerInteraction(
      Ember.$.ajax({
        method: 'GET',
        url: sessionUrl,
      })
    ).whenSucceeded(Ember.run.bind(this, this.onSessionAvailable))
     .whenUnauthorized(Ember.run.bind(this, this.onSessionMissing))
     .whenFailed(Ember.run.bind(this, this.onRequestError));
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
  makeUserLogin(){
    this.navigator().navigateToLogin();
  },
  defaultPostAuthenticationAction(){
    return ()=>{
      this.navigator().navigateToIndex();
    };
  },
  onUserLoggedIn(){
    this.onSessionAvailable();
  },
  onUserLoggedOut(){
    this.markAsNotAuthenticated();
    this.makeUserLogin();
  },
  onFailedLogout(response){
    console.log("Error logging out");
    console.log(response);
  },
});
