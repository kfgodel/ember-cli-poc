import Ember from 'ember';

export default Ember.Service.extend({
  searchExpression: '',
  search(){
    var filterText = this.get('searchExpression');
    var appController = this.get('container').lookup('controller:application');
    appController.transitionToRoute('procedures.filter', {queryParams: {filterText: filterText}});
  }
});
