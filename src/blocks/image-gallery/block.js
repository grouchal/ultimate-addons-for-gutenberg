/**
 * BLOCK: Image Gallery
 */

import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
//  Import CSS.
import "./style.scss"
import "./editor.scss"
import attributes from "./attributes"
import edit from "./edit"


// Components
const { __ } = wp.i18n

// Register block controls
const {
	registerBlockType
} = wp.blocks

/**
 * Register: as Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType( "uagb/image-gallery", {
	title: uagb_blocks_info.blocks["uagb/image-gallery"]["title"],
	description: uagb_blocks_info.blocks["uagb/image-gallery"]["description"],
	icon: UAGB_Block_Icons.buttons,
	category: uagb_blocks_info.category,
	keywords: [
		__( "image" ),
		__( "image gallery" ),
		__( "uagb" ),
	],
	attributes,
	edit,
	save: props => {
		return null

		const { attributes, className } = props

		const {
			block_id
		} = props.attributes

		return (
			<div className={ classnames(
				className
			) }
			id={ `uagb-img-gallery-${ block_id }` }
			>
			</div>
		)
	}
} )
