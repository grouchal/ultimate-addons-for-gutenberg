/**
 * BLOCK: UAGB Content Toggle Attributes
 */

const attributes = {
	block_id :{
		type : "string"
	},
	headingTitle_1: {
		type: "string",
		default : "Heading 1",
	},
	headingDesc_1: {
		type: "string",
		default : "This is your first content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.​ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
	},
	headingTitle_2: {
		type: "string",
		default : "Heading 2",
	},
	headingDesc_2: {
		type: "string",
		default : "This is your second content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.​ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
	},
	align : {
		type : "string",
		default : "center",
	},          
	headingColor_1 : {
		type : "string",
		default : "#333",
	},
	contentColor_1 : {
		type : "string",
		default : "#333",
	},
	headingColor_2 : {
		type : "string",
		default : "#333",
	},
	contentColor_2 : {
		type : "string",
		default : "#333",
	},
	headingTag : {
		type : "string",
		default : "h3",
	},
	headingFontSize_1 : {
		type : "number",
	},
	contentFontSize_1 : {
		type : "number",
	},
	headingFontSize_2 : {
		type : "number",
	},
	contentFontSize_2 : {
		type : "number",
	},
	defualtDisplay : {
		type : "string",
		default : "content_1",
	},
	swichType : {
		type : "string",
		default : "round_1",
	},
	color1 : {
		type : "string",
		default : "",
	},
	color2 : {
		type : "string",
		default : "",
	},
	controllerColor : {
		type : "string",
		default : "#61ce70",
	},
	switchSize : {
		type : "number",
		default : "15",
	},	
	headingBgColor : {
		type : "string",
		default : "",
	},
	headingBorderType : {
		type : "string",
		default : "none",
	},
	headingBorderColor : {
		type : "string",
		default : "",
	},
	headingBorderWidth : {
		type : "number",
		default : "",
	},
	headingBorderRadius : {
		type : "number",
		default : "",
	},
	contentBgColor : {
		type : "string",
		default : "",
	},
	contentBorderType : {
		type : "string",
		default : "none",
	},
	contentBorderColor : {
		type : "string",
		default : "",
	},
	contentBorderWidth : {
		type : "number",
		default : "",
	},
	contentBorderRadius : {
		type : "number",
		default : "",
	},
	btnHeadSpaceWidth : {
		type : "number",
		default : "",
	},
	contentHeadSpace : {
		type : "number",
		default : "",
	},
	stack: {
		type: "string",
		default: "tablet"
	},
	is_checked: {
		type: "string",
		default: false
	}
}

export default attributes
