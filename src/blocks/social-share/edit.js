/**
 * BLOCK: UAGB - Social Share Edit Class
 */

// Import classes
import classnames from "classnames"
import times from "lodash/times"
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import styling from "./styling"
import links from "./links"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	MediaUpload
} = wp.editor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button
} = wp.components


class UAGBSocialShare extends Component {

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )
		this.props.setAttributes( { current_url: wp.data.select("core/editor").getPermalink() } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-social-share-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	saveSocials( value, index ) {
		const { attributes, setAttributes } = this.props
		const { socials } = attributes

		const newItems = socials.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value }
			}

			return item
		} )
		setAttributes( {
			socials: newItems,
		} )
	}

	render() {

		const { attributes, setAttributes, isSelected } = this.props

		const {
			align,
			className,
			social_count,
			socials,
			gap,
			stack,
			current_url,
			social_layout,
			size,
			borderRadius,
			bgSize
		} = attributes

		const socialControls = ( index ) => {
			return (
				<PanelBody key={index}
					title={ __( "Social Share" ) + " " + ( index + 1 ) + " " + __( "Settings" ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( "Type" ) }
						value={ socials[ index ].type }
						options={ [
							{ value: "facebook", label: __( "Facebook" ) },
							{ value: "twitter", label: __( "Twitter" ) },
							{ value: "google", label: __( "Google Plus" ) },
							{ value: "pinterest", label: __( "Pinterest" ) },
							{ value: "linkedin", label: __( "LinkedIn" ) },
							{ value: "digg", label: __( "Digg" ) },
							{ value: "blogger", label: __( "Blogger" ) },
							{ value: "reddit", label: __( "Reddit" ) },
							{ value: "stumbleupon", label: __( "StumbleUpon" ) },
							{ value: "tumblr", label: __( "Tumblr" ) },
							{ value: "myspace", label: __( "Myspace" ) },
							{ value: "email", label: __( "Email" ) },
						] }
						onChange={ value => {
							this.saveSocials( { type: value }, index )
						} }
					/>
					<SelectControl
						label={ __( "Image / Icon" ) }
						value={ socials[ index ].image_icon }
						options={ [
							{ value: "icon", label: __( "Icon" ) },
							{ value: "image", label: __( "Image" ) },
						] }
						onChange={ value => {
							this.saveSocials( { image_icon: value }, index )
						} }
					/>
					{ "icon" == socials[ index ].image_icon &&
						<Fragment>
							<p className="components-base-control__label">{__( "Icon" )}</p>
							<FontIconPicker
								icons={UAGBIcon}
								renderUsing="class"
								theme="default"
								value={socials[ index ].icon}
								onChange={ value => {
									this.saveSocials( { icon: value }, index )
								} }
								isMulti={false}
							/>
						</Fragment>
					}
					{ "image" == socials[ index ].image_icon &&
						<Fragment>
							<MediaUpload
								title={ __( "Select Image" ) }
								onSelect={ value => {
									this.saveSocials( { image: value }, index )
								} }
								allowedTypes={ [ "image" ] }
								value={ socials[ index ].image }
								render={ ( { open } ) => (
									<Button isDefault onClick={ open }>
										{ ! socials[ index ].image ? __( "Select Image" ) : __( "Replace image" ) }
									</Button>
								) }
							/>
							{ socials[ index ].image &&
								<Button
									className="uagb-rm-btn"
									onClick={ value => {
										this.saveSocials( { image: null }, index )
									} }
									isLink isDestructive>
									{ __( "Remove Image" ) }
								</Button>
							}
							<PanelColorSettings
								title={ __( "Color Settings" ) }
								colorSettings={ [
									{
										value: socials[ index ].icon_bg_color,
										onChange:( value ) => this.saveSocials( { icon_bg_color: value }, index ),
										label: __( "Background Color" ),
									},
									{
										value: socials[ index ].icon_bg_hover_color,
										onChange:( value ) => this.saveSocials( { icon_bg_hover_color: value }, index ),
										label: __( "Background Hover Color" ),
									}
								] }>
							</PanelColorSettings>
						</Fragment>
					}
					{ "icon" == socials[ index ].image_icon &&
						<PanelColorSettings
							title={ __( "Color Settings" ) }
							colorSettings={ [
								{
									value: socials[ index ].icon_color,
									onChange:( value ) => this.saveSocials( { icon_color: value }, index ),
									label: __( "Color" ),
								},
								{
									value: socials[ index ].icon_bg_color,
									onChange:( value ) => this.saveSocials( { icon_bg_color: value }, index ),
									label: __( "Background Color" ),
								},
								{
									value: socials[ index ].icon_hover_color,
									onChange:( value ) => this.saveSocials( { icon_hover_color: value }, index ),
									label: __( "Hover Color" ),
								},
								{
									value: socials[ index ].icon_bg_hover_color,
									onChange:( value ) => this.saveSocials( { icon_bg_hover_color: value }, index ),
									label: __( "Background Hover Color" ),
								}
							] }>
						</PanelColorSettings>
					}
				</PanelBody>
			)
		}

		var element = document.getElementById( "uagb-style-social-share-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ [ "left", "center", "right", "full" ] }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={ __( "Social Icon Count" ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( "Number of Social Icons" ) }
							value={ social_count }
							onChange={ newCount => {

								let cloneSocials = [ ...socials ]

								if ( cloneSocials.length < newCount ) {

									const incAmount = Math.abs( newCount - cloneSocials.length )

									{ times( incAmount, n => {

										cloneSocials.push( {
											"type": cloneSocials[ 0 ].type,
											"image_icon": cloneSocials[ 0 ].image_icon,
											"icon": cloneSocials[ 0 ].icon,
											"image": cloneSocials[ 0 ].image,
											"icon_color": cloneSocials[ 0 ].icon_color,
											"icon_hover_color": cloneSocials[ 0 ].icon_hover_color,
											"icon_bg_color": cloneSocials[ 0 ].icon_bg_color,
											"icon_bg_hover_color": cloneSocials[ 0 ].icon_bg_hover_color
										} )
									} ) }

									setAttributes( { socials: cloneSocials } )
								}
								setAttributes( { social_count: newCount } )
							} }
							min={ 1 }
							max={ 12 }
						/>
					</PanelBody>
					{ times( social_count, n => socialControls( n ) ) }
					<PanelBody
						title={ __( "General" ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( "Layout" ) }
							value={ social_layout }
							options={ [
								{ value: "horizontal", label: __( "Horizontal" ) },
								{ value: "vertical", label: __( "Vertical" ) },
							] }
							onChange={ ( value ) => setAttributes( { social_layout: value } ) }
						/>
						{ "horizontal" == social_layout &&
							<SelectControl
								label={ __( "Stack on" ) }
								value={ stack }
								options={ [
									{ value: "none", label: __( "None" ) },
									{ value: "desktop", label: __( "Desktop" ) },
									{ value: "tablet", label: __( "Tablet" ) },
									{ value: "mobile", label: __( "Mobile" ) },
								] }
								onChange={ ( value ) => setAttributes( { stack: value } ) }
								help={ __( "Note: Choose on what breakpoint the Icons will stack." ) }
							/>
						}
						<RangeControl
							label={ __( "Size" ) }
							value={ size }
							onChange={ ( value ) => setAttributes( { size: value } ) }
							min={ 0 }
							max={ 500 }
							initialPosition={40}
						/>
						<RangeControl
							label={ __( "Background Size" ) }
							value={ bgSize }
							onChange={ ( value ) => setAttributes( { bgSize: value } ) }
							min={ 0 }
							max={ 500 }
						/>
						<p className="uagb-note">{ __( "Note: Background Size option is useful when one adds background color to the icons." ) }</p>
						<RangeControl
							label={ __( "Circular Size" ) }
							value={ borderRadius }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							min={ 0 }
							max={ 500 }
						/>
						<p className="uagb-note">{ __( "Note: Circular Size option is useful when one adds background color to the icons." ) }</p>
						<RangeControl
							label={ __( "Gap between Icon / Image" ) }
							value={ gap }
							onChange={ ( value ) => setAttributes( { gap: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					"uagb-social-share__outer-wrap",
					`uagb-social-share__layout-${social_layout}`
				) }
				id={ `uagb-social-share-${ this.props.clientId }` }>
					<div className="uagb-social-share__wrap">
						{
							socials.map( ( social, index ) => {

								if ( social_count <= index ) {
									return
								}

								let url = ""

								if( null != current_url ) {
									url = links[social.type] + encodeURI( current_url )
								}

								let image_icon_html = ""

								if ( social.image_icon == "icon" ) {
									if ( social.icon ) {
										image_icon_html = <span className={ classnames( social.icon , "uagb-ss__source-icon" ) }></span>
									}
								} else {
									if ( social.image ) {
										image_icon_html = <img className="uagb-ss__source-image" src={social.image.url} />
									}
								}

								return (
									<div
										className={ classnames(
											`uagb-ss-repeater-${index}`,
											"uagb-ss__wrapper"
										) }
										key={ index }
									>
										<a className="uagb-ss__link" href="javascript:void(0)" rel ="noopener noreferrer"><span className="uagb-ss__source-wrap">{image_icon_html}</span></a>
									</div>
								)
							})
						}
					</div>
				</div>
			</Fragment>
		)
	}
}

export default UAGBSocialShare
