import Ember from "ember";
import MessageServiceInjected from "../mixins/message-service-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los usuarios
 */
export default Ember.Service.extend(MessageServiceInjected, {

  getAllUsers: function () {
    return this.send({recurso: 'GET/users'});
  },
  createUser: function () {
    return this.send({recurso: 'POST/user'});
  },
  getUser: function (userId) {
    return this.send({recurso: 'GET/user', id: userId});
  },
  updateUser: function (user) {
    var message = user.getProperties(Object.keys(user));
    message.recurso = 'PUT/user';
    return this.send(message);
  },
  removeUser: function (user) {
    return this.send({recurso: 'DELETE/user', id: user.get('id')});
  },
  // PRIVATE
  send(messageContent){
    var message = Ember.Object.create(messageContent);
    return this.messageService().sendMessage(message);
  }

});