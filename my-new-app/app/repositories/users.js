import Ember from 'ember';
import EmberResource from '../rest/ember-resource';

export default Ember.Object.extend({
  userResource: function(){
    return EmberResource.create({namespace: '/api/v1', resourceName: 'users'});
  },
  getAllUsers: function(){
    return this.userResource().getAll()
      .then(function(userList){
        // Hack to update list after a user delete
        userList.forEach(function(user){
          user.set('containerList', userList);
        });
        return userList;
      });
  },
  createUser: function(){
    return this.userResource().create();
  },
  updateUser: function(user){
    // This is needed only because cannot update list on delete?!
    var userData = {
      id: user.get('id'),
      name: user.get('name'),
      login: user.get('login'),
      password: user.get('password')
    };
    return this.userResource().update(userData);
  },
  removeUser: function(user){
    return this.userResource().remove(user);
  }
});
