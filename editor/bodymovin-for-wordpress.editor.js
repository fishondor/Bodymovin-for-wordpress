var editorStyle = require('to-string-loader!css-loader!sass-loader!postcss-loader!./bodymovin-for-wordpress.editor.scss');

var dialogUrl = require("./dialog/bodymovin-for-wordpress-dialog.editor.html");

import {BodymovinForWP} from './BodymovinForWP.js';

(function() {
  jQuery(function($) {
     tinymce.create('tinymce.plugins.BodymovinForWp', {
          init : function(ed, url) {
            ed.contentStyles.push(editorStyle);
            ed.onClick.add(function(ed, e) {
              var currentElement = $(e.target);
              if(currentElement.hasClass(BodymovinForWP.CLASS_BODYMOVIN_CONTAINER)){
                open_bodymovin_for_wordpress_dialog(BodymovinForWP.fromHtml(currentElement)).then(
                  function(bodymovinElement){
                    currentElement.replaceWith(bodymovinElement.wrapperTemplate() + "&nbsp;");
                    ed.windowManager.close();
                  }
                ).catch(
                  function(error){
                    console.log(error);
                  }
                );
              }
            });
            function open_bodymovin_for_wordpress_dialog(bodymovinForWp){
              return new Promise(function(resolve, reject){
                ed.windowManager.open(
                  {
                    title: 'Edit ' + bodymovinForWp.fileName,
                    file: url + dialogUrl,
                    resizable: 'true',
                    width: 800,
                    height: 600
                  },
                  {
                      editor: ed,
                      jquery: jQuery,
                      wp: wp,
                      bodymovinForWp: bodymovinForWp,
                      resolve: resolve,
                      reject: reject
                  }
                );
              });
            }
            function open_media_window() {
                if (this.window === undefined) {
                    this.window = wp.media({
                            title: 'Add json file',
                            library: {type: 'application/json'},
                            multiple: false,
                            button: {text: 'Insert'}
                        });

                    var self = this;
                    this.window.on('select', function() {
                        var animationPath = self.window.state().get('selection').first().attributes.url;
                        var fileName = self.window.state().get('selection').first().attributes.filename;
                        var bodymovinForWp = new BodymovinForWP(fileName, animationPath);
                        open_bodymovin_for_wordpress_dialog(bodymovinForWp).then(
                          function(bodymovinElement){
                            if(ed.selection)
                              ed.selection.setContent(bodymovinElement.wrapperTemplate() + "&nbsp;");
                            else
                              ed.setContent(bodymovinElement.wrapperTemplate() + "&nbsp;");
                            ed.windowManager.close();
                          }
                        ).catch(
                          function(error){
                            console.log(error);
                          }
                        );
                    });
                }

                this.window.open();
                return false;
            }
            $(document).ready(function(){
                $('#bodymovin-for-wp-media').click(open_media_window);
            });
          },
          createControl : function(n, cm) {
               return null;
          },
     });
     tinymce.PluginManager.add( 'bodymovin_for_wp_button_script', tinymce.plugins.BodymovinForWp );
   });
})();
