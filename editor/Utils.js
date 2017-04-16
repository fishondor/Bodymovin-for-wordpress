
const PATTERN_NUMBER_UNITS = /(\d*\.?\d*)(.*)/;
const PATTERN_FILE_NAME_IN_URL = /^.*[\\\/]/;

export const Utils = {

  splitWidthToNumberAndUnit : function(param){
    var splited = param.match(PATTERN_NUMBER_UNITS);
    var num = splited[1];
    var units = splited[2];
    return {
      number : num,
      units : units
    }
  },

  extractFileNameFromUrl : function(url){
    return url.replace(PATTERN_FILE_NAME_IN_URL, '');
  }

}
