<?php
/**
 * Register showcase block with render callback.
 *
 * @return void
 */
function idx_gutenberg_register_blocks() {
	// Hook server side rendering into render callback
	register_block_type( 'idx-gutenberg/showcase', [
		'render_callback' => 'idx_gutenberg_showcase_block_render',
	] );
}

// Make sure that Gutenberg is available, then register our block.
if ( function_exists( 'register_block_type' ) ) {
	add_action( 'init', 'idx_gutenberg_register_blocks' );
}

/**
 * Server rendering for Property Showcase block.
 *
 * @param  $attributes Registered block props.attributes.
 */
function idx_gutenberg_showcase_block_render( $attributes ) {
	// Set defaults.
	$defaults = array(
		'propertyType' => 'featured',
		'savedLinkID' => null,
		'maxProperties' => 12,
		'numberColumns' => 3,
		'detailsPosition' => 'below',
		'textAlignment' => 'left',
		'hidePrice' => false,
		'hideAddress' => false,
		'hideBeds' => false,
		'hideBedsIcon' => false,
		'hideBedsLabel' => true,
		'hideBaths' => false,
		'hideBathsIcon' => false,
		'hideBathsLabel' => true,
		'hideSqFt' => false,
		'hideSqFtIcon' => false,
		'hideSqFtLabel' => true,
		'hideAcres' => false,
		'hideAcresIcon' => false,
		'hideAcresLabel' => true,
		'hidePhotoCount' => false,
		'hideViewCount' => true,
	);

	$attributes = array_merge( $defaults, $attributes );

	$idx_api = new \IDX\Idx_Api();
	//var_dump($attributes);
	if ( 'savedlink' === $attributes['propertyType'] ) {
		$id = $attributes['savedLinkID'];
		if ( empty( $attributes['savedLinkID'] ) || ! is_numeric( $attributes['savedLinkID'] ) ) {
			$properties = null;
		}
		// Get the properties.
		$properties = $idx_api->saved_link_properties( (int) $attributes['savedLinkID'] );
	} elseif ( in_array( $attributes['propertyType'], array( 'featured', 'soldpending', 'supplemental' ), true ) ) {
		// Get the properties.
		$properties = $idx_api->client_properties( $attributes['propertyType'] );
	} else {
		$properties = null;
	}

	// Only return the number of properties set.
	$properties = array_slice( $properties, 0, $attributes['maxProperties'] );

	// Get container classes based on attributes.
	$classes = idx_gutenberg_get_showcase_block_classes( $attributes );

	// Start the markup.
	$markup = '<div class="wp-block-idx-gutenberg-showcase ' . $classes . '"><div class="columns-' . $attributes['numberColumns'] . '">';

	// Loop through properties, apply html template, add to block markup.
	if ( empty( $properties ) || ! is_array( $properties ) ) {
		$markup .= sprintf( '<p>%s</p>', __( 'No properties found', 'idx-gutenberg' ) );
	} else {
		foreach ( $properties as $property ) {
			$markup .= sprintf( idx_gutenberg_get_block_template( 'showcase' ),
				$property['fullDetailsURL'],
				( isset( $property['image']['0']['url'] ) ) ? $property['image']['0']['url'] : 'https://mlsphotos.idxbroker.com/defaultNoPhoto/noPhotoFull.png',
				( isset( $property['image'][0]['caption'] ) ) ? $property['image'][0]['caption'] : $property['address'],
				$property['viewCount'],
				$property['listingPrice'],
				$property['address'],
				$property['bedrooms'],
				$property['totalBaths'],
				( isset( $property['sqFt'] ) ) ? $property['sqFt'] : '',
				( isset( $property['acres'] ) ) ? $property['acres'] : '',
				$property['fullDetailsURL'],
				$property['mlsPhotoCount'],
				idx_gutenberg_maybe_add_disclaimer_and_courtesy( $property )
			);
		}
	}

	// Markup close.
	$markup .= '</div><!-- end .columns-' . $attributes['numberColumns'] . ' --> </div><!-- end .wp-block-idx-gutenberg-showcase -->';

	return apply_filters( 'idx_gutenberg_showcase_block_markup', $markup, $attributes, $properties );
}

/**
 * Temporary function to return a block template.
 */
function idx_gutenberg_get_block_template( $name ) {
	switch ( $name ) {
		case 'showcase':
			$template = '
			<div class="property">
					<div class="image">
						<a href="%s">
							<img class="image" src="%s" alt="%s" />
							<span class="view-count"><span class="screen-reader-text">Views: </span><i class="fa fa-eye"></i> %s</span>
						</a>
						<div class="details">
							<p class="price">%s</p>
							<p class="address">%s</p>
							<ul>
								<li class="beds"><span class="label">Beds: </span>%s<i class="fa fa-bed"></i></li>
								<li class="baths"><span class="label">Baths: </span>%s<i class="fa fa-bath"></i></li>
								<li class="sqft"><span class="label">SqFt: </span>%s<i class="fa fa-superscript"></i></li>
								<li class="acres"><span class="label">Acres: </span>%s<i class="fa fa-arrows"></i></li>
							</ul>
						</div>
						<a class="gallery" href=%s><span class="label screen-reader-text">Photo count: </span><i class="fa fa-file-image-o"></i>%s</a>
					</div>	
				</div>
			';
			break;

		default:
			$template = '<p>No template</p>';
			break;
	}

	return $template;
}

/**
 * Output disclaimer and courtesy if applicable
 *
 * @param  array $property The current property in the loop
 * @return string       HTML of disclaimer, logo, and courtesy
 */
function idx_gutenberg_maybe_add_disclaimer_and_courtesy( $property ) {
	//Add Disclaimer when applicable.
	if ( isset( $property['disclaimer'] ) && ! empty( $property['disclaimer'] ) ) {
		foreach ( $property['disclaimer'] as $disclaimer ) {
			if ( in_array( 'widget', $disclaimer, true ) ) {
				$disclaimer_text = $disclaimer['text'];
				$disclaimer_logo = $disclaimer['logoURL'];
			}
		}
	}
	//Add Courtesy when applicable.
	if ( isset( $property['courtesy'] ) && ! empty( $property['courtesy'] ) ) {
		foreach ( $property['courtesy'] as $courtesy ) {
			if ( in_array( 'widget', $courtesy, true ) ) {
				$courtesy_text = $courtesy['text'];
			}
		}
	}

	$output = '';

	if ( isset( $disclaimer_text ) ) {
		$output .= '<p style="display: block !important; visibility: visible !important; opacity: 1 !important; position: static !important;">' . $disclaimer_text . '</p>';
	}
	if ( isset( $disclaimer_logo ) ) {
		$output .= '<img class="logo" src="' . $disclaimer_logo . '" style="opacity: 1 !important; position: static !important;" />';
	}
	if ( isset( $courtesy_text ) ) {
		$output .= '<p class="courtesy" style="display: block !important; visibility: visible !important;">' . $courtesy_text . '</p>';
	}

	if ( '' === $output ) {
		return;
	} else {
		return '<div class="disclaimer">' . $output . '</div>';
	}
}

/**
 * Return container classes based on atrributes.
 *
 * @param  array   $attributes The saved attributes.
 * @return string              String of classes.
 */
function idx_gutenberg_get_showcase_block_classes( $attributes ) {
	// Text align.
	$classes[] = 'align-' . $attributes['textAlignment'];

	// Hide property details.
	if ( $attributes['hidePrice'] ) {
		$classes[] = 'hide-price';
	}
	if ( $attributes['hideAddress'] ) {
		$classes[] = 'hide-address';
	}
	if ( $attributes['hideBeds'] ) {
		$classes[] = 'hide-beds';
	}
	if ( $attributes['hideBedsIcon'] ) {
		$classes[] = 'hide-beds-icon';
	}
	if ( $attributes['hideBedsLabel'] ) {
		$classes[] = 'hide-beds-label';
	}
	if ( $attributes['hideBaths'] ) {
		$classes[] = 'hide-baths';
	}
	if ( $attributes['hideBathsIcon'] ) {
		$classes[] = 'hide-baths-icon';
	}
	if ( $attributes['hideBathsLabel'] ) {
		$classes[] = 'hide-baths-label';
	}
	if ( $attributes['hideSqFt'] ) {
		$classes[] = 'hide-sqft';
	}
	if ( $attributes['hideSqFtIcon'] ) {
		$classes[] = 'hide-sqft-icon';
	}
	if ( $attributes['hideSqFtLabel'] ) {
		$classes[] = 'hide-sqft-label';
	}
	if ( $attributes['hideAcres'] ) {
		$classes[] = 'hide-acres';
	}
	if ( $attributes['hideAcresIcon'] ) {
		$classes[] = 'hide-acres-icon';
	}
	if ( $attributes['hideAcresLabel'] ) {
		$classes[] = 'hide-acres-label';
	}
	if ( $attributes['hidePhotoCount'] ) {
		$classes[] = 'hide-photo-count';
	}
	if ( $attributes['hideViewCount'] ) {
		$classes[] = 'hide-view-count';
	}

	return implode( ' ', $classes );
}
