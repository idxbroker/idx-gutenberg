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
					<form className="login" action={ { idxGbSubdomainUrl } +'ajax/userlogin.php' } method="post">
						<label for="email" className="email">Email
						<input type="email" name="email" /></label>
						<label for="password" className="password">Password
						<input type="password" name="password" /></label>
						<button style={ { backgroundColor: buttonColor } } type="submit">{ loginButtonText }</button>
						<p>Don't have an account? <a href="#">Sign up for one now!</a></p>
					</form>

					<form className="signup" action={ { idxGbSubdomainUrl } +'ajax/usersignup.php' } method="post">
						<label for="first-name" className="first-name">First Name
						<input type="text" name="first-name" /></label>
						<label for="last-name" className="last-name">Last Name
						<input type="text" name="last-name" /></label>
						<label for="email" className="email">Email
						<input type="email" name="email" /></label>
						<label for="password" className="password">Password
						<input type="password" name="password" /></label>
						<label for="phone" className="phone">Phone
						<input type="tel" name="phone" /></label>
						<input type="hidden" className="agentID" value={ assignedAgent } />
						<div className="recaptcha"></div>
						<button style={ { backgroundColor: buttonColor } } type="submit">{ signupButtonText }</button>
						<p>Already have an account? <a href="#">Login here</a></p>
					</form>
				</div>
			);
		},
	},
);
