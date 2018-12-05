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
		default : "on",
	},
	swichType : {
		type : "string",
		default : "round_1",
	},
	color1 : {
		type : "string",
		default : "#abb8c3",
	},
	color2 : {
		type : "string",
		default : "#abb8c3",
	},
	controllerColor : {
		type : "string",
		default : "#fff",
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
		default : "1",
	},
	headingBorderRadius : {
		type : "number",
		default : "0",
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
		default : "1",
	},
	contentBorderRadius : {
		type : "number",
		default : "0",
	},
	btnHeadSpaceWidth : {
		type : "number",
		default : "5",
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
