import Ember from 'ember';
/* global moment */

export function markdownAshtml(params/*, hash*/) {
  var value = params[0];
  if(!value){
    // Catch undefined values
    value = "";
  }
  return new Ember.Handlebars.SafeString(marked(value));
}

export default Ember.Helper.helper(markdownAshtml);
