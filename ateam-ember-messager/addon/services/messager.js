import Ember from 'ember';

/**
 * This type provides messaging services across controllers, or structurally unrelated application parts.
 *  This service should not be used where ember provides a natural communication mechanism (components, templates).
 *  It's purpose is to supply a low copuling communication mechanism where there's no natural alternative, like between
 *  services or controllers.
 */
export default Ember.Service.extend(Ember.Evented, {
  /**
   * Broadcasts the given message to the subscribed listeners
   * The message 'type' attribute is used as channel for suscribers
   * @param message The message to broadcast
   */
  publish: function(message) {
    var applied = this.trigger(message.type, message);
    return applied;
  },
  /**
   * Registers a new callbak to be executed when a message is received.
   *   The message definition 'type' attribute is used as channel name to register
   * @param messageDefinition An object with a type attribute indicating the suscribed channel
   * @param callback The callback method to be executed with the received message as argument
   */
  subscribe: function(messageDefinition, callback) {
    var suscribed = this.on(messageDefinition.type, callback);
    return suscribed;
  },
  /**
   * Desuscribes the given callback from the specified message definition.
   *   The message definition 'type' attribute is used as channel name to unregister
   * @param messageDefinition The message specificacion
   * @param callback The callback to unregister
   */
  unsubscribe: function(messageDefinition, callback) {
    var unsuscribed = this.off(messageDefinition.type);
    return unsuscribed;
  }
});
