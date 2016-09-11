/**
 * This class represents a backend interaction in which the error cause can be discriminated as an authentication problem
 *
 * @param requestPromise The request promise to decorate
 */
export default function ServerInteraction(requestPromise){
  var _handlers;
  /**
   * Defines a callback for sucess handling
   * @param action The function that will receive the backend response as an object
   */
  this.whenSucceeded = function(action){
    _handlers.successHandler = action;
    return this;
  };
  /**
   * Defines the callback to call after a needed authentication and allows retrying the failed action (or something else)
   * @param action The function that will get called after a successful reauthentication (no arg)
   */
  this.whenInterruptedAndReauthenticated = function(action){
    _handlers.reauthenticationHandler = action;
    return this;
  };
  /**
   * Defines a callback to be used when the request is rejected as unatithenticated (401).
   * This callback receives a function as an argument to be called after a succesful authentication
   * @param action The function to be called when unauthenticated to authenticate (or handle the error)
   */
  this.whenUnauthorized = function(action){
    _handlers.authenticationHandler = action;
    return this;
  };
  /**
   * Defines the callback to use when the requests fails due to an unknown error
   * @param action The function that receives the response as an argument
   */
  this.whenFailed = function(action){
    _handlers.errorHandler = action;
    return this;
  };

  // PRIVATE
  var _defaultHandler = function (value) {
    return value;
  };
  _handlers = {
    successHandler: _defaultHandler,
    authenticationHandler: _defaultHandler,
    reauthenticationHandler: _defaultHandler,
    errorHandler: _defaultHandler,
  };

  var _successfulRequestHandler = function (value) {
    return _handlers.successHandler(value);
  };
  var _failedRequestHandler = function (response) {
    var statusCode = response.status;
    if(statusCode === 401){
      _handlers.authenticationHandler(_handlers.reauthenticationHandler);
    }else{
      _handlers.errorHandler();
    }
  };

  var _interactionPromise = requestPromise.then(_successfulRequestHandler, _failedRequestHandler);

  /**
   * Method implemented to be a valid ember promise
   */
  this.then = function(succes, error){
    return _interactionPromise.then(succes, error);
  };
}