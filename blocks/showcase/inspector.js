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

// Build our options for savedLinkID SelectControl
const savedLinkOptions = idxGbSavedLinks.map( ( link ) => ( {
	value: link.id,
	label: link.linkTitle,
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
				blockID,
				showcaseFormat,
				propertyType,
				savedLinkID,
				maxProperties,
				numberColumns,
				carouselVisibleProps,
				carouselStagePadding,
				carouselMargin,
				carouselAutoplay,
				orderBy,
				order,
				detailsPosition,
				textAlignment,
				blockAlignment,
				hidePrice,
				hideAddress,
				hideBeds,
				hideBedsIcon,
				hideBedsLabel,
				hideBaths,
				hideBathsIcon,
				hideBathsLabel,
				hideSqFt,
				hideSqFtIcon,
				hideSqFtLabel,
				hideAcres,
				hideAcresIcon,
				hideAcresLabel,
				hidePhotoCount,
				hideViewCount
			},
			id, setAttributes, className } = this.props;

		// Define additional display options as const to conditionally display them.
		const showcaseFormatOptions = () => {
			if ( 'showcase' === showcaseFormat || 'list' === showcaseFormat ) {
				return (
					<PanelBody>
						<RangeControl
							beforeIcon="arrow-left-alt2"
							afterIcon="arrow-right-alt2"
							label={ __( 'Number of Columns', 'idx-gutenberg' ) }
							value={ numberColumns }
							onChange={ numberColumns => setAttributes( { numberColumns } ) }
							min={ 1 }
							max={ 8 }
						/>
					</PanelBody>
				);
			}

			if ( 'carousel' === showcaseFormat ) {
				return (
					<PanelBody>
						<RangeControl
							beforeIcon="arrow-left-alt2"
							afterIcon="arrow-right-alt2"
							label={ __( 'Number of properties visible', 'idx-gutenberg' ) }
							help={ __( 'This is the number of properties displayed in the carousel at a time. For slideshow animation options, choose one (1).', 'idx-gutenberg' ) }
							value={ carouselVisibleProps }
							onChange={ carouselVisibleProps => setAttributes( { carouselVisibleProps } ) }
							min={ 1 }
							max={ 6 }
						/>
						<RangeControl
							beforeIcon="arrow-left-alt2"
							afterIcon="arrow-right-alt2"
							label={ __( 'Stage Padding', 'idx-gutenberg' ) }
							help={ __( 'Stage Padding displays a preview of the next/previous slide equal to the stage padding width.', 'idx-gutenberg' ) }
							value={ carouselStagePadding }
							onChange={ carouselStagePadding => setAttributes( { carouselStagePadding } ) }
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							beforeIcon="arrow-left-alt2"
							afterIcon="arrow-right-alt2"
							label={ __( 'Slide Margin', 'idx-gutenberg' ) }
							help={ __( 'Increase or decrease the margin between slides.', 'idx-gutenberg' ) }
							value={ carouselMargin }
							onChange={ carouselMargin => setAttributes( { carouselMargin } ) }
							min={ 0 }
							max={ 100 }
						/>
						<CheckboxControl
							heading={ __( 'Autoplay Carousel', 'idx-gutenberg' ) }
							label={ __( 'Yes', 'idx-gutenberg' ) }
							help={ __( 'Uncheck this box to disable autoplay.', 'idx-gutenberg' ) }
							checked={ carouselAutoplay }
							onChange={ carouselAutoplay => setAttributes( { carouselAutoplay } ) }
						/>
					</PanelBody>
				);
			}
			
		} 
		
		const detailsOptionsBeds = () => {
			if ( hideBeds ) {
				return '';
			}

			return (
				<PanelRow>
					<CheckboxControl
						heading={ __( 'Hide Beds Icon', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Beds icon.', 'idx-gutenberg' ) }
						checked={ hideBedsIcon }
						onChange={ hideBedsIcon => setAttributes( { hideBedsIcon } ) }
					/>

					<CheckboxControl
						heading={ __( 'Hide Beds Label', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Beds label.', 'idx-gutenberg' ) }
						checked={ hideBedsLabel }
						onChange={ hideBedsLabel => setAttributes( { hideBedsLabel } ) }
					/>
				</PanelRow>
			);
		}

		const detailsOptionsBaths = () => {
			if ( hideBaths ) {
				return '';
			}

			return (
				<PanelRow>
					<CheckboxControl
						heading={ __( 'Hide Baths Icon', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Baths icon.', 'idx-gutenberg' ) }
						checked={ hideBathsIcon }
						onChange={ hideBathsIcon => setAttributes( { hideBathsIcon } ) }
					/>

					<CheckboxControl
						heading={ __( 'Hide Baths Label', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Baths label.', 'idx-gutenberg' ) }
						checked={ hideBathsLabel }
						onChange={ hideBathsLabel => setAttributes( { hideBathsLabel } ) }
					/>
				</PanelRow>
			);
		}

		const detailsOptionsSqFt = () => {
			if ( hideSqFt ) {
				return '';
			}

			return (
				<PanelRow>
					<CheckboxControl
						heading={ __( 'Hide SqFt Icon', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the SqFt icon.', 'idx-gutenberg' ) }
						checked={ hideSqFtIcon }
						onChange={ hideSqFtIcon => setAttributes( { hideSqFtIcon } ) }
					/>

					<CheckboxControl
						heading={ __( 'Hide SqFt Label', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the SqFt label.', 'idx-gutenberg' ) }
						checked={ hideSqFtLabel }
						onChange={ hideSqFtLabel => setAttributes( { hideSqFtLabel } ) }
					/>
				</PanelRow>
			);
		}

		const detailsOptionsAcres = () => {
			if ( hideAcres ) {
				return '';
			}

			return (
				<PanelRow>
					<CheckboxControl
						heading={ __( 'Hide Acres Icon', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Acres icon.', 'idx-gutenberg' ) }
						checked={ hideAcresIcon }
						onChange={ hideAcresIcon => setAttributes( { hideAcresIcon } ) }
					/>

					<CheckboxControl
						heading={ __( 'Hide Acres Label', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Acres label.', 'idx-gutenberg' ) }
						checked={ hideAcresLabel }
						onChange={ hideAcresLabel => setAttributes( { hideAcresLabel } ) }
					/>
				</PanelRow>
			);
		}

		return [
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ __( 'Display Format', 'idx-gutenberg' ) }
						value={ showcaseFormat }
						options={ [
							{ value: 'showcase', label: __( 'Showcase', 'idx-gutenberg' ) },
							{ value: 'carousel', label: __( 'Carousel', 'idx-gutenberg' ) },
							{ value: 'list', label: __( 'List', 'idx-gutenberg' ) },
						] }
						onChange={ showcaseFormat => setAttributes( { showcaseFormat } ) }
					/>
				</PanelBody>

				<PanelBody>
					<SelectControl
						label={ __( 'Property Type', 'idx-gutenberg' ) }
						value={ propertyType }
						options={ [
							{ value: 'featured', label: __( 'Featured', 'idx-gutenberg' ) },
							{ value: 'savedlink', label: __( 'Saved Link', 'idx-gutenberg' ) },
							{ value: 'soldpending', label: __( 'Sold / Pending', 'idx-gutenberg' ) },
							{ value: 'supplemental', label: __( 'Supplemental', 'idx-gutenberg' ) },
						] }
						onChange={ propertyType => setAttributes( { propertyType } ) }
					/>
				</PanelBody>

				<PanelBody>
					<SelectControl
						label={ __( 'Saved Link', 'idx-gutenberg' ) }
						value={ savedLinkID }
						options={ savedLinkOptions }
						onChange={ savedLinkID => setAttributes( { savedLinkID } ) }
					/>
				</PanelBody>

				<PanelBody>
					<RangeControl
						beforeIcon="arrow-left-alt2"
						afterIcon="arrow-right-alt2"
						label={ __( 'Max Properties', 'idx-gutenberg' ) }
						value={ maxProperties }
						onChange={ maxProperties => setAttributes( { maxProperties } ) }
						min={ 1 }
						max={ 100 }
					/>
				</PanelBody>

				{ showcaseFormatOptions() }				

				<PanelBody>
					<SelectControl
						label={ __( 'Order By', 'idx-gutenberg' ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Price', 'idx-gutenberg' ), value: 'price' },
							{ label: __( 'Beds', 'idx-gutenberg' ), value: 'beds' },
							{ label: __( 'Baths', 'idx-gutenberg' ), value: 'baths' },
							{ label: __( 'View Count', 'idx-gutenberg' ), value: 'view-count' },
							{ label: __( 'Photo Count', 'idx-gutenberg' ), value: 'photo-count' },
						] }
						onChange={ orderBy => setAttributes( { orderBy } ) }
					/>

					<RadioControl
						label={ __( 'Order', 'idx-gutenberg' ) }
						selected={ order }
						options={ [
							{ label: __( 'Ascending', 'idx-gutenberg' ), value: 'ASC' },
							{ label: __( 'Descending', 'idx-gutenberg' ), value: 'DESC' },
						] }
						onChange={ order => setAttributes( { order } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Price', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						heading={ __( 'Hide Price', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the price field.', 'idx-gutenberg' ) }
						checked={ hidePrice }
						onChange={ hidePrice => setAttributes( { hidePrice } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Address', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						heading={ __( 'Hide Address', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Address field.', 'idx-gutenberg' ) }
						checked={ hideAddress }
						onChange={ hideAddress => setAttributes( { hideAddress } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Beds', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						heading={ __( 'Hide Beds', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Beds field.', 'idx-gutenberg' ) }
						checked={ hideBeds }
						onChange={ hideBeds => setAttributes( { hideBeds } ) }
					/>

					{ detailsOptionsBeds() }

				</PanelBody>

				<PanelBody
					title={ __( 'Baths', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						heading={ __( 'Hide Baths', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Baths field.', 'idx-gutenberg' ) }
						checked={ hideBaths }
						onChange={ hideBaths => setAttributes( { hideBaths } ) }
					/>

					{ detailsOptionsBaths() }

				</PanelBody>

				<PanelBody
					title={ __( 'SqFt', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						heading={ __( 'Hide SqFt', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the SqFt field.', 'idx-gutenberg' ) }
						checked={ hideSqFt }
						onChange={ hideSqFt => setAttributes( { hideSqFt } ) }
					/>

					{ detailsOptionsSqFt() }

				</PanelBody>

				<PanelBody
					title={ __( 'Acres', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						heading={ __( 'Hide Acres', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Acres field.', 'idx-gutenberg' ) }
						checked={ hideAcres }
						onChange={ hideAcres => setAttributes( { hideAcres } ) }
					/>

					{ detailsOptionsAcres() }

				</PanelBody>

				<PanelBody
					title={ __( 'Extra', 'idx-gutenberg' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						heading={ __( 'Hide Photo Count', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the Photo Count.', 'idx-gutenberg' ) }
						checked={ hidePhotoCount }
						onChange={ hidePhotoCount => setAttributes( { hidePhotoCount } ) }
					/>

					<CheckboxControl
						heading={ __( 'Hide View Count', 'idx-gutenberg' ) }
						label={ __( 'Yes', 'idx-gutenberg' ) }
						help={ __( 'Check this box to hide the View Count.', 'idx-gutenberg' ) }
						checked={ hideViewCount }
						onChange={ hideViewCount => setAttributes( { hideViewCount } ) }
					/>
				</PanelBody>

			</InspectorControls>
		];
	}
}
