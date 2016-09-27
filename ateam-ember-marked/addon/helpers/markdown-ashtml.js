import Ember from "ember";
/* global marked */

export function markdownAshtml(params/*, hash*/) {
  var originalText = params[0];
  if(!originalText){
    // Catch undefined values
    originalText = "";
  }
  var markedText = marked(originalText);
  var safelyEscapedHtml = Ember.String.htmlSafe(markedText);
  return safelyEscapedHtml;
}

export default Ember.Helper.helper(markdownAshtml);