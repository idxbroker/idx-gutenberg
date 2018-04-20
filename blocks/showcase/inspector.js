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
const savedLinkOptions = savedLinks.map( ( link ) => ( {
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
				propertyType,
				savedLinkID,
				maxProperties,
				numberColumns,
				detailsPosition,
				textAlignment,
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
			setAttributes, className } = this.props;

		return (
			<InspectorControls>

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

				<PanelBody>
					<RadioControl
						label={ __( 'Details Positioning', 'idx-gutenberg' ) }
						selected={ detailsPosition }
						options={ [
							{ label: __( 'Overlay', 'idx-gutenberg' ), value: 'overlay' },
							{ label: __( 'Below', 'idx-gutenberg' ), value: 'below' },
						] }
						onChange={ detailsPosition => setAttributes( { detailsPosition } ) }
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
		);
	}
}
