/**
 * Block dependencies
 */
import icon from './icon';
import classnames from 'classnames';
import Inspector from './inspector';
import attributes from './attributes';
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

/**
 * Register login/signup block
 */

export default registerBlockType(
	'idx-gutenberg/login',
	{
		title: __( 'Login / Sign Up', 'idx-gutenberg' ),
		description: __( 'Display an IDX lead login or sign up form.', 'idx-gutenberg' ),
		category: 'common',
		icon,
		keywords: [
		__( 'login', 'idx-gutenberg' ),
		__( 'signup', 'idx-gutenberg' ),
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
					defaultDisplay,
					showRecaptcha,
					textAlignment,
					blockAlignment,
				},
				id,
				attributes,
				isSelected,
				className,
				setAttributes } = props;

			const classes = classnames(
				className,
				'show-'+defaultDisplay,
				{ 'show-recaptcha': showRecaptcha },
			);

			return [
				<div className={ classes } >
				</div>,
				isSelected && <Inspector { ...{ setAttributes, ...props} } />,
				<BlockControls>
					<BlockAlignmentToolbar
						value={ blockAlignment }
						onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
					/>
					<AlignmentToolbar
						value={ textAlignment }
						onChange={ textAlignment => setAttributes( { textAlignment } ) }
					/>
				</BlockControls>,
			];
		}, // end edit
		save: function( props ) {
			return null;
		}, // end save
	},
);
