// Import lodash for get()
import { get } from 'lodash';

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;

// Get components from wp.components
const { Spinner, withAPIData } = wp.components;
const { Component } = wp.element;

class ListingRender extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const listings = get( this.props.listings, 'data', [] );
		const columnClass = `columns-${ this.props.numberColumns }`;
		console.log(listings);
		if ( this.props.listings.isLoading ) {
			return (
				<p className={ this.props.className } >
					<Spinner />
					{ __( 'Loading Properties...', 'idx-gutenberg' ) }
				</p>
			);
		}
		if ( ! listings || listings.length === 0 ) {
			return (
				<p className={ this.props.className } >
					{ __( 'No Properties Found.', 'idx-gutenberg' ) }
				</p>
			);
		}
				
		return [
				<div className={ columnClass } >
					{ listings.slice( 0, this.props.maxProperties ).map( ( listing, i ) =>
						<div key={ i } className='property'>
							<div className='image'>
								<a href={ listing.fullDetailsURL } >
									<img className='image' src={ listing.image[0].url } alt={ ( listing.image[0].caption ) ? listing.image[0].caption : listing.address } />
									<span className='view-count'><span className='screen-reader-text'>Views: </span><i className='fa fa-eye'></i> { listing.viewCount}</span>
								</a>
								<div className='details'>
									<p className='price'>{ listing.listingPrice }</p>
									<p className='address'>{ listing.address }</p>
									<ul>
										<li className='beds'><span className='label'>Beds:</span> { listing.bedrooms } <i className='fa fa-bed'></i></li>
										<li className='baths'><span className='label'>Baths:</span> { listing.totalBaths } <i className='fa fa-bath'></i></li>
										<li className='sqft'><span className='label'>SqFt:</span> { listing.sqFt } <i className='fa fa-superscript'></i></li>
										<li className='acres'><span className='label'>Acres:</span> { listing.acres } <i className='fa fa-arrows'></i></li>
									</ul>
								</div>
								<a className='gallery' href={ listing.fullDetailsURL }><span className='label screen-reader-text'>Photo count: </span><i className='fa fa-file-image-o'></i> { listing.mlsPhotoCount}</a>
							</div>	
						</div>
					) }
				</div>,
		];
	};
}

const applyWithAPIData = withAPIData( ( props ) => {
	const apibase = '/idx/v1/properties?type=';
	return {
		listings: ( 'savedlink' == props.propertyType && props.savedLinkID ) ? `${ apibase }${ props.propertyType }&id=${ props.savedLinkID }` : `${ apibase }${ props.propertyType }`
	};
} )

export default applyWithAPIData( ListingRender );