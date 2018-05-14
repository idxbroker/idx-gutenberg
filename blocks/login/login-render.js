// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;

// Get components from wp.components
const { Component } = wp.element;

class LoginSignupForm extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return [
				<div className={ this.props.className } >
					<form className="login">
						<label for="email" className="email">Email
						<input type="email" name="email" /></label>
						<label for="password" className="password">Password
						<input type="password" name="password" /></label>
						<button style={ { backgroundColor: this.props.buttonColor } } type="submit">{ this.props.loginButtonText }</button>
						<p>Don't have an account? <a>Sign up for one now!</a></p>
					</form>

					<form className="signup">
						<label for="first-name" className="first-name">First Name
						<input type="text" name="first-name" /></label>
						<label for="last-name">Last Name
						<input type="text" className="last-name" name="last-name" /></label>
						<label for="email" className="email">Email
						<input type="email" name="email" /></label>
						<label for="password" className="password">Password
						<input type="password" name="password" /></label>
						<label for="phone" className="phone">Phone
						<input type="tel" name="phone" /></label>
						<input type="hidden" className="agentID" value={ this.props.assignedAgent } />
						<div className="recaptcha"></div>
						<button style={ { backgroundColor: this.props.buttonColor } } type="submit">{ this.props.signupButtonText }</button>
						<p>Already have an account? <a>Login here</a></p>
					</form>
				</div>,
		];
	};

}

export default LoginSignupForm;
