import Ember from 'ember';
import EmberResource from '../rest/ember-resource';

export default Ember.Object.extend({
  userResource: function(){
    return EmberResource.create({namespace: '/api/v1', resourceName: 'users'});
  },
  getAllUsers: function(){
    return this.userResource().getAll();
  },
  createUser: function(){
    return this.userResource().create();
  },
  updateUser: function(user){
    return this.userResource().update(user);
  },
  removeUser: function(user){
    return this.userResource().remove(user);
  }
});