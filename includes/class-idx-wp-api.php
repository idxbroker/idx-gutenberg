<?php
/**
 * Class to add WP API endpoint to proxy through existing Idx_Api methods
 */

class Idx_Wp_Api {

	private static $instance;
	const IDX_WP_API_DEFAULT_VERSION = '1.5.0';

	/**
	 * Instantiate the class.
	 * @return The instance.
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Idx_Wp_Api ) ) {
			self::$instance = new Idx_Wp_Api();
		}
		return self::$instance;
	}

	/**
	 * Initialize the class
	 */
	public function __construct() {
		// Instantiate Idx_Api class.
		$this->idx = new \IDX\Idx_Api();
		// Register route.
		add_action( 'rest_api_init', array( $this, 'idx_register_api_routes' ) );
	}

	/**
	 * Register the API routes.
	 *
	 * @return void
	 */
	public function idx_register_api_routes() {
		register_rest_route(
			'idx/v1',
			'/api',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'idx_api_data_return' ),
				'permission_callback' => array( $this, 'idx_api_data_permissions_check' ),
				'args'                => array(),
			)
		);

		register_rest_route(
			'idx/v1',
			'/properties',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'idx_api_property_data_return' ),
				'permission_callback' => array( $this, 'idx_api_data_permissions_check' ),
				'args'                => array(),
			)
		);
	}

	/**
	 * Permissions check.
	 *
	 * @return true|object  True or WP_Error object on failure.
	 */
	public function idx_api_data_permissions_check() {
		// Restrict endpoint to only users who have the edit_posts capability.
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error( 'rest_forbidden', esc_html__( 'Not authorized.', 'idx-gutenberg' ),
				array(
					'status' => 401,
				)
			);
		}

		// This is a black-listing approach. You could alternatively do this via white-listing, by returning false here and changing the permissions check.
		return true;
	}

	/**
	 * Returns IDX API data given a method and level.
	 *
	 * @param  object $request The GET request.
	 * @return class           Prepared WP_REST_Response class.
	 */
	public function idx_api_data_return( $request ) {
		// Ensure we're using an instance of the WP_REST_Response class.
		$response = rest_ensure_response( $request );

		// Get our params to pass to Idx_Api::idx_api()
		$method           = $request->get_param( 'method' );
		$apiversion       = IDX_WP_API_DEFAULT_VERSION;
		$level            = $request->get_param( 'level' );
		$params           = array(); // We don't accept params since we're only doing GET.
		$expiration       = 7200; // We'll use the default.
		$request_type     = 'GET'; // Always GET.
		$json_decode_type = true;

		// Send diagnostic headers for all calls.
		$response->header( 'X-IDX-WPAPI-Ver', '1.0.0' );

		// Get the body from Idx_Api::idx_api()
		$body = $this->idx->idx_api( $method, $apiversion, $level, $params, $expiration, $request_type, $json_decode_type );

		// Set the response body.
		$response->set_data( $body );

		// Return the response.
		return $response;
	}

	/**
	 * Returns property data given a property type and optional saved link ID.
	 *
	 * @param  object $request The GET request.
	 * @return class           Prepared WP_REST_Response class.
	 */
	public function idx_api_property_data_return( $request ) {
		// Ensure we're using an instance of the WP_REST_Response class.
		$response = rest_ensure_response( $request );

		// Get our params to pass to Idx_Api::idx_api()
		$type = $request->get_param( 'type' );

		// Send diagnostic headers for all calls.
		$response->header( 'X-IDX-WP-API-Ver', '1.0.0' );

		// Get property data from corresponding Idx_Api method.
		if ( 'savedlink' === $type ) {
			$id = $request->get_param( 'id' );
			if ( empty( $id ) || ! is_numeric( $id ) ) {
				return new WP_Error( 'rest_invalid', esc_html__( 'Invalid request. Must supply ID.', 'idx-gutenberg' ),
					array(
						'status' => 400,
					)
				);
			}
			// Get the properties.
			$properties = $this->idx->saved_link_properties( (int) $id );
			// Set a header for property count.
			$response->header( 'X-IDX-Property-Count', count( $properties ) );
			$body = $properties;
		} elseif ( in_array( $type, array( 'featured', 'soldpending', 'supplemental' ), true ) ) {
			// Get the properties.
			$properties = (array) $this->idx->client_properties( $type );
			$body = array();
			// Build a new array to match the returned format of saved link properties.
			foreach ( $properties as $property ) {
				$body[] = $property;
			}
			// Set a header for property count.
			$response->header( 'X-IDX-Property-Count', count( $properties ) );
		} else {
			return new WP_Error( 'rest_not_allowed', esc_html__( 'Method not allowed.', 'idx-gutenberg' ),
				array(
					'status' => 405,
				)
			);
		}

		// Set the response body.
		$response->set_data( $body );

		// Return the response.
		return $response;
	}
}

/**
 * Return the instance
 *
 * @since 1.0.0
 * @return object The Idx_Wp_Api instance.
 */
function Idx_Wp_Api_Run() {
	return Idx_Wp_Api::instance();
}
Idx_Wp_Api_Run();
