import Ember from 'ember';

export default Ember.Object.extend({
  getAllUsers: function(){
    return Ember.$.ajax({
      type: "GET",
      url: "/api/v1/users",
      dataType: "json"
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
      type: "POST",
      url: "/api/v1/users",
      dataType: "json"
    }).then(function(createdTo){
      return Ember.Object.create(createdTo);
    });
  },
  deleteUser: function(user){
    var userId = user.get('id');
    return Ember.$.ajax({
      type: "DELETE",
      url: "/api/v1/users/" + userId,
      dataType: "json"
    })
  }
});
