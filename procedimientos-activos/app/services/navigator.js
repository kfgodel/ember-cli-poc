import Ember from 'ember';

/**
 * This type represents the application navigator that knows how to navigate to different sections of the applications
 * requiring the needed arguments in each case.
 *   This class abstracts ember routes and adds semantic specific to this app
 */
export default Ember.Service.extend({
  navigateToEngageSession(){
    this.navigateTo('engaging-session');
  },
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
  /**
   * Moves the user to the procedures list indicating a new query param that refreshes the model
   * @param filterText the text to filter procedures
   */
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
  navigateToMedicamentosList(){
    this.navigateTo('medicamentos.filtrar');
  },
  navigateToMedicamentosListFilteringBy(filterText){
    this.navigateTo('medicamentos.filtrar', undefined, {filterText: filterText});
  },
  navigateToMedicamentoView(medicamento){
    this.navigateTo('medicamentos.ver', medicamento);
  },
  navigateToMedicamentoEdit(medicamento){
    this.navigateTo('medicamentos.editar', medicamento);
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