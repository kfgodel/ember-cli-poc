import Ember from 'ember';

export default Ember.Object.extend({
  getAllUsers: function(){
    return Ember.$.ajax({
      method: "GET",
      url: "/api/v1/users",
      dataType: 'json'
    }).then(function(userTos){
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
    return Ember.$.ajax({
      method: "POST",
      url: "/api/v1/users",
      dataType: 'json'
    }).then(function(createdTo){
      return Ember.Object.create(createdTo);
    });
  },
  updateUser: function(user){
    var userId = user.get('id');
    // This is needed only because cannot update list on delete?!
    var sentData = {
      name: user.get('name'),
      login: user.get('login'),
      password: user.get('password'),
      id: userId
    };
    return Ember.$.ajax({
      method: "PUT",
      url: "/api/v1/users/" + userId,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(sentData)
    });
  },
  deleteUser: function(user){
    var userId = user.get('id');
    return Ember.$.ajax({
      method: "DELETE",
      url: "/api/v1/users/" + userId,
      dataType: 'json'
    });
  }
});
