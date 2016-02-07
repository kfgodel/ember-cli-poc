import Ember from 'ember';

export default Ember.Component.extend({
  searchText: '',
  actions:{
    search(){
      var appController = this.get('container').lookup('controller:application');
      var filterText = this.get('searchText');
      appController.transitionToRoute('procedures.filter', {queryParams: {filterText: filterText}});
    }
  },
});
