/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	InspectorControls,
	// ColorPalette, // Not currently used
} = wp.blocks;
const {
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	RadioControl,
	CheckboxControl,
	RangeControl,
	Toolbar,
	SelectControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				defaultDisplay,
				showRecaptcha,
				textAlignment,
				blockAlignment,
			},
			setAttributes, className } = this.props;

		return [
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ __( 'Form to Display', 'idx-gutenberg' ) }
						value={ defaultDisplay }
						options={ [
							{ value: 'signup', label: __( 'Sign Up', 'idx-gutenberg' ) },
							{ value: 'login', label: __( 'Login', 'idx-gutenberg' ) },
						] }
						onChange={ defaultDisplay => setAttributes( { defaultDisplay } ) }
					/>

					<CheckboxControl
						heading={ __( 'Show Recaptcha', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Uncheck this box to disable ReCaptcha.', 'idx-gutenberg' ) }
						checked={ showRecaptcha }
						onChange={ showRecaptcha => setAttributes( { showRecaptcha } ) }
					/>
				</PanelBody>

			</InspectorControls>
		];
	}
}
