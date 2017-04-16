require('style-loader!css-loader!postcss-loader!sass-loader!./bodymovin-for-wordpress-dialog.editor.scss');

import {BodymovinForWP} from '../BodymovinForWP.js';

var passed_arguments = top.tinymce.activeEditor.windowManager.getParams();
var $ = passed_arguments.jquery;
var jq_context = document.getElementsByTagName("body")[0];
var wp = passed_arguments.wp;
var editor = passed_arguments.editor;
var bodymovinForWp = passed_arguments.bodymovinForWp;

var resolve = passed_arguments.resolve;
var reject = passed_arguments.reject;

var width = bodymovinForWp.width;
var units = bodymovinForWp.sizeUnits;

var alignOptionsClasses = BodymovinForWP.CLASSES_ALIGN;

$(document, jq_context).ready(function(){

  var bodymovinContainer = $('#bmfw-bodymovin-container', jq_context);

  bodymovinContainer.append(bodymovinForWp.innerTemplate());

  var widthInput = $('input#width', jq_context);
  var widthUnits = $('select#units', jq_context);

  widthInput.val(width);
  widthUnits.val(units);

  bodymovinContainer.css('width', width + units);
  setContainerAlignment(bodymovinContainer, bodymovinForWp.alignClass);

  $('.size-params', jq_context).change(function(){
    var widthInputVal = widthInput.val();
    var widthUnitsVal = widthUnits.val();
    bodymovinContainer.css('width', widthInputVal + widthUnitsVal);
    bodymovinContainer.attr('data-bmfw-width', widthInputVal);
    bodymovinContainer.attr('data-bmfw-units', widthUnitsVal);
    bodymovinForWp.width = widthInputVal;
    bodymovinForWp.sizeUnits = widthUnitsVal;
  });
  
  $('.align-params label input[value=' + bodymovinForWp.alignClass + ']', jq_context)
      .parent().addClass('active');

  $('.align-params label', jq_context).click(function() {
    var alignKey = $(this).children('input[type=radio]').val();
    setContainerAlignment(bodymovinContainer, alignKey);
    bodymovinForWp.alignClass = alignKey;
  });

  $('#submit', jq_context).click(function(e){
    e.preventDefault();
    bodymovinForWp.sizeRatio = (bodymovinContainer.height() / bodymovinContainer.width()).toFixed(2);
    resolve(bodymovinForWp);
  });
});

function setContainerAlignment(container, alignment){
  for(var alignItem in alignOptionsClasses){
    container.removeClass(alignOptionsClasses[alignItem]);
  }
  container.addClass(alignOptionsClasses[alignment]);
}
