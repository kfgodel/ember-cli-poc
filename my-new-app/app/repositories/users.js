import Ember from 'ember';
import RestResource from '../rest/resource';

export default Ember.Object.extend({
  userResource: function(){
    return RestResource.create({namespace: '/api/v1', resourceName: 'users'});
  },
  getAllUsers: function(){
    return this.userResource().getAll()
      .then(function(userTos){
        var userList = Ember.A(userTos).map(function(item){
          return Ember.Object.create(item);
        });
        // Hack to update list after a user delete
        userList.forEach(function(user){
          user.set('containerList', userList);
        });
        return userList;
      });
  },
  createUser: function(){
    return this.userResource().create()
      .then(function(createdTo){
        return Ember.Object.create(createdTo);
      });
  },
  updateUser: function(user){
    // This is needed only because cannot update list on delete?!
    var userData = {
      id: user.get('id'),
      name: user.get('name'),
      login: user.get('login'),
      password: user.get('password')
    };
    return this.userResource().update(userData)
      .then(function(updatedTo){
        return Ember.Object.create(updatedTo);
      });
  },
  removeUser: function(user){
    return this.userResource().remove(user);
  }
});
