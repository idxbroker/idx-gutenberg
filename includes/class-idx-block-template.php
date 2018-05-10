<?php
/**
 * Methods for building and returning block templates.
 */
class Idx_Block_Template {

	private static $instance;

	/**
	 * Instantiate the class.
	 * @return The instance.
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Idx_Block_Template ) ) {
			self::$instance = new Idx_Block_Template();
		}
		return self::$instance;
	}

	/**
	 * Initialize the class
	 */
	public function __construct() {
	}

}

/**
 * Return the instance
 *
 * @since 1.0.0
 * @return object The Idx_Block_Template instance.
 */
function Idx_Block_Template_Run() {
	return Idx_Block_Template::instance();
}
Idx_Block_Template_Run();
