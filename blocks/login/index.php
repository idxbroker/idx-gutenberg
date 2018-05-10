<?php
/**
 * Register login/signup block with render callback.
 *
 * @return void
 */
function idx_gutenberg_register_login_block() {
	// Hook server side rendering into render callback
	register_block_type( 'idx-gutenberg/login', [
		'render_callback' => 'idx_gutenberg_login_block_render',
	] );
}

// Make sure that Gutenberg is available, then register our block.
if ( function_exists( 'register_block_type' ) ) {
	add_action( 'init', 'idx_gutenberg_register_login_block' );
}

/**
 * Server rendering for Lead Login/ Signup block.
 *
 * @param  $attributes Registered block props.attributes.
 */
function idx_gutenberg_login_block_render( $attributes ) {
	// Set defaults.
	$defaults = array(
		'defaultDisplay' => 'signup',
		'showRecaptcha'  => true,
		'textAlignment'  => 'left',
		'blockAlignment' => 'none',
	);
	// Merge defaults with saved attributes.
	$attributes = array_merge( $defaults, $attributes );

	// Get container classes based on attributes.
	$classes = idx_gutenberg_get_login_block_classes( $attributes );

	// Start the markup and maybe add column classes.
	$markup = '<div class="wp-block-idx-gutenberg-login ' . $classes . '">';

	$markup .= '</div><!-- end .wp-block-idx-gutenberg-login -->';

	return;
}

/**
 * Return container classes based on atrributes.
 *
 * @param  array   $attributes The saved attributes.
 * @return string              String of classes.
 */
function idx_gutenberg_get_login_block_classes( $attributes ) {
	// Default display.
	$classes[] = ( 'signup' === $attributes['defaultDisplay'] ) ? 'show-signup' : 'show-login';

	// Recaptcha show/hide.
	$classes[] = ( true === $attributes['showRecaptcha'] ) ? 'show-recaptcha' : '';

	// Text align.
	$classes[] = ( 'undefined' !== $attributes['textAlignment'] ) ? 'align-' . $attributes['textAlignment'] : 'align-left';

	return implode( ' ', $classes );
}
