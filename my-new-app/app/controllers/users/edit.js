import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      this.get('model').save();
    },
    remove: function(){
      var model = this.get('model');
      model.deleteRecord();
      model.save();
    }
  }
});
