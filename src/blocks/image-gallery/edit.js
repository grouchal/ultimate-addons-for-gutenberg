/**
 * BLOCK: UAGB - Image Gallery Edit Class
 */

// Import classes
import filter from "lodash/filter"
import pick from "lodash/pick"
import map from "lodash/map"
import get from "lodash/get"

import classnames from "classnames"
import times from "lodash/times"
//import styling from "./styling"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	MediaUpload,
	MediaPlaceholder,
	InspectorControls,
	mediaUpload,
} = wp.editor

const {
	IconButton,
	DropZone,
	FormFileUpload,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	withNotices,
} = wp.components

const MAX_COLUMNS = 8
const linkOptions = [
	{ value: "attachment", label: __( "Attachment Page" ) },
	{ value: "media", label: __( "Media File" ) },
	{ value: "none", label: __( "None" ) },
]

export function defaultColumnsNumber( attributes ) {
	return Math.min( 3, attributes.images.length )
}

export const pickRelevantMediaFiles = ( image ) => {
	const imageProps = pick( image, [ "alt", "id", "link", "caption" ] )
	imageProps.url = get( image, [ "sizes", "large", "url" ] ) || get( image, [ "media_details", "sizes", "large", "source_url" ] ) || image.url
	return imageProps
}


class UAGBImageGallery extends Component {

	constructor() {
		super( ...arguments )
		this.onSelectImages = this.onSelectImages.bind( this )
		this.setAttributes = this.setAttributes.bind( this )
	}

	setAttributes( attributes ) {

		if ( attributes.ids ) {
			throw new Error( "The \"ids\" attribute should not be changed directly. It is managed automatically when \"images\" attribute changes" )
		}

		if ( attributes.images ) {
			attributes = {
				...attributes,
				ids: map( attributes.images, "id" ),
			}
		}

		this.props.setAttributes( attributes )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-gallery-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	onSelectImages( images ) {

		this.setAttributes( {
			images: images.map( ( image ) => pickRelevantMediaFiles( image ) ),
		} )

		this.props.setAttributes( {
			images: images.map( ( image ) => pickRelevantMediaFiles( image ) ),
		} )
	}

	render() {

		const { attributes, setAttributes, isSelected, className, noticeOperations, noticeUI } = this.props

		const {
			images,
			align,
			linkTo
		} = attributes

		console.log(attributes)

		var element = document.getElementById( "uagb-style-gallery-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			//element.innerHTML = styling( this.props )
		}

		const editControl = (
			<BlockControls>
				{ !! images.length && (
					<Toolbar>
						<MediaUpload
							onSelect={ this.onSelectImages }
							allowedTypes={ [ "image" ] }
							multiple
							gallery
							value={ images.map( ( img ) => img.id ) }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( "Edit Gallery" ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				) }
			</BlockControls>
		)

		if ( images.length === 0 ) {
			return (
				<Fragment>
					{ editControl }
					<MediaPlaceholder
						icon="format-gallery"
						className={ className }
						labels={ {
							title: __( "Gallery" ),
							instructions: __( "Drag images, upload new ones or select files from your library." ),
						} }
						onSelect={ this.onSelectImages }
						accept="image/*"
						allowedTypes={ [ "image" ] }
						multiple
						notices={ noticeUI }
						onError={ noticeOperations.createErrorNotice }
					/>
				</Fragment>
			)
		}

		return (
			<Fragment>
				{ editControl }
				<InspectorControls>
					<PanelBody title={ __( "Gallery Settings" ) }>
						<SelectControl
							label={ __( "Link To" ) }
							value={ linkTo }
							onChange={ ( value ) => setAttributes( { linkTo: value } ) }
							options={ linkOptions }
						/>
					</PanelBody>
				</InspectorControls>
				{ noticeUI }
				<div className={ classnames(
					className,
					"uagb-gallery__outer-wrap"
				) }
				id={ `uagb-gallery-${ this.props.clientId }` }>
					{ images.map( ( img, index ) => {

						return (
							<div className="uagb-gallery-item" key={ img.id || img.url }>
								<div>
									<img
										src={ img.url }
										alt={ img.alt }
										id={ img.id }
										caption={ img.caption }
										aria-label={ img.caption }
									/>
								</div>
							</div>
						)
					})}
				</div>
			</Fragment>
		)
	}
}

export default withNotices( UAGBImageGallery )
