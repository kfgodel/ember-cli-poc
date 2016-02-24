import Ember from 'ember';

export default Ember.Object.extend({
  tagList: Ember.computed('tags', function() {
    var tags = this.get('tags');
    if(!tags){
      return [];
    }
    var tagArray = tags.split(/, /);
    return tagArray;
  })
});