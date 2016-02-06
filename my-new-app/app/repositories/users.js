import Ember from 'ember';

export default Ember.Object.extend({
  getAllUsers: function(){
    return Ember.$.ajax({
      type: "GET",
      url: "/api/v1/users",
      dataType: "json"
    }).then(function(userTos){
      return Ember.A(userTos);
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
  }
});
