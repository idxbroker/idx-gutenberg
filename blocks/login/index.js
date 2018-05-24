/**
 * Block dependencies
 */
import icon from './icon';
import classnames from 'classnames';
import Inspector from './inspector';
import attributes from './attributes';
import LoginSignupForm from './login-render';
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
} = wp.blocks;

// Get components from from wp.editor
const {
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

/**
 * Register login/signup block
 */

export default registerBlockType(
	'idx-gutenberg/login',
	{
		title: __( 'Login / Sign Up', 'idx-gutenberg' ),
		description: __( 'Display an IDX lead login or sign up form.', 'idx-gutenberg' ),
		category: 'widgets',
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
					signupRequirePhone,
					signupButtonText,
					loginButtonText,
					buttonColor,
					assignedAgent,
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
				{ 'require-phone': signupRequirePhone },
			);

			return [
				<div className={ classes } >
					<LoginSignupForm
						defaultDisplay={ defaultDisplay }
						textAlignment={ textAlignment }
						blockAlignment={ blockAlignment }
						loginButtonText={ loginButtonText }
						signupButtonText={ signupButtonText }
						buttonColor={ buttonColor }
					/>
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
		save: props => {
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
				attributes,
				className} = props;

			const classes = classnames(
				className,
				'show-'+defaultDisplay,
				{ 'show-recaptcha': showRecaptcha },
				{ 'require-phone': signupRequirePhone },
			);

			return (
				<div className={ classes } >
					<form className="login" action={ `${ idxGbSubdomainUrl }ajax/userlogin.php` } method="post">
						<label for="email" className="email">Email
						<input type="email" name="email" required /></label>
						<label for="password" className="password">Password
						<input type="password" name="password" required /></label>
						<button style={ { backgroundColor: buttonColor } } type="submit">{ loginButtonText }</button>
						<p>Don't have an account? <a href="#">Sign up for one now!</a></p>
					</form>

					<form className="signup idx-signup" action={ `${ idxGbSubdomainUrl }ajax/usersignup.php` } method="post" target="_self">
						<label for="first-name" className="first-name">First Name
						<input type="text" name="firstName" id="first-name" required /></label>
						<label for="last-name" className="last-name">Last Name
						<input type="text" name="lastName" id="last-name" required /></label>
						<label for="email" className="email">Email
						<input type="email" name="email" id="email" required /></label>
						<label for="password" className="password">Password
						<input type="password" name="password" id="password" required /></label>
						<label for="phone" className="phone">Phone
						<input type="tel" name="phone" id="phone" /></label>
						<input type="hidden" name="agentOwner" value={ assignedAgent } />
						<input type="hidden" name="action" value="addLead" />
						<input type="hidden" name="signupWidget" value="true" />
						<input type="hidden" name="contactType" value="direct" />
						<div id="recaptcha" className="g-recaptcha" data-sitekey={ idxGbRecaptchaKey }></div>
						<button style={ { backgroundColor: buttonColor } } type="submit">{ signupButtonText }</button>
						<p>Already have an account? <a href="#">Login here</a></p>
					</form>
				</div>
			);
		},
	},
);
