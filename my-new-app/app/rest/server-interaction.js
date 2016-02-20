export default function ServerInteraction(requestPromise){
  var handlers;
  // PUBLIC
  this.whenSucceeded = function(action){
    handlers.successHandler = action;
    return this;
  };
  this.whenInterruptedAndReauthenticated = function(action){
    handlers.reauthenticationHandler = action;
    return this;
  };
  this.whenUnauthorized = function(action){
    handlers.authenticationHandler = action;
    return this;
  };
  this.whenFailed = function(action){
    handlers.errorHandler = action;
    return this;
  };

  // PRIVATE
  var defaultHandler = function(value){return value;};
  handlers = {
    successHandler: defaultHandler,
    authenticationHandler: defaultHandler,
    reauthenticationHandler: defaultHandler,
    errorHandler: defaultHandler,
  };

  var successfulRequestHandler = function(value){
    return handlers.successHandler(value);
  };
  var failedRequestHandler = function(response){
    var statusCode = response.status;
    if(statusCode === 401){
      handlers.authenticationHandler(handlers.reauthenticationHandler);
    }else{
      handlers.errorHandler();
    }
  };

  var interactionPromise = requestPromise.then(successfulRequestHandler, failedRequestHandler)
  // Make this instance appear as a promise
  this.then = function(succes, error){
    return interactionPromise.then(succes, error);
  }
};