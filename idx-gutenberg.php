<?php
/**
 * Plugin Name: IDX - Gutenberg
 * Plugin URI: https://idxbroker.com
 * Description: A plugin to add Gutenberg compatibility to the IMPress for IDX plugin by introducing blocks as replacements for shortcodes.
 * Text Domain: idx-gutenberg
 * Domain Path: /languages
 * Author: davebonds, agentevolution
 * Author URI: https://agentevolution.com/
 * Version: 0.9.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package IDX
 */

//  Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
const IDXGB_API_DEFAULT_VERSION = '1.5.0';

// Deactivate if IMPress plugin not active.
register_activation_hook( __FILE__, 'idx_core_dependency' );
function idx_core_dependency() {
	if ( ! defined( 'IDX_WP_PLUGIN_VERSION' ) || ! class_exists( 'Idx_Api' ) ) {
		deactivate_plugins( __FILE__ );
	}
}

/**
 * Enqueue block editor only JavaScript and CSS
 */
function idx_gutenberg_editor_scripts() {

	// Make paths variables so we don't write em twice ;)
	$block_path = '/assets/js/editor.blocks.js';
	$editor_style_path = '/assets/css/blocks.editor.css';

	// Enqueue the bundled block JS file
	wp_enqueue_script(
		'idx-gutenberg-blocks-js',
		plugins_url( $block_path, __FILE__ ),
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

	// Localize our saved links for selection in the editor.
	$idx_api = new \IDX\Idx_Api();
	$saved_links = $idx_api->idx_api_get_savedlinks();
	wp_localize_script( 'idx-gutenberg-blocks-js', 'idxGbSavedLinks', $saved_links );
	// And Agents.
	$agents = $idx_api->idx_api( 'agents', IDXGB_API_DEFAULT_VERSION, 'clients', array(), 7200, 'GET', true );
	wp_localize_script( 'idx-gutenberg-blocks-js', 'idxGbAgents', $agents['agent'] );
	// And details URL base.
	$details_url = $idx_api->details_url();
	wp_localize_script( 'idx-gutenberg-blocks-js', 'idxGbDetailsUrl', $details_url );
	// And gallery URL
	$gallery_url = $idx_api->subdomain_url() . 'photogallery/';
	wp_localize_script( 'idx-gutenberg-blocks-js', 'idxGbGalleryUrl', $gallery_url );

	// Enqueue optional editor only styles
	wp_enqueue_style(
		'idx-gutenberg-blocks-editor-css',
		plugins_url( $editor_style_path, __FILE__ ),
		[ 'wp-blocks' ],
		filemtime( plugin_dir_path( __FILE__ ) . $editor_style_path )
	);

}

// Hook scripts function into block editor hook
add_action( 'enqueue_block_editor_assets', 'idx_gutenberg_editor_scripts' );


/**
 * Enqueue front end and editor JavaScript and CSS.
 */
function idx_gutenberg_scripts() {
	// Make paths variables so we don't write em twice ;)
	$block_path = '/assets/js/frontend.blocks.js';
	$style_path = '/assets/css/blocks.style.css';

	// Enqueue the bundled block JS file.
	wp_enqueue_script(
		'idx-gutenberg-blocks-frontend-js',
		plugins_url( $block_path, __FILE__ ),
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api', 'jquery' ],
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);

	// Localize Subdomain URL
	$idx_api = new \IDX\Idx_Api();
	$gallery_url = $idx_api->subdomain_url();
	wp_localize_script( 'idx-gutenberg-blocks-frontend-js', 'idxGbSubdomainUrl', $gallery_url );

	// Enqueue frontend and editor block styles.
	wp_enqueue_style(
		'idx-gutenberg-blocks-css',
		plugins_url( $style_path, __FILE__ ),
		[ 'wp-blocks' ],
		filemtime( plugin_dir_path( __FILE__ ) . $style_path )
	);

	// Enqueue FontAwesome for icons.
	wp_enqueue_style( 'font-awesome-4.7.0' );

	// Register Carousel scripts
	wp_register_script( 'owl2', plugins_url( '/assets/js/owl2.carousel.min.js', __FILE__ ), array( 'jquery' ), false, false );
	wp_register_style( 'owl2-css', plugins_url( '/assets/css/owl2.carousel.css', __FILE__ ) );
}

// Hook scripts function into block editor hook.
add_action( 'enqueue_block_assets', 'idx_gutenberg_scripts' );

// Include IDX WP API class to register routes.
require_once( plugin_dir_path( __FILE__ ) . '/includes/class-idx-wp-api.php' );

// Dynamic Block Front End Rendering.
include( plugin_dir_path( __FILE__ ) . 'blocks/showcase/index.php' );
