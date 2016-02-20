import Ember from 'ember';
import Searchered from '../mixins/searchered';

export default Ember.Component.extend(Searchered, {
  actions:{
    search(){
      this.searcher().search();
    }
  },
  // PRIVATE
});
