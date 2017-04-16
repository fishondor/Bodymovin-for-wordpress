<?php
/*
Plugin Name: Bodymovin for wordpress
Description: Enables bodymovin for svg animations in wordpress
Version:     1.0.0
Author:      Ariel Fisher
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/
add_action( 'admin_init', 'bodymovin_for_wordpress' );
add_action( 'media_buttons', 'bodymovin_for_wordpress_media_button', 15 );

add_action( 'wp_enqueue_scripts', 'bodymovin_for_wordpress_script' );

add_filter( 'upload_mimes', 'bodymovin_for_wordpress_myme_types', 1, 1 );

function bodymovin_for_wordpress() {
     if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
          add_filter( 'mce_external_plugins', 'add_bodymovin_for_wordpress_tinymce_plugin' );
     }
}

function add_bodymovin_for_wordpress_tinymce_plugin( $plugin_array ) {
     $plugin_array['bodymovin_for_wp_button_script'] = plugins_url( 'bodymovin-for-wordpress-editor-bundle.js', __FILE__ ) ;
     return $plugin_array;
}

function bodymovin_for_wordpress_media_button() {
    echo '<a href="#" id="bodymovin-for-wp-media" class="button">Bodymovin animation</a>';
}

function bodymovin_for_wordpress_myme_types($mime_types){
    $mime_types['json'] = 'application/json';
    return $mime_types;
}

function bodymovin_for_wordpress_script(){
    wp_enqueue_script('bodymovin_for_wordpress_script', plugins_url( 'bodymovin-for-wordpress-front-bundle.js', __FILE__ ));
}


?>
