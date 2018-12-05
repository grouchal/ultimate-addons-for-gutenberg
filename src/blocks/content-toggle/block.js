/**
 * BLOCK: Content Toggel
 */

// Import block dependencies and components.
import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

import Heading_1 from "./components/heading_1"
import Heading_2 from "./components/heading_2"
import Content_1 from "./components/content_1"
import Content_2 from "./components/content_2"
import ToggleSwitch from "./components/toggle_switch"

// Import icon.
import edit from "./edit"
import attributes from "./attributes"
import "./editor.scss"
import "./style.scss"
const { __ } = wp.i18n

// Import registerBlockType() from wp.blocks
const {
	registerBlockType,
} = wp.blocks

// Extend component
const { Fragment } = wp.element

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
registerBlockType( "uagb/content-toggle", {
	title: uagb_blocks_info.blocks["uagb/content-toggle"]["title"],
	description: uagb_blocks_info.blocks["uagb/content-toggle"]["description"],
	icon: UAGB_Block_Icons.team,
	keywords: [
		__( "content-toggle" ),
		__( "toggle" ),
		__( "uagb" ),
	],
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save: function( props ) {

		const {
			block_id,
			stack,
			className,
		} = props.attributes

		const my_block_id = "uagb-content-toggle-"+block_id

		const output= (
			<Fragment>
				<div className="uagb-ctgl__wrapper">	
					<div className="uagb-ctgl__toggle">

						<Heading_1 attributes={props.attributes} setAttributes = "not_set" props = "not_set" />

			            <ToggleSwitch attributes={props.attributes} setAttributes = "not_set" props = "not_set"/>

					    <Heading_2 attributes={props.attributes} setAttributes = "not_set" props = "not_set" />

					</div>  

					<div className="uagb-ctgl-toggle-sections">
						<Content_1 attributes={props.attributes} setAttributes = "not_set" props = "not_set" />
						<Content_2 attributes={props.attributes} setAttributes = "not_set" props = "not_set" />
					</div>

				</div>
			</Fragment>
		)


		return (
			<Fragment>	
				<div className={ classnames(
					className,
					"uagb-content-toggle__outer-wrap",
					`uagb-content-toggle__stack-on-${stack}`
				) }
				id = { my_block_id }
				>
				{ output }
				</div>
			</Fragment>
		)

	}
} )