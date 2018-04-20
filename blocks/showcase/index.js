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
		description: __( 'Display a grid of selected properties', 'idx-gutenberg' ),
		category: 'common',
		icon,
		keywords: [
		__( 'showcase', 'idx-gutenberg' ),
		__( 'idx', 'idx-gutenberg' ),
		],
		// Enable or disable support for features
		supports: {
			html: true
		},
		attributes,
		edit: props => {
			const {
				attributes: {
					propertyType,
					savedLinkID,
					maxProperties,
					numberColumns,
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
				attributes,
				isSelected,
				className,
				setAttributes } = props;

			const classes = classnames(
				className,
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
			
			return [
				isSelected && <Inspector { ...{ setAttributes, ...props} } />,
				<BlockControls>
					<AlignmentToolbar
						value={ textAlignment }
						onChange={ textAlignment => setAttributes( { textAlignment } ) }
					/>
				</BlockControls>,
				<div className={ classes } >
					<ListingRender
						propertyType={ propertyType }
						savedLinkID={ savedLinkID }
						maxProperties={ maxProperties }
						numberColumns={ numberColumns }
						detailsPosition={ detailsPosition }
						textAlignment={ textAlignment }
					/>
				</div>
			];
		}, // end edit
		save: function( props ) {
			return null;
		}, // end save
	},
);
