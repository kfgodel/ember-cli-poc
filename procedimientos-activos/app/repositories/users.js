import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";

export default Ember.Object.extend({
  getAllUsers: function(){
    return this.userResource().getAll();
  },
  createUser: function(){
    return this.userResource().create();
  },
  getUser: function (userId) {
    return this.userResource().getSingle(userId);
  },
  updateUser: function(user){
    return this.userResource().update(user);
  },
  removeUser: function(user){
    return this.userResource().remove(user);
  },
  // PRIVATE
  userResource: function(){
    return EmberResource.create({resourceName: 'users', resourceLocator: this.get('resourceLocator')});
  },
});
