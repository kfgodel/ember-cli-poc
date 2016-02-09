export default function ServerErrorHandler(){
  var noOp = function(){};
  var handlers = {
    unauthorizedHandler: noOp,
    elseHandler: noOp,
  };
  this.whenUnauthorized = function(unauthorizedHandler){
    handlers.unauthorizedHandler = unauthorizedHandler;
    return this;
  };
  this.orElse = function(elseHandler){
    handlers.elseHandler = elseHandler;
    return this.promiseHandler;
  };
  this.promiseHandler = function(response){
    var statusCode = response.status;
    if(statusCode === 401){
      handlers.unauthorizedHandler();
    }else{
      handlers.elseHandler();
    }
  }
}