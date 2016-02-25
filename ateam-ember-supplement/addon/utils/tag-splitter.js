export default function TagSplitter() {

  this.split = function(commaDelimitedString){
    if(!commaDelimitedString){
      return [];
    }
    var tagArray = commaDelimitedString.split(/,/);
    for (var i = 0; i < tagArray.length; i++) {
      var tagWithSpaces = tagArray[i];
      var tagWithoutSpaces = tagWithSpaces.trim();
      tagArray[i] = tagWithoutSpaces;
    }
    return tagArray;
  };
}
