import Ember from 'ember';

/**
 * This type represents the application navigator that knows how to navigate to different sections of the applications
 * requiring the needed arguments in each case.
 *   This class abstracts ember routes and adds semantic specific to this app
 */
export default Ember.Service.extend({
  navigateToLogin(){
    this.navigateTo('login');
  },
  navigateToIndex(){
    this.navigateTo('index');
  },
  /**
   * Moves the user to the procedures list. It doesn't force a model refresh
   */
  navigateToProceduresList(){
    this.navigateTo('procedures.filter');
  },
  navigateToProceduresListFilteringBy(filterText){
    this.navigateTo('procedures.filter', undefined, {filterText: filterText});
  },
  navigateToProcedureView(procedure){
    this.navigateTo('procedures.view', procedure);
  },
  navigateToProcedureEdit(procedure){
    this.navigateTo('procedures.edit', procedure);
  },
  navigateToUsers(){
    this.navigateTo('users');
  },
  navigateToUsersEdit(user){
    this.navigateTo('users.edit', user);
  },


  // PRIVATE
  transitionerService: Ember.inject.service('transitioner'), // Router made as a service
  transitioner(){
    return this.get('transitionerService');
  },
  navigateTo(routeName, models, queryParams){
    this.transitioner().transitionTo(routeName, models, queryParams);
  }
});