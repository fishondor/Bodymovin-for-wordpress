import {Utils} from './utils.js';

const CLASS_BODYMOVIN = "bodymovin",
      CLASS_BODYMOVIN_CONTAINER = "bmfw-bodymovin-container";
const CLASSES_ALIGN = {left : "bmfw-align-left",
                                right : "bmfw-align-right",
                                center : "bmfw-align-center",
                                none : "bmfw-align-none"};

export class BodymovinForWP{

  constructor(name, path){
    this._fileName = name;
    this._animationPath = path;
    this._width = 100;
    this._sizeUnits = "%";
    this._alignClass = CLASSES_ALIGN.none;
    this._sizeRatio = 1;
  }

  wrapperTemplate(){
    var height = this._width * this._sizeRatio;
    return `<div class="${CLASS_BODYMOVIN_CONTAINER } ${CLASSES_ALIGN[this._alignClass]}"
                          data-bmfw-filename="${this._fileName}"
                          style="width: ${this._width + this._sizeUnits};
                                padding-top: ${height + this._sizeUnits}">${this.innerTemplate()}</div>`;
  }

  innerTemplate(){
    return `<div class="${CLASS_BODYMOVIN}"
                  data-bm-path="${this._animationPath}"
                  data-bm-renderer="svg">&#8203;</div>`;
  }

  static fromHtml(html){
    var currentElement = html[0];
    var filename = currentElement.dataset.bmfwFilename;
    var url = currentElement.getElementsByClassName(CLASS_BODYMOVIN)[0].dataset.bmPath;
    var bodymovinForWordpress = new BodymovinForWP(filename, url);
    bodymovinForWordpress.alignClass = BodymovinForWP.extractAlignmentClass(currentElement);
    var splitedWidth = Utils.splitWidthToNumberAndUnit(currentElement.style.width);
    bodymovinForWordpress.width = splitedWidth.number;
    bodymovinForWordpress.sizeUnits = splitedWidth.units;
    return bodymovinForWordpress;
  }

  static get CLASS_BODYMOVIN_CONTAINER(){
    return CLASS_BODYMOVIN_CONTAINER;
  }

  static get CLASSES_ALIGN(){
    return CLASSES_ALIGN;
  }

  static extractAlignmentClass(html){
    for(var key in CLASSES_ALIGN){
      if(CLASSES_ALIGN[key] != "" ? html.classList.contains(CLASSES_ALIGN[key]) : false){
        return key;
      }
    }
    return "none";
  }

  get fileName(){
    return this._fileName;
  }

  get width(){
    return this._width;
  }

  get sizeUnits(){
    return this._sizeUnits;
  }

  get alignClass(){
    return this._alignClass;
  }

  set width(width){
    this._width = width;
  }

  set sizeRatio(sizeRatio){
    this._sizeRatio = sizeRatio;
  }

  set sizeUnits(units){
    this._sizeUnits = units;
  }

  set alignClass(alignClass){
    this._alignClass = alignClass;
  }

}
