/**
 * Block dependencies
 */
import icon from './icon';
import classnames from 'classnames';
import Inspector from './inspector';
import attributes from './attributes';
import ListingRender from './listing-render';
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;

// Get components from from wp.blocks
const {
	registerBlockType,
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.blocks;

// Get components from wp.components
const { Spinner, withAPIData } = wp.components;

/**
 * Register showcase block
 */

export default registerBlockType(
	'idx-gutenberg/showcase',
	{
		title: __( 'Property Showcase', 'idx-gutenberg' ),
		description: __( 'Display properties in a variety of formats.', 'idx-gutenberg' ),
		category: 'common',
		icon,
		keywords: [
		__( 'showcase', 'idx-gutenberg' ),
		__( 'carousel', 'idx-gutenberg' ),
		__( 'idx', 'idx-gutenberg' ),
		],
		// Enable or disable support for features
		supports: {
			html: false
		},
		attributes,
		edit: props => {
			const {
				attributes: {
					blockID,
					showcaseFormat,
					propertyType,
					savedLinkID,
					maxProperties,
					numberColumns,
					carouselVisibleProps,
					carouselStagePadding,
					carouselMargin,
					carouselAutoplay,
					orderBy,
					order,
					detailsPosition,
					textAlignment,
					hidePrice,
					hideAddress,
					hideBeds,
					hideBedsIcon,
					hideBedsLabel,
					hideBaths,
					hideBathsIcon,
					hideBathsLabel,
					hideSqFt,
					hideSqFtIcon,
					hideSqFtLabel,
					hideAcres,
					hideAcresIcon,
					hideAcresLabel,
					hidePhotoCount,
					hideViewCount
				},
				id,
				attributes,
				isSelected,
				className,
				setAttributes } = props;

			const classes = classnames(
				className,
				showcaseFormat,
				id,
				'align-'+textAlignment,
				{ 'hide-price': hidePrice },
				{ 'hide-address': hideAddress },
				{ 'hide-beds': hideBeds },
				{ 'hide-beds-icon': hideBedsIcon },
				{ 'hide-beds-label': hideBedsLabel },
				{ 'hide-baths': hideBaths },
				{ 'hide-baths-icon': hideBathsIcon },
				{ 'hide-baths-label': hideBathsLabel },
				{ 'hide-sqft': hideSqFt },
				{ 'hide-sqft-icon': hideSqFtIcon },
				{ 'hide-sqft-label': hideSqFtLabel },
				{ 'hide-acres': hideAcres },
				{ 'hide-acres-icon': hideAcresIcon },
				{ 'hide-acres-label': hideAcresLabel },
				{ 'hide-photo-count': hidePhotoCount },
				{ 'hide-view-count': hideViewCount },
			);

			const setBlockID = () => setAttributes( { blockID: id } );

			return [
				<div className={ classes } >
					<ListingRender
						id={ id }
						showcaseFormat={ showcaseFormat }
						propertyType={ propertyType }
						savedLinkID={ savedLinkID }
						maxProperties={ maxProperties }
						numberColumns={ numberColumns }
						orderBy={ orderBy }
						order={ order }
						detailsPosition={ detailsPosition }
						textAlignment={ textAlignment }
					/>
				</div>,
				isSelected && <Inspector { ...{ setAttributes, ...props} } />,
				<BlockControls>
					<AlignmentToolbar
						value={ textAlignment }
						onChange={ textAlignment => setAttributes( { textAlignment } ) }
					/>
				</BlockControls>,
				setBlockID(),
			];
		}, // end edit
		save: function( props ) {
			return null;
		}, // end save
	},
);
