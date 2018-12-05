// Import block dependencies and components.
import classnames from "classnames"

import Heading_1 from "./components/heading_1"
import Heading_2 from "./components/heading_2"
import Content_1 from "./components/content_1"
import Content_2 from "./components/content_2"
import ToggleSwitch from "./components/toggle_switch"

import styling from "./styling"

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
} = wp.editor

const {
	PanelBody,
	SelectControl,
	RangeControl,
} = wp.components

// Extend component
const { Component, Fragment } = wp.element

class UAGBTeam extends Component {

	constructor() {
		super( ...arguments )
		this.state = {
	      isChecked: false,
	    };
	}
	
	render() {

		const { isSelected, className, setAttributes, attributes, mergeBlocks, insertBlocksAfter, onReplace } = this.props

		// Setup the attributes.
		const {
			block_id,
			headingTitle_1,
			headingDesc_1,
			headingTitle_2,
			headingDesc_2,
			align,
			headingColor_1,
			contentColor_1,
			headingColor_2,
			contentColor_2,
			headingTag,
			headingFontSize_1,
			contentFontSize_1,
			headingFontSize_2,
			contentFontSize_2,
			defualtDisplay,
			swichType,
			color1,
			color2,
			controllerColor,
			switchSize,		
			headingBgColor,
			headingBorderType,
			headingBorderColor,
			headingBorderWidth,
			headingBorderRadius,
			contentBgColor,
			contentBorderType,
			contentBorderColor,
			contentBorderWidth,
			contentBorderRadius,
			btnHeadSpaceWidth,
			contentHeadSpace,
			stack,
		} = attributes

		const my_block_id = "uagb-content-toggle-"+this.props.clientId
		// Add CSS.
		var element = document.getElementById( "uagb-content-toggle-style-" + this.props.clientId )
		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const FontControls = (
			<Fragment>
				<PanelBody
					title={ __( "Typography" ) }
					initialOpen={ false } >
					<SelectControl
						label={ __( "Title Tag" ) }
						value={ headingTag }
						onChange={ ( value ) => setAttributes( { headingTag: value } ) }
						options={ [
							{ value: "h1", label: __( "H1" ) },
							{ value: "h2", label: __( "H2" ) },
							{ value: "h3", label: __( "H3" ) },
							{ value: "h4", label: __( "H4" ) },
							{ value: "h5", label: __( "H5" ) },
							{ value: "h6", label: __( "H6" ) },
						] }
					/>
					<RangeControl
						label = { __( "Heading 1 Font Size" ) }
						value = { headingFontSize_1 }
						onChange = { ( value ) => setAttributes( { headingFontSize_1: value } ) }
						min = { 10 }
						max = { 300 }
						initialPosition={16}
						beforeIcon = "editor-textcolor"
						allowReset
					/>
					<RangeControl
						label = { __( "Content 1 Font Size" ) }
						value = { contentFontSize_1 }
						onChange = { ( value ) => setAttributes( { contentFontSize_1: value } ) }
						min = { 10 }
						max = { 300 }
						initialPosition={16}
						beforeIcon = "editor-textcolor"
						allowReset
					/>
					<RangeControl
						label = { __( "Heading 2 Font Size" ) }
						value = { headingFontSize_2 }
						onChange = { ( value ) => setAttributes( { headingFontSize_2: value } ) }
						min = { 10 }
						max = { 300 }
						initialPosition={16}
						beforeIcon = "editor-textcolor"
						allowReset
					/>
					<RangeControl
						label = { __( "Content 2 Font Size" ) }
						value = { contentFontSize_2 }
						onChange = { ( value ) => setAttributes( { contentFontSize_2: value } ) }
						min = { 10 }
						max = { 300 }
						initialPosition={16}
						beforeIcon = "editor-textcolor"
						allowReset
					/>
				</PanelBody>
			</Fragment>
		)

		const ColorControls = (
			<Fragment>			
				<PanelColorSettings
					title={ __( "Color Settings" ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: headingColor_1,
							onChange: ( colorValue ) => setAttributes( { headingColor_1: colorValue } ),
							label: __( "Heading Color 1" ),
						},
						{
							value: contentColor_1,
							onChange: ( colorValue ) => setAttributes( { contentColor_1: colorValue } ),
							label: __( "Content 1 Color" ),
						},
						{
							value: headingColor_2,
							onChange: ( colorValue ) => setAttributes( { headingColor_2: colorValue } ),
							label: __( "Heading Color 2" ),
						},
						{
							value: contentColor_2,
							onChange: ( colorValue ) => setAttributes( { contentColor_2: colorValue } ),
							label: __( "Content 2 Color" ),
						},
					] }
				>
				</PanelColorSettings>
			</Fragment>
		)

		const switchControls = (
			<PanelBody
					title={ __( "Switch Settings" ) }
					initialOpen={ true } >
				<Fragment>
					<SelectControl
						label={ __( "Default Display" ) }
						value={ defualtDisplay }
						onChange={ ( value ) => {
							setAttributes( { defualtDisplay: value } ) 							
							if( value == 'off' ){
								setAttributes( { is_checked: true} )
							}else{
								setAttributes( { is_checked: false} )
							}
						}}
						options={ [
							{ value: "on", label: __( "Content 1" ) },
							{ value: "off", label: __( "Content 2" ) },
						] }
					/>
					<SelectControl
						label={ __( "Switch Type" ) }
						value={ swichType }
						onChange={ ( value ) => setAttributes( { swichType: value } ) }
						options={ [
							{ value: "round_1", label: __( "Round 1" ) },
							{ value: "round_2", label: __( "Round 2" ) },
							{ value: "rectangle", label: __( "Rectangle" ) },
							{ value: "label_box", label: __( "Label Box" ) },
						] }
					/>
					<RangeControl
						label = { __( "Switch Size" ) }
						value = { switchSize }
						onChange = { ( value ) => setAttributes( { switchSize: value } ) }
						min = { 0 }
						max = { 100 }
						beforeIcon = ""
						allowReset
					/>
					<PanelColorSettings
						title={ __( "Color Settings" ) }
						initialOpen={ true }
						colorSettings={ [
							{
								value: color1,
								onChange: ( colorValue ) => setAttributes( { color1: colorValue } ),
								label: __( "Color 1" ),
							},
							{
								value: color2,
								onChange: ( colorValue ) => setAttributes( { color2: colorValue } ),
								label: __( "Color 2" ),
							},
							{
								value: controllerColor,
								onChange: ( colorValue ) => setAttributes( { controllerColor: colorValue } ),
								label: __( "Controller Color" ),
							},												
						] }
					>
					</PanelColorSettings>				
				</Fragment>
			</PanelBody>
		)

		const headingBgControls = (
			<PanelBody
					title={ __( "Heading Background" ) }
					initialOpen={ false } >				
				<Fragment>
				    <p className="uagb-setting-label">{ __( "Background Color" ) }
				    <span className="components-base-control__label">
					    <span className="component-color-indicator" 
					    	style={{ backgroundColor: headingBgColor }} >
					    </span></span></p>
				    <ColorPalette
				        value={ headingBgColor }
				        onChange={ ( colorValue ) => setAttributes( { headingBgColor: colorValue } ) }
				        allowReset
				    />
				    <SelectControl
						label={ __( "Border Type" ) }
						value={ headingBorderType }
						onChange={ ( value ) => setAttributes( { headingBorderType: value } ) }
						options={ [
							{ value: "none", label: __( "None" ) },
							{ value: "solid", label: __( "Solid" ) },
							{ value: "dotted", label: __( "Dotted" ) },
							{ value: "dashed", label: __( "Dashed" ) },
							{ value: "double", label: __( "Double" ) },
							{ value: "groove", label: __( "Groove" ) },
							{ value: "inset", label: __( "Inset" ) },
							{ value: "outset", label: __( "Outset" ) },
							{ value: "ridge", label: __( "Ridge" ) },
						] }
					/>
					{ "none" != headingBorderType &&
							<Fragment>
								<RangeControl
									label={ __( "Border Width" ) }
									value={ headingBorderWidth }
									onChange={ ( value ) => setAttributes( { headingBorderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<RangeControl
									label={ __( "Border Radius" ) }
									value={ headingBorderRadius }
									onChange={ ( value ) => setAttributes( { headingBorderRadius: value } ) }
									min={ 0 }
									max={ 100 }
									allowReset
								/>
								<Fragment>
									<p className="uagb-setting-label">{ __( "Border Color" ) }
									<span className="components-base-control__label">
									<span className="component-color-indicator" style={{ backgroundColor: headingBorderColor }} ></span></span></p>
									<ColorPalette
										value={ headingBorderColor }
										onChange={ ( colorValue ) => setAttributes( { headingBorderColor: colorValue } ) }
										allowReset
									/>
								</Fragment>
							</Fragment>
					}
				</Fragment>
				
			</PanelBody>
		)

		const contentBgControls = (
			<PanelBody
					title={ __( "Content Background" ) }
					initialOpen={ false } >				
				<Fragment>
				    <p className="uagb-setting-label">{ __( "Background Color" ) }
				    <span className="components-base-control__label">
					    <span className="component-color-indicator" 
					    	style={{ backgroundColor: contentBgColor }} >
					    </span></span></p>
				    <ColorPalette
				        value={ contentBgColor }
				        onChange={ ( colorValue ) => setAttributes( { contentBgColor: colorValue } ) }
				        allowReset
				    />
				    <SelectControl
						label={ __( "Border Type" ) }
						value={ contentBorderType }
						onChange={ ( value ) => setAttributes( { contentBorderType: value } ) }
						options={ [
							{ value: "none", label: __( "None" ) },
							{ value: "solid", label: __( "Solid" ) },
							{ value: "dotted", label: __( "Dotted" ) },
							{ value: "dashed", label: __( "Dashed" ) },
							{ value: "double", label: __( "Dou  ble" ) },
							{ value: "groove", label: __( "Groove" ) },
							{ value: "inset", label: __( "Inset" ) },
							{ value: "outset", label: __( "Outset" ) },
							{ value: "ridge", label: __( "Ridge" ) },
						] }
					/>
					{ "none" != contentBorderType &&
							<Fragment>
								<RangeControl
									label={ __( "Border Width" ) }
									value={ contentBorderWidth }
									onChange={ ( value ) => setAttributes( { contentBorderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<RangeControl
									label={ __( "Border Radius" ) }
									value={ contentBorderRadius }
									onChange={ ( value ) => setAttributes( { contentBorderRadius: value } ) }
									min={ 0 }
									max={ 100 }
									allowReset
								/>
								<Fragment>
									<p className="uagb-setting-label">{ __( "Border Color" ) }
									<span className="components-base-control__label">
									<span className="component-color-indicator" 
									style={{ backgroundColor: contentBorderColor }} ></span></span></p>
									<ColorPalette
										value={ contentBorderColor }
										onChange={ ( colorValue ) => setAttributes( { contentBorderColor: colorValue } ) }
										allowReset
									/>
								</Fragment>
							</Fragment>
					}
				</Fragment>
				
			</PanelBody>
		)

		const spaceControls = (
			<Fragment>
				<PanelBody
					title={ __( "Spacing" ) }
					initialOpen={ false } >					
					<RangeControl
						label = { __( "Heading & Button Space" ) }
						value = { btnHeadSpaceWidth }
						onChange = { ( value ) => setAttributes( { btnHeadSpaceWidth: value } ) }
						min = { 0 }
						max = { 100 }
						allowReset
					/>
					<RangeControl
						label = { __( "Content & Heading Space" ) }
						value = { contentHeadSpace }
						onChange = { ( value ) => setAttributes( { contentHeadSpace: value } ) }
						min = { 0 }
						max = { 100 }
						allowReset
					/>					
				</PanelBody>
			</Fragment>
		)

		const output= (
			<Fragment>
				<div className="uagb-ctgl__wrapper">	
					<div className="uagb-ctgl__toggle">

						<Heading_1 attributes={attributes} setAttributes = { setAttributes } props = { this.props } />

			            <ToggleSwitch attributes={attributes} props = {this.props}/>

					    <Heading_2 attributes={attributes} setAttributes = { setAttributes } props = { this.props } />

					</div>  

					<div className="uagb-ctgl-toggle-sections">
						<Content_1 attributes={attributes} setAttributes = { setAttributes } props = { this.props } />
						<Content_2 attributes={attributes} setAttributes = { setAttributes } props = { this.props } />
					</div>

				</div>
			</Fragment>
		)

		// Global Controls.
		const inspect_control = (
			<Fragment>
				<InspectorControls>
				{ switchControls }
				{ FontControls }
				{ ColorControls }
				{ headingBgControls }
				{ contentBgControls }
				{ spaceControls }
				</InspectorControls>				
			</Fragment>
		)

		return (
			<Fragment>				
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ align }
						onChange={ ( value ) => setAttributes( { align: value } ) }
					/>
				</BlockControls>				
				{inspect_control}
				<div className={ classnames(
					className,
					"uagb-content-toggle__outer-wrap"
				) }
				id = { my_block_id }
				>
				{ output }
				</div>
			</Fragment>
		)
	
	}

	componentDidMount() {

		var id = this.props.clientId
		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: id } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-content-toggle-style-" + id )
		document.head.appendChild( $style )
	}

	componentDidUpdate(){
		var id = this.props.clientId
		window.addEventListener("load", this.toggleContentHandeler("uagb-content-toggle-" + id))		
	}

	toggleContentHandeler(id){
		var $scope 			= jQuery("#"+id);
		var $this           = $scope.find( '.uagb-ctgl__wrapper' );
		var node_id 		= id;
		var rbs_section_1   = $scope.find( ".uagb-ctgl__section-1" );
		var rbs_section_2   = $scope.find( ".uagb-ctgl__section-2" );
		var main_btn        = $scope.find( ".uagb-ctgl__main-btn" );
		var switch_type     = main_btn.attr( 'data-switch-type' );
		var rbs_label_1   	= $scope.find( ".uael-sec-1" );
		var rbs_label_2   	= $scope.find( ".uael-sec-2" );
		var current_class;
		switch ( switch_type ) {
			case 'round_1':
				current_class = '.uagb-ctgl__switch-round-1';
				break;
			case 'round_2':
				current_class = '.uagb-ctgl__switch-round-2';
				break;
			case 'rectangle':
				current_class = '.uagb-ctgl__switch-rectangle';
				break;
			case 'label_box':
				current_class = '.uagb-ctgl__switch-label-box';
				break;
			default:
				current_class = 'No Class Selected';
				break;
		}

		var rbs_switch      = $scope.find( current_class );

		
		if( rbs_switch.is( ':checked' ) ) {
			rbs_section_1.hide();
			rbs_section_2.show();
		} else {
			rbs_section_1.show();
			rbs_section_2.hide();
		}

		rbs_switch.on('click', function(e){		        
	        rbs_section_1.toggle();
	        rbs_section_2.toggle();	      
	       	
	       	if( rbs_switch.is( ':checked' ) ) {
				rbs_section_1.hide();
				rbs_section_2.show();
			} else {
				rbs_section_1.show();
				rbs_section_2.hide();
			}
	    });
	}
}

export default UAGBTeam
