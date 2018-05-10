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
};

export default attributes;
