// Set for each piece of dynamic data used in your block
const attributes = {
	blockID: {
		type: 'string',
	},
	showcaseFormat: {
		type: 'string',
		default: 'showcase'
	},
	propertyType: {
		type: 'string',
		default: 'featured'
	},
	savedLinkID: {
		type: 'integer',
		default: null
	},
	maxProperties: {
		type: 'integer',
		default: 12
	},
	numberColumns: {
		type: 'integer',
		default: 3
	},
	carouselVisibleProps: {
		type: 'integer',
		default: 1
	},
	carouselAutoplay: {
		type: 'boolean',
		default: true
	},
	carouselStagePadding: {
		type: 'integer',
		default: 0
	},
	carouselMargin: {
		type: 'integer',
		default: 0
	},
	orderBy: {
		type: 'string',
		default: 'price'
	},
	order: {
		type: 'string',
		default: 'DESC'
	},
	detailsPosition: {
		type: 'string',
		default: 'below'
	},
	textAlignment: {
		type: 'string'
	},
	hidePrice: {
		type: 'boolean',
		default: false
	},
	hideAddress: {
		type: 'boolean',
		default: false
	},
	hideBeds: {
		type: 'boolean',
		default: false
	},
	hideBedsIcon: {
		type: 'boolean',
		default: false
	},
	hideBedsLabel: {
		type: 'boolean',
		default: true
	},
	hideBaths: {
		type: 'boolean',
		default: false
	},
	hideBathsIcon: {
		type: 'boolean',
		default: false
	},
	hideBathsLabel: {
		type: 'boolean',
		default: true
	},
	hideSqFt: {
		type: 'boolean',
		default: false
	},
	hideSqFtIcon: {
		type: 'boolean',
		default: false
	},
	hideSqFtLabel: {
		type: 'boolean',
		default: true
	},
	hideAcres: {
		type: 'boolean',
		default: false
	},
	hideAcresIcon: {
		type: 'boolean',
		default: false
	},
	hideAcresLabel: {
		type: 'boolean',
		default: true
	},
	hidePhotoCount: {
		type: 'boolean',
		default: false
	},
	hideViewCount: {
		type: 'boolean',
		default: true
	},
};

export default attributes;
