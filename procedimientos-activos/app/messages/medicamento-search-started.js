
var messageClass = function ProcedureSearchStarted(){
  this.type = 'medicamentoSearchStarted';
};

// Instancia que sirve de ejemplo para la suscripcion
messageClass.exampleMessage = new messageClass();

export default messageClass;