// Import block dependencies and components.
import classnames from "classnames"

import AuthorName from "./components/AuthorName";
import Designation from "./components/Designation";
import Description from "./components/Description";
import PositionClasses from "./classes";
import TestimonialStyle from "./inline-styles";
import TestimonialImage from "./components/TestimonialImage";

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaUpload
} = wp.editor

const {
	PanelBody,
	PanelColor,
	SelectControl,
	RangeControl,
	TabPanel,
	ToggleControl,
	TextControl,
	BaseControl,
	Button,
	withNotices
} = wp.components

const {
	compose
} = wp.compose;

const {
	withSelect
} = wp.data

const {
	withViewportMatch
} = wp.viewport

// Extend component
const { Component, Fragment } = wp.element

const set_icons = {};

set_icons.upload = <svg aria-hidden="true" role="img" focusable="false" className ="dashicon dashicons-upload" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20"><path d="M8 14V8H5l5-6 5 6h-3v6H8zm-2 2v-6H4v8h12.01v-8H14v6H6z"></path></svg>;

class UAGBtestimonial extends Component {

	constructor() {

		super( ...arguments );
		this.getTimelineicon = this.getTimelineicon.bind(this);
		this.toggleBorder    = this.toggleBorder.bind( this );
	}

	getTimelineicon(value) {
		this.props.setAttributes( { icon: value } );
	}	

	
	/**
	 * Function Name: toggleBorder.
	 */
	toggleBorder() {
		const { enableBorder } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { enableBorder: ! enableBorder } );
	}

	splitBlock( before, after, ...blocks ) {
		const {
			attributes,
			insertBlocksAfter,
			setAttributes,
			onReplace,
		} = this.props;

		if ( after ) {
			// Append "After" content as a new paragraph block to the end of
			// any other blocks being inserted after the current paragraph.
			blocks.push( createBlock( 'core/paragraph', { content: after } ) );
		}

		if ( blocks.length && insertBlocksAfter ) {
			insertBlocksAfter( blocks );
		}

		const { content } = attributes;
		if ( ! before ) {
			// If before content is omitted, treat as intent to delete block.
			onReplace( [] );
		} else if ( content !== before ) {
			// Only update content if it has in-fact changed. In case that user
			// has created a new paragraph at end of an existing one, the value
			// of before will be strictly equal to the current content.
			setAttributes( { content: before } );
		}
	}
	render() {

		const { isSelected, className, setAttributes, attributes, mergeBlocks, insertBlocksAfter, onReplace } = this.props;

		// Setup the attributes.
		const {
			prefixTitle,
			headingTitle,
			headingDesc,
			headingAlign,
			headingColor,
			subHeadingColor,
			prefixColor,
			prefixTag,
			prefixFontSize,
			headFontSize,
			subHeadFontSize,
			separatorWidth,
			headSpace,
			separatorSpace,
			subHeadSpace,
			iconimgStyle,
			block_id,
			iconimgBorderstyle,
			iconimgBorderHover,
			iconimgBorder,
			iconimgBorderWidth,
			iconimgBorderRadius,
			source_type,
			prefixSpace,
			iconLeftMargin,
			iconRightMargin,
			iconTopMargin,
			iconBottomMargin,
			iconImage,
			imageSize,
			imageWidth,			
		} = attributes;

		// Add CSS.
		var element = document.getElementById( "uagb-testinomial-style-" + this.props.clientId )
		if( null != element && 'undefined' != typeof element ) {
			element.innerHTML = TestimonialStyle( this.props );
		}		

		const my_block_id = 'uagb-'+this.props.clientId;

		
		// Common setting for icon and images.
		const icon_imagenormalSettings = (
			<Fragment>
				{ ( iconimgStyle && iconimgStyle == "custom" )  &&
					<Fragment>
						<PanelColor
								title={ __( 'Border Color' ) }
								colorValue={ iconimgBorder }
								initialOpen={ false }
							>
							<ColorPalette
									value={ iconimgBorder }
									onChange={ ( colorValue ) => setAttributes( { iconimgBorder: colorValue } ) }
									allowReset
								/>
						</PanelColor>
						<PanelColor
								title={ __( 'Border Color' ) }
								colorValue={ iconimgBorderHover }
								initialOpen={ false }
							>
							<ColorPalette
									value={ iconimgBorderHover }
									onChange={ ( colorValue ) => setAttributes( { iconimgBorderHover: colorValue } ) }
									allowReset
								/>
						</PanelColor>
						 <SelectControl
							label={ __( 'Border Style' ) }
							value={ iconimgBorderstyle }
							onChange={ ( value ) => setAttributes( { iconimgBorderstyle: value } ) }
							options={ [
									{ value: 'none', label: __( 'None' ) },
									{ value: 'solid', label: __( 'Solid' ) },
									{ value: 'double', label: __( 'Double' ) },
									{ value: 'dashed', label: __( 'Dashed' ) },
									{ value: 'dotted', label: __( 'Dotted' ) },
								] }
						/>
						<RangeControl
							label = { __( "Border Width" ) }
							value = { iconimgBorderWidth }
							onChange = { ( value ) => setAttributes( { iconimgBorderWidth: value } ) }
							min = { 0 }
							max = { 30 }
							beforeIcon = "editor-textcolor"
							allowReset
						/>
						<RangeControl
							label = { __( "Rounded Corners" ) }
							value = { iconimgBorderRadius }
							onChange = { ( value ) => setAttributes( { iconimgBorderRadius: value } ) }
							min = { 0 }
							max = { 300 }
							beforeIcon = "editor-textcolor"
							allowReset
						/>
				</Fragment>
			}
			</Fragment>
		);


		// Common setting for icon hover and image hover.
		const icon_imageHoverSettings = (
			<Fragment>					
				{ ( iconimgStyle && iconimgStyle == "custom" )  &&
					<Fragment>
						<PanelColor
								title={ __( 'Border Color' ) }
								colorValue={ iconimgBorderHover }
								initialOpen={ false }
							>
							<ColorPalette
									value={ iconimgBorderHover }
									onChange={ ( colorValue ) => setAttributes( { iconimgBorderHover: colorValue } ) }
									allowReset
								/>
						</PanelColor>
					</Fragment>
				}
			</Fragment>
		);

		
		// Icon image settings.
		const iconImageSettings = (
			<Fragment>
				<TabPanel className="uagb-inspect-tabs"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'normal',
							title: __( 'Normal' ),
							className: 'uagb-normal-tab',
						},
						{
							name: 'hover',
							title: __( 'Hover' ),
							className: 'uagb-hover-tab',
						},
					] }>
					{
						( tabName ) => {
							let tabout_settings;
							if( 'hover' === tabName.name ){
								tabout_settings = icon_imageHoverSettings;
							}else {
								tabout_settings = icon_imagenormalSettings;
							}
							return <div>{ tabout_settings }</div>;
						}
					}
				</TabPanel>
			</Fragment>
		);
		
		
		// Typography settings.
		const TypographySettings = (
			<Fragment>
				<PanelBody
						title={ __( "Typography" ) }
						initialOpen={ false }
					>
						
						<RangeControl
							label={ __( "Content Font Size" ) }
							value={ subHeadFontSize }
							onChange={ ( value ) => setAttributes( { subHeadFontSize: value } ) }
							min={ 10 }
							max={ 200 }
							beforeIcon="editor-textcolor"
							allowReset
						/>											
						<RangeControl
							label={ __( "Name Font Size" ) }
							value={ prefixFontSize }
							onChange={ ( value ) => setAttributes( { prefixFontSize: value } ) }
							min={ 10 }
							max={ 200 }
							beforeIcon="editor-textcolor"
							allowReset
						/>	
						<RangeControl
							label={ __( "Designation Font Size" ) }
							value={ headFontSize }
							onChange={ ( value ) => setAttributes( { headFontSize: value } ) }
							min={ 10 }
							max={ 200 }
							beforeIcon="editor-textcolor"
							allowReset
						/>
						
					</PanelBody>

					<PanelColorSettings
							title={ __( 'Color Settings' ) }
							colorSettings={ [
								{
									value: subHeadingColor,
									onChange: ( colorValue ) => setAttributes( { subHeadingColor: colorValue } ),
									label: __( 'Content Color' ),
								},
								{
									value: prefixColor,
									onChange: ( colorValue ) => setAttributes( { prefixColor: colorValue } ),
									label: __( 'Name Color' ),
								},
								{
									value: headingColor,
									onChange: ( colorValue ) => setAttributes( { headingColor: colorValue } ),
									label: __( 'Designation Color' ),
								},								
							] }
						>
					</PanelColorSettings>
			</Fragment>
		);

		// Margin Settings.
		const marginSettings = (
			<Fragment>
				<PanelBody
						title={ __( "Spacing" ) }
						initialOpen={ false }
					>					
					<RangeControl
						label={ __( "Content Bottom Margin" ) }
						value={ subHeadSpace }
						onChange={ ( value ) => setAttributes( { subHeadSpace: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon="editor-textcolor"
						allowReset
					/>
					<RangeControl
						label={ __( "Name Bottom Margin" ) }
						value={ prefixSpace }
						onChange={ ( value ) => setAttributes( { prefixSpace: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon="editor-textcolor"
						allowReset
					/>
					<RangeControl
						label={ __( "Designation Bottom Margin" ) }
						value={ headSpace }
						onChange={ ( value ) => setAttributes( { headSpace: value } ) }
						min={ 0 }
						max={ 50 }
						beforeIcon="editor-textcolor"
						allowReset
					/>					

					<PanelBody
						title={ __( "Image Margins" ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( "Left Margin" ) }
							value={ iconLeftMargin }
							onChange={ ( value ) => setAttributes( { iconLeftMargin: value } ) }
							min={ 0 }
							max={ 50 }
							beforeIcon="editor-textcolor"
							allowReset
						/>
						<RangeControl
							label={ __( "Right Margin" ) }
							value={ iconRightMargin }
							onChange={ ( value ) => setAttributes( { iconRightMargin: value } ) }
							min={ 0 }
							max={ 50 }
							beforeIcon="editor-textcolor"
							allowReset
						/>
						<RangeControl
							label={ __( "Top Margin" ) }
							value={ iconTopMargin }
							onChange={ ( value ) => setAttributes( { iconTopMargin: value } ) }
							min={ 0 }
							max={ 50 }
							beforeIcon="editor-textcolor"
							allowReset
						/>
						<RangeControl
							label={ __( "Bottom Margin" ) }
							value={ iconBottomMargin }
							onChange={ ( value ) => setAttributes( { iconBottomMargin: value } ) }
							min={ 0 }
							max={ 50 }
							beforeIcon="editor-textcolor"
							allowReset
						/>
					</PanelBody>
				</PanelBody>
			</Fragment>
		);

		// Set icon iamge.
		const onSelectIconImage = ( media ) => {
			if ( ! media || ! media.url ) {
				setAttributes( { iconImage: null } )
				return
			}
			setAttributes( { iconImage: media } )
		}

		// Remove icon image.
		const onRemoveIconImage = ( media ) => {
			setAttributes( { iconImage: null } )
		}

		// Image sizes.
		const imageSizeOptions = [
			{ value: 'thumbnail', label: __( 'Thumbnail' ) },
			{ value: 'medium', label: __( 'Medium' ) },
			{ value: 'full', label: __( 'Large' ) }
		];		

		// Global Controls.
		const inspect_control = (
				<Fragment>
				 <InspectorControls>
					<PanelBody
					title={ __( 'Image' ) }
					initialOpen={ false }
					>							
					<SelectControl
						label={ __( 'Image Style' ) }
						value={ iconimgStyle }
						onChange={ ( value ) => setAttributes( { iconimgStyle: value } ) }
						options={ [
							{ value: 'normal', label: __( 'Normal' ) },
							{ value: 'circle', label: __( 'Circle' ) },
							{ value: 'square', label: __( 'Square' ) },
							{ value: 'custom', label: __( 'custom' ) },
						] }
					/>					

					<SelectControl
							label={ __( 'Image Size' ) }
							options={ imageSizeOptions }
							value={ imageSize }
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>
					 <RangeControl
							label={ __( 'Width' ) }
							value={ imageWidth }
							onChange={ ( value ) => setAttributes( { imageWidth: value } ) }
							min={ 0 }
							max={ 500 }
							beforeIcon="editor-textcolor"
							allowReset
						/>
					
				    { ( iconimgStyle && iconimgStyle == "custom" )  && iconImageSettings }
					</PanelBody>	

					{ TypographySettings }

					{ marginSettings }

				</InspectorControls>
				</Fragment>
			);

		var ClassNamesId = className+' '+ my_block_id;

		//Get image components.
		const image_option = (
			<MediaUpload
				buttonProps={ {
					className: 'change-image'
				} }
				onSelect= { onSelectIconImage }
				type="image"
				value={ iconImage }
				render={ ( { open } ) => (
					<Button onClick={ open }  >
						{ ! iconImage.url ? set_icons.upload : <TestimonialImage attributes={attributes} />  }
					</Button>
				) }
			>
			</MediaUpload>
			) ;


		// Get icon/Image components.
		let is_image = image_option;
		
		// Get description.
		const desc = (
				<Fragment>
					<div className = "uagb-testinomial-text-wrap">
						<Description attributes={attributes} setAttributes = { setAttributes } props = { this.props } />
					</div>
				</Fragment>
			);

		// Get Title and Prefix components.
		const title_text = (
			<Fragment>
				<div className = "uagb-testinomial-author-wrap">
					<AuthorName attributes={attributes} setAttributes = { setAttributes } props = { this.props } />
					<Designation attributes={attributes} setAttributes = { setAttributes } props = { this.props } />
				</div>
			</Fragment>
			);

		return (
			<Fragment>				
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ headingAlign }
						onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
					/>
				</BlockControls>				
				{inspect_control}
				<div className={ ClassNamesId }>
					<div className = { classnames(
						"uagb-testinomial-content-wrap",
						...PositionClasses( attributes ),
					) }>
						<div className = "uagb-testinomial-content">
							{ desc }
							{ is_image }
							{ title_text }
						</div>						
					</div>
				</div>
			</Fragment>
		)
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-testinomial-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}
}

export default UAGBtestimonial
