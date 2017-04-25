require('./bodymovin-for-wordpress-dialog.editor.scss');

import {BodymovinForWP} from '../BodymovinForWP.js';

var passed_arguments = top.tinymce.activeEditor.windowManager.getParams();
var editor = passed_arguments.editor;
var bodymovinForWp = passed_arguments.bodymovinForWp;

var resolve = passed_arguments.resolve;
var reject = passed_arguments.reject;

var width = bodymovinForWp.width;
var units = bodymovinForWp.sizeUnits;

var alignOptionsClasses = BodymovinForWP.CLASSES_ALIGN;

$(document).ready(function(){

  var bodymovinContainer = $('#bmfw-bodymovin-container');

  bodymovinContainer.append(bodymovinForWp.innerTemplate());

  var widthInput = $('input#width');
  var widthUnits = $('select#units');

  widthInput.val(width);
  widthUnits.val(units);
  bodymovinContainer.css('width', width + units);
  setContainerAlignment(bodymovinContainer, bodymovinForWp.alignClass);
  $('.align-params label input[value=' + bodymovinForWp.alignClass + ']')
      .parent().addClass('active');

  $('.size-params').change(function(){
    var widthInputVal = widthInput.val();
    var widthUnitsVal = widthUnits.val();
    bodymovinContainer.css('width', widthInputVal + widthUnitsVal);
    bodymovinContainer.attr('data-bmfw-width', widthInputVal);
    bodymovinContainer.attr('data-bmfw-units', widthUnitsVal);
    bodymovinForWp.width = widthInputVal;
    bodymovinForWp.sizeUnits = widthUnitsVal;
  });

  $('.align-params label').click(function() {
    var alignKey = $(this).children('input[type=radio]').val();
    setContainerAlignment(bodymovinContainer, alignKey);
    bodymovinForWp.alignClass = alignKey;
  });

  $('#submit').click(function(e){
    e.preventDefault();
    bodymovinForWp.sizeRatio = (bodymovinContainer.height() / bodymovinContainer.width()).toFixed(2);
    resolve(bodymovinForWp);
    editor.windowManager.close();
  });
});

function setContainerAlignment(container, alignment){
  for(var alignItem in alignOptionsClasses){
    container.removeClass(alignOptionsClasses[alignItem]);
  }
  container.addClass(alignOptionsClasses[alignment]);
}
