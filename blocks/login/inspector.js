/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	InspectorControls,
	ColorPalette,
} = wp.blocks;
const {
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	PanelColor,
	RadioControl,
	CheckboxControl,
	RangeControl,
	Toolbar,
	SelectControl,
	TextControl,
} = wp.components;

// Build our options for agent SelectControl
const agentOptions = idxGbAgents.map( ( agent ) => ( {
	value: agent.agentID,
	label: agent.agentDisplayName,
} ) );

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
				signupRequirePhone,
				signupButtonText,
				loginButtonText,
				buttonColor,
				assignedAgent,
			},
			setAttributes, className } = this.props;

		return [
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ __( 'Form to Display On Load', 'idx-gutenberg' ) }
						help={ __( 'Users will be able to toggle the displayed form.', 'idx-gutenberg' ) }
						value={ defaultDisplay }
						options={ [
							{ value: 'signup', label: __( 'Sign Up', 'idx-gutenberg' ) },
							{ value: 'login', label: __( 'Login', 'idx-gutenberg' ) },
						] }
						onChange={ defaultDisplay => setAttributes( { defaultDisplay } ) }
					/>
				</PanelBody>

				<PanelColor
					title={ __( 'Button Color', 'idx-gutenberg' ) }
					colorValue={ buttonColor }
				>
					<ColorPalette
						value={ buttonColor }
						onChange={ buttonColor => setAttributes( { buttonColor } ) }
					/>
				</PanelColor>

				<PanelBody
					title={ __( 'Login Options', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Login Button Text', 'idx-gutenberg' ) }
						help={ __( 'Optionally change the Login button text', 'idx-gutenberg' ) }
						value={ loginButtonText }
						onChange={ loginButtonText => setAttributes( { loginButtonText } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Signup Options', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						heading={ __( 'Require Phone Number?', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to display and require the phone number field.', 'idx-gutenberg' ) }
						checked={ signupRequirePhone }
						onChange={ signupRequirePhone => setAttributes( { signupRequirePhone } ) }
					/>

					<CheckboxControl
						heading={ __( 'Show Recaptcha', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Uncheck this box to disable ReCaptcha. Note: Recaptcha key must be entered in IMPress > Settings for this to display.', 'idx-gutenberg' ) }
						checked={ showRecaptcha }
						onChange={ showRecaptcha => setAttributes( { showRecaptcha } ) }
					/>

					<TextControl
						label={ __( 'Signup Button Text', 'idx-gutenberg' ) }
						help={ __( 'Optionally change the Signup button text', 'idx-gutenberg' ) }
						value={ signupButtonText }
						onChange={ signupButtonText => setAttributes( { signupButtonText } ) }
					/>

					<SelectControl
						label={ __( 'Assign an agent (optional)', 'idx-gutenberg' ) }
						value={ assignedAgent }
						options={ agentOptions.concat( [ { value: '', label: 'None' } ] ) }
						onChange={ assignedAgent => setAttributes( { assignedAgent } ) }
					/>

				</PanelBody>

			</InspectorControls>
		];
	}
}
