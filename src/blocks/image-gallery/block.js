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
	icon: UAGB_Block_Icons.image_gallery,
	category: uagb_blocks_info.category,
	keywords: [
		__( "image" ),
		__( "image gallery" ),
		__( "uagb" ),
	],
	attributes,
	edit,
	save: props => {
		//return null

		const { attributes, className } = props

		const {
			block_id,
			images,
			linkTo,
			imgSize,
			layout,
			columns,
			tcolumns,
			mcolumns,
			showCaption,
			captionAlign,
			effect,
			heffect,
			order,
			captionVAlign
		} = props.attributes

			
		let images_set = images

		if ( "random" == order ) {
			images_set = shuffle( images )
		}

		const image_content =  images_set.map( ( img, index ) => {
						
			let img_url = img.url
			let img_src = img.url

			if ( "attachment" == linkTo ) {							
				img_url = img.link
			}

			if( img_url !== "" ){
				let size = typeof img.media_details !== "undefined" ? img.media_details.sizes : 'undefined'

				if( size == 'undefined' ){
					size = typeof img.sizes !== "undefined" ? img.sizes : 'undefined'
				}
				
				if ( typeof size !== "undefined" && typeof size[imgSize] !== "undefined" ) {
				  img_src = typeof size[imgSize].url !== "undefined" ? size[imgSize].url : size[imgSize].source_url
				}
			}
			
			const img_html = (
				<img
					src={ img_src }
					alt={ img.alt }
					id={ img.id }
					caption={ img.caption }
					aria-label={ img.caption }
					tabIndex="0"
					data-id={ img.id }
				/>
			)

			let image_html = img_html

			if ( "none" != linkTo ) {
				image_html = (
					<a className="uagb-gallery__link" href={ img_url } rel ="noopener noreferrer">{ img_html }</a>
				)
			}

			return (
				<div className={ classnames(
					"uagb-gallery__item",
					`uagb-gallery__item-${index}`,
					"uagb-ins-hover"
				) }
				key={ img.id || img.url }>
					<div className="uagb-gallery__content">
						<div className="uagb-gallery__thumnail uagb-ins-target">
							{ image_html }
						</div>
						<div className="uagb-gallery__img-overlay"></div>
						{ "" != img.caption &&

							<figcaption className="uagb-gallery__caption-wrap">
								<div className="uagb-gallery__caption">
									<p className="uagb-gallery__caption-text">{ img.caption }</p>
								</div>
							</figcaption>
						}
					</div>
				</div>
			)
		})

		return (
			<div className={ classnames(
					className,
					"uagb-gallery__outer-wrap",
					`uagb-gallery__layout-${ layout }`,
					`uagb-gallery__columns-${ columns }`,
					`uagb-gallery__columns-tablet-${ tcolumns }`,
					`uagb-gallery__columns-mobile-${ mcolumns }`,
					`uagb-gallery__caption-show-${ showCaption }`,
					`uagb-gallery__caption-align-${ captionAlign }`,
					`uagb-gallery__caption-valign-${ captionVAlign }`,
					`uagb-ins-${ effect }`,
					`uagb-ins-hover-${ heffect }`,
				) }
				id={ `uagb-gallery-${ block_id }` }>
					{ image_content }
			</div>
		)
	}
} )
