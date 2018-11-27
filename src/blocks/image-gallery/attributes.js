/**
 * BLOCK: UAGB Image Gallery Attributes
 */


const attributes = {
	images: {
		type: "array",
		default: [],
	},
	ids: {
		type: "array",
		default: [],
	},
	columns: {
		type: "number",
		default: 4
	},
	mcolumns: {
		type: "number",
		default: 3
	},
	tcolumns: {
		type: "number",
		default: 2
	},
	rowGap: {
		type: "number",
		default: 10
	},
	columnGap: {
		type: "number",
		default: 10
	},
	captionPadding: {
		type: "number",
		default: 10
	},
	imageCrop: {
		type: "boolean",
		default: true,
	},
	linkTo: {
		type: "string",
		default: "none",
	},
	target: {
		type: "boolean",
		default: false
	},
	imgSize: {
		type: "string",
		default: "full",
	},
	layout: {
		type: "string",
		default: "image"
	},
	order: {
		type: "string",
		default: "default",
	},
	scale: {
		type: "number"
	},
	opacity: {
		type: "number"
	},
	effect: {
		type: "string",
		default: "normal",
	},
	overlayColor: {
		type: "string",
	},
	overlayOp: {
		type: "number",
		default: 30
	},
	hscale: {
		type: "number"
	},
	hopacity: {
		type: "number"
	},
	heffect: {
		type: "string",
		default: "normal",
	},
	hoverlayColor: {
		type: "string",
	},
	hoverlayOp: {
		type: "number",
		default: 30
	},
	showCaption: {
		type: "string",
		default: "image"
	},
	captionAlign: {
		type: "string",
		default: "center"
	},
	captionVAlign: {
		type: "string",
		default: "bottom"
	},
	capColor: {
		type: "string",
		default: "#ffffff"
	},
	capBgColor: {
		type: "string",
		default: "#000000"
	},
	capBgColorOp: {
		type: "number",
		default: 40
	},
}

export default attributes
