import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    create: function() {
      var newUser = this.store.createRecord('user', {});
      newUser.save();
    }
  }
});
