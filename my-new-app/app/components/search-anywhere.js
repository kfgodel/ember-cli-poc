import Ember from 'ember';
import Router from '../router'

export default Ember.Component.extend({
  searchText: '',
  actions:{
    search(){
      var appController = this.get('container').lookup('controller:application');
      var filterText = this.get('searchText');
      appController.transitionToRoute('filter', filterText);
    }
  },
});
