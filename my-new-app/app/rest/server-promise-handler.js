export default function ServerPromiseHandler(){
  var noOp = function(){};
  var handlers = {
    successHandler: noOp,
    unauthorizedHandler: noOp,
    elseHandler: noOp,
  };
  this.whenSuccess = function(successHandler){
    handlers.successHandler = successHandler;
    return this;
  };
  this.whenUnauthorized = function(unauthorizedHandler){
    handlers.unauthorizedHandler = unauthorizedHandler;
    return this;
  };
  this.orElse = function(elseHandler){
    handlers.elseHandler = elseHandler;
    // The array must be splatted to handle both cases of 'then()'
    return [handlers.successHandler, this.errorHandler];
  };

  this.errorHandler = function(response){
    var statusCode = response.status;
    if(statusCode === 401){
      handlers.unauthorizedHandler();
    }else{
      handlers.elseHandler();
    }
  };
}