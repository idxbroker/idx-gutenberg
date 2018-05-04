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
		'showcaseFormat' => 'showcase',
		'propertyType' => 'featured',
		'savedLinkID' => null,
		'maxProperties' => 12,
		'numberColumns' => 3,
		'carouselVisibleProps' => 1,
		'carouselStagePadding' => 0,
		'carouselMargin' => 0,
		'carouselAutoplay' => true,
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
	// Merge defaults with saved attributes.
	$attributes = array_merge( $defaults, $attributes );

	// Generate unique block ID for carousel to target.
	$block_id = 'idx-showcase--' . md5( implode( ',', $attributes ) );

	// Enqueue OWL carousel scripts if showcaseFormat is carousel and add inline script.
	if ( 'carousel' === $attributes['showcaseFormat'] ) {
		$prev_link = '<i class=\"fa fa-chevron-circle-left\"></i><span>Prev</span>';
		$next_link = '<span>Next</span><i class=\"fa fa-chevron-circle-right\"></i>';
		wp_enqueue_script( 'owl2' );
		wp_enqueue_style( 'owl2-css' );
		$inline_script = '
			 jQuery(document).ready(function( $ ){
	            $("#' . $block_id . '").owlCarousel({
	                items: ' . $attributes['carouselVisibleProps'] . ',
	                autoplay: ' . $attributes['carouselAutoplay'] . ',
	                nav: true,
	                navText: ["' . $prev_link . '", "' . $next_link . '"],
	                loop: true,
	                lazyLoad: true,
	                addClassActive: true,
	                itemsScaleUp: true,
	                addClassActive: true,
	                itemsScaleUp: true,
	                navContainerClass: "owl-controls owl-nav",
	                responsiveClass:true,
	                responsive:{
	                    0:{
	                        items: 1,
	                        nav: true,
	                        margin: 0 
	                    },
	                    450:{
	                        items: ' . round( $attributes['carouselVisibleProps'] / 2 ) . '
	                    },
	                    800:{
	                        items: ' . $attributes['carouselVisibleProps'] . '
	                    }
	                }
	            });
	        });
		';
		wp_add_inline_script( 'owl2', $inline_script, 'after' );
	}

	// Get properties based on selected propertyType.
	$idx_api = new \IDX\Idx_Api();
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

	// Start the markup and maybe add column classes.
	$markup = '<div id="' . $block_id . '" class="wp-block-idx-gutenberg-showcase ' . $classes . '">';
	if ( 'showcase' === $attributes['showcaseFormat'] ) {
		$markup .= '<div class="columns-' . $attributes['numberColumns'] . '">';
	}

	// Loop through properties, apply html template, add to block markup.
	if ( empty( $properties ) || ! is_array( $properties ) ) {
		$markup .= sprintf( '<p>%s</p>', __( 'No properties found', 'idx-gutenberg' ) );
	} else {
		foreach ( $properties as $property ) {
			$markup .= idx_gutenberg_get_showcase_property_markup( $attributes['showcaseFormat'], $property );
		}
	}

	// Markup close.
	if ( 'showcase' === $attributes['showcaseFormat'] ) {
		$markup .= '</div><!-- end .columns-' . $attributes['numberColumns'] . ' -->';
	}

	$markup .= '</div><!-- end .wp-block-idx-gutenberg-showcase -->';

	return apply_filters( 'idx_gutenberg_showcase_block_markup', $markup, $attributes, $properties );
}

/**
 * Temporary function to return a property with HTML markup based on showcase format.
 */
function idx_gutenberg_get_showcase_property_markup( $format, $property ) {
	$idx_api = new \IDX\Idx_Api();
	// Get details URL base, since some properties fon't have fullDetailsURL.
	$details_url = $idx_api->details_url();

	// Get gallery URL.
	$gallery_url = $idx_api->photo_gallery_url();

	// Get no photo URL.
	$no_photo_url = apply_filters( 'idx_gutenberg_default_no_photo', 'https://mlsphotos.idxbroker.com/defaultNoPhoto/noPhotoFull.png' );

	switch ( $format ) {
		case 'showcase':
			$markup = sprintf( idx_gutenberg_get_showcase_block_template( $format ),
				( isset( $property['fullDetailsURL'] ) ) ? $property['fullDetailsURL'] : $details_url . '/' . $property['detailsURL'],
				$property['address'],
				( isset( $property['image']['0']['url'] ) ) ? $property['image']['0']['url'] : $no_photo_url,
				( isset( $property['image'][0]['caption'] ) ) ? $property['image'][0]['caption'] : $property['address'],
				$property['viewCount'],
				$property['listingPrice'],
				$property['price'],
				$property['address'],
				$property['cityName'],
				$property['state'],
				$property['zipcode'],
				$property['bedrooms'],
				$property['totalBaths'],
				( isset( $property['sqFt'] ) ) ? $property['sqFt'] : '',
				( isset( $property['acres'] ) ) ? $property['acres'] : '',
				$gallery_url . '/' . $property['detailsURL'],
				$property['mlsPhotoCount'],
				idx_gutenberg_maybe_add_disclaimer_and_courtesy( $property )
			);
			break;

		case 'carousel':
			$markup = sprintf( idx_gutenberg_get_showcase_block_template( $format ),
				( isset( $property['fullDetailsURL'] ) ) ? $property['fullDetailsURL'] : $details_url . '/' . $property['detailsURL'],
				( isset( $property['image']['0']['url'] ) ) ? $property['image']['0']['url'] : $no_photo_url,
				$property['address'],
				( isset( $property['image']['0']['url'] ) ) ? $property['image']['0']['url'] : $no_photo_url,
				( isset( $property['image'][0]['caption'] ) ) ? $property['image'][0]['caption'] : $property['address'],
				$property['viewCount'],
				$property['listingPrice'],
				$property['price'],
				$property['address'],
				$property['cityName'],
				$property['state'],
				$property['zipcode'],
				$property['bedrooms'],
				$property['totalBaths'],
				( isset( $property['sqFt'] ) ) ? $property['sqFt'] : '',
				( isset( $property['acres'] ) ) ? $property['acres'] : '',
				$gallery_url . '/' . $property['detailsURL'],
				$property['mlsPhotoCount'],
				idx_gutenberg_maybe_add_disclaimer_and_courtesy( $property )
			);
			break;

		case 'list':
			$markup = '';
			break;

		default:
			$markup = null;
			break;
	}

	return apply_filters( 'idx_gutenberg_showcase_property_markup', $markup, $format, $property );
}

/**
 * Temporary function to return a block template.
 */
function idx_gutenberg_get_showcase_block_template( $format ) {
	switch ( $format ) {
		case 'showcase':
			$template = '
			<div class="property" itemtype="http://schema.org/Product" itemscope>
				<a href="%s">
					<meta itemprop="name" content="%s">
					<img class="image" src="%s" alt="%s" itemprop="image" />
					<span class="view-count"><span class="screen-reader-text">Views: </span><i class="fa fa-eye"></i> %s</span>
					<div class="details" itemtype="http://schema.org/SingleFamilyResidence" itemscope>
						<div itemtype="http://schema.org/Offer" itemscope itemprop="offers"><span class="price">%s</span><meta itemprop="price" content="%s"><meta itemprop="priceCurrency" content="USD"></div>
						<p class="address" itemscope="" itemtype="http://schema.org/PostalAddress"><span class="address" itemprop="streetAddress">%s</span>
						<span class="city" itemprop="addressLocality">%s</span>, <span class="state" itemprop="addressRegion">%s</span> <span class="zipcode" itemprop="postalCode">%s</span></p>
						<ul>
							<li class="beds"><span class="label">Beds: </span>%s<i class="fa fa-bed"></i></li>
							<li class="baths"><span class="label">Baths: </span>%s<i class="fa fa-bath"></i></li>
							<li class="sqft"><span class="label">SqFt: </span>%s<i class="fa fa-superscript"></i></li>
							<li class="acres"><span class="label">Acres: </span>%s<i class="fa fa-arrows"></i></li>
						</ul>
					</div>
				</a>
				<a class="gallery" href=%s><span class="label screen-reader-text">Photo count: </span><i class="fa fa-file-image-o"></i>%s</a>
			</div>
			%s
			';
			break;

		case 'carousel':
			$template = '
			<div class="property" itemtype="http://schema.org/Product" itemscope>
				<a href="%s">
					<div class="image owl-lazy" data-src="%s"></div>
					<meta itemprop="name" content="%s">
					<img src="%s" alt="%s" itemprop="image" />
					<span class="view-count"><span class="screen-reader-text">Views: </span><i class="fa fa-eye"></i> %s</span>
					<div class="details" itemtype="http://schema.org/SingleFamilyResidence" itemscope>
						<div itemtype="http://schema.org/Offer" itemscope itemprop="offers"><span class="price">%s</span><meta itemprop="price" content="%s"><meta itemprop="priceCurrency" content="USD"></div>
						<p class="address" itemscope="" itemtype="http://schema.org/PostalAddress"><span class="address" itemprop="streetAddress">%s</span>
						<span class="city" itemprop="addressLocality">%s</span>, <span class="state" itemprop="addressRegion">%s</span> <span class="zipcode" itemprop="postalCode">%s</span></p>
						<ul>
							<li class="beds"><span class="label">Beds: </span>%s<i class="fa fa-bed"></i></li>
							<li class="baths"><span class="label">Baths: </span>%s<i class="fa fa-bath"></i></li>
							<li class="sqft"><span class="label">SqFt: </span>%s<i class="fa fa-superscript"></i></li>
							<li class="acres"><span class="label">Acres: </span>%s<i class="fa fa-arrows"></i></li>
						</ul>
					</div>
				</a>
				<a class="gallery" href=%s><span class="label screen-reader-text">Photo count: </span><i class="fa fa-file-image-o"></i>%s</a>
				%s
			</div>
			';
			break;

		case 'list':
			$template = '
				<li class="property" itemtype="http://schema.org/Product" itemscope>
					<a href="%s">
						<meta itemprop="name" content="%s">
						<div class="details" itemtype="http://schema.org/SingleFamilyResidence" itemscope>
							<div itemtype="http://schema.org/Offer" itemscope itemprop="offers"><span class="price">%s</span><meta itemprop="price" content="%s"><meta itemprop="priceCurrency" content="USD"></div>
							<p class="address" itemscope="" itemtype="http://schema.org/PostalAddress"><span class="address" itemprop="streetAddress">%s</span>
							<span class="city" itemprop="addressLocality">%s</span>, <span class="state" itemprop="addressRegion">%s</span> <span class="zipcode" itemprop="postalCode">%s</span></p>
						</div>
					</a>
				</li>
			';
			break;

		default:
			$template = '<p>No template</p>';
			break;
	}

	return apply_filters( 'idx_gutenberg_showcase_block_template', $template, $format );
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
	// Showcase Format
	$classes[] = ( 'carousel' === $attributes['showcaseFormat'] ) ? 'owl-carousel owl-theme carousel' : 'showcase';

	// Text align.
	$classes[] = ( 'undefined' !== $attributes['textAlignment'] ) ? 'align-' . $attributes['textAlignment'] : 'align-left';

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
