// Set for each piece of dynamic data used in your block
const attributes = {
	defaultDisplay: {
		'type': 'string',
		'default': 'signup',
	},
	showRecaptcha: {
		type: 'boolean',
		default: true,
	},
	textAlignment: {
		type: 'string',
	},
	blockAlignment: {
		type: 'string',
		default: 'wide',
	},
	signupRequirePhone: {
		type: 'boolean',
		default: false,
	},
	signupButtonText: {
		type: 'string',
		default: 'Sign Up',
	},
	loginButtonText: {
		type: 'string',
		default: 'Login',
	},
	buttonColor: {
		type: 'string',
		default: '',
	},
	assignedAgent: {
		type: 'integer',
		default: '',
	}
};

export default attributes;
