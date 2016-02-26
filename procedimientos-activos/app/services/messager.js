import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  publish: function() {
    var applied = this.trigger.apply(this, arguments);
    return applied;
  },
  subscribe: function() {
    var suscribed = this.on.apply(this, arguments);
    return suscribed;
  },
  unsubscribe: function() {
    var unsuscribed = this.off.apply(this, arguments);
    return unsuscribed;
  }
});
