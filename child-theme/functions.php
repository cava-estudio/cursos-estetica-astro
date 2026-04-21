<?php
/**
 * Child theme functions to enqueue styles
 */
add_action( 'wp_enqueue_scripts', 'cursos_child_enqueue_styles' );
function cursos_child_enqueue_styles() {
    // Enqueue parent style
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    // Enqueue child overrides
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'), wp_get_theme()->get('Version') );
}
