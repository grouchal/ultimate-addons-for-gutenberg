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
	},
	imageCrop: {
		type: "boolean",
		default: true,
	},
	linkTo: {
		type: "string",
		default: "none",
	}
}

export default attributes
