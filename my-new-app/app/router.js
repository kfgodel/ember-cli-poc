import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('login');

  this.route('users', function(){
    this.route('edit', { path: "edit/:user_id" });
  });

  this.route('procedures', function () {
    this.route('view', {path: "view/:procedure_id"});
    this.route('edit', {path: "edit/:procedure_id"});
  });
});

export default Router;
