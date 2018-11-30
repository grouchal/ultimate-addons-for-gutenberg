// Import block dependencies and components.
import classnames from "classnames"

// Import icon.
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon"
//import styling from "./styling"

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaUpload,
} = wp.editor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	TextControl,
	BaseControl,
	ToggleControl
} = wp.components

// Extend component
const { Component, Fragment } = wp.element

class UAGBTeam extends Component {

	
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
			defualtdispaly,
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
			contentBorderType,
			contentBorderColor,
			contentBorderWidth,
			contentBorderRadius,
			btnHeadSpaceWidth,
			contentHeadSpace,
			stack,
		} = attributes

		return(null)
	
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-team-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}
}

export default UAGBTeam
