import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('login');
  this.route('engaging-session');

  this.route('users', function(){
    this.route('edit', { path: "edit/:user_id" });
  });

  this.route('procedures', function () {
    this.route('view', {path: "view/:procedure_id"});
    this.route('edit', {path: "edit/:procedure_id"});
    this.route('filter');
  });

  this.route('medicamentos', function () {
    this.route('ver', {path: "ver/:medicamento_id"});
    this.route('editar', {path: "editar/:medicamento_id"});
    this.route('filtrar');
  });

  // Catches all the malformed urls (not matching previous routes)
  this.route('wrong-paths', { path: '/*badUrl' });
});

export default Router;
