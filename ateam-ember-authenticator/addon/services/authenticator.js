import Ember from "ember";
import ServerInteraction from "ateam-ember-resource/rest/server-interaction";
import AuthenticationState from "../utils/authentication-state";
import SessionRequesterInjected from "../mixins/session-requester-injected";
import AuthenticationNavigatorInjected from "../mixins/authentication-navigator-injected";

export default Ember.Service.extend(SessionRequesterInjected, AuthenticationNavigatorInjected, {
  authenticationState: AuthenticationState.create(),
  actionAfterAuthentication: null,

  authenticateIfNeededAndThen(actionAfterAuthentication){
    if (this._state().isAuthenticated()) {
      // No need to authenticate
      return;
    }
    this._afterAuthentication(actionAfterAuthentication);
    // By sending the user to engage screen we start the recovery process
    this.authenticationNavigator().goToSessionRecoveryScreen();
  },

  startSessionRecovery(){
    this._ensureCurrentSession();
    return this._state();
  },
  login(credentials){
    return this.sessionRequester()
      .beginSession(credentials)
      .then(Ember.run.bind(this, this._onUserLoggedIn));
  },
  logout(){
    this.sessionRequester()
      .endSession()
      .then(
        Ember.run.bind(this, this._onUserLoggedOut),
        Ember.run.bind(this, this._onFailedLogout)
      );
  },
  reauthenticateAndThen(action){
    this._afterAuthentication(action);
    this._beginAuthentication();
  },

  // PRIVATE
  _state(){
    return this.get('authenticationState');
  },

  _ensureCurrentSession(){
    new ServerInteraction(this.sessionRequester().getCurrentSession())
      .whenSucceeded(Ember.run.bind(this, this._onSessionRecovered))
      .whenUnauthorized(Ember.run.bind(this, this._onSessionMissing))
      .whenFailed(Ember.run.bind(this, this._onSessionError));
  },
  _onSessionRecovered(){
    this._completeAuthentication();
  },
  _onSessionMissing(){
    this._beginAuthentication();
  },
  _onSessionError(response){
    // Display the error. Probably nothing else to do on our side. Server down?
    this._state().changeStateMessageTo(`${response.status} - ${response.statusText}`);
  },
  _onUserLoggedIn(){
    this._completeAuthentication();
  },
  _onUserLoggedOut(){
    this._beginAuthentication();
  },
  _onFailedLogout(response){
    console.log("Error logging out");
    console.log(response);
  },
  _beginAuthentication(){
    this._state().markAsNotAuthenticated();
    this.authenticationNavigator().goToLoginScreen();
  },
  _completeAuthentication(){
    this._state().markAsAuthenticated();
    var pendingAction = this._getActionAfterAuthentication();
    pendingAction();
  },
  _getActionAfterAuthentication(){
    var pendingAction = this.get('actionAfterAuthentication');
    this.set('actionAfterAuthentication', null);
    if (pendingAction == null) {
      pendingAction = ()=> {
        this.authenticationNavigator().goToInitialScreen();
      };
    }
    return pendingAction;
  },
  _afterAuthentication(actionAfterAuthentication){
    this.set('actionAfterAuthentication', actionAfterAuthentication);
  },


});
