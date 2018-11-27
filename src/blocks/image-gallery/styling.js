function styling( props ) {

	const {
		images,
		align,
		captionPadding,
		rowGap,
		columnGap,
		scale,
		opacity,
		overlayColor,
		overlayOp,
		hscale,
		hopacity,
		hoverlayColor,
		hoverlayOp,
		capColor,
		capBgColor,
		capBgColorOp
	} = props.attributes

	var selectors = {}
	var tablet_selectors = {}
	var mobile_selectors = {}

	images.map( ( img, index ) => {

	})

	selectors[".uagb-gallery__outer-wrap"] = {
		"margin-right" : ( - rowGap/2 ) + "px",
		"margin-left" : ( - rowGap/2 ) + "px",
	}

	selectors[" .uagb-gallery__item"] = {
		"padding-right" : ( rowGap/2 ) + "px",
		"padding-left" : ( rowGap/2 ) + "px",
	}

	selectors[" .uagb-gallery__item img"] = {
		"transform": "scale(" + ( scale / 100 ) + ")",
		"opacity" : ( opacity / 100 )
	}

	selectors[" .uagb-gallery__img-overlay"] = {
		"background" : overlayColor,
		"opacity" : ( overlayOp / 100 )
	}

	selectors[" .uagb-gallery__item:hover img"] = {
		"transform": "scale(" + ( hscale / 100 ) + ")",
		"opacity" : ( hopacity / 100 )
	}

	selectors[" .uagb-gallery__item:hover .uagb-gallery__img-overlay"] = {
		"background" : hoverlayColor,
		"opacity" : ( hoverlayOp / 100 )
	}

	selectors[" .uagb-gallery__content"] = {
		"margin-bottom" : columnGap + "px"
	}

	selectors[" .uagb-gallery__caption"] = {
		"padding" : captionPadding + "px",
		"background" : capBgColor,
		"opacity" : ( capBgColorOp / 100 )
	}

	selectors[" p.uagb-gallery__caption-text"] = {
		"color" : capColor,
	}

	var alignment = ( align == "left" ) ? "flex-start" : ( ( align == "right" ) ? "flex-end" : "center" )

	selectors[" .uagb-buttons__wrap"] = {
		"justify-content" : alignment,
		"-webkit-box-pack": alignment,
		"-ms-flex-pack": alignment,
		"justify-content": alignment,
	}

	/*if ( "desktop" == stack ) {

		selectors[" .uagb-button__wrapper"] = {
			"margin-left" : 0,
			"margin-right" : 0,
			"margin-bottom" : gap + "px"
		}

		selectors[" .uagb-buttons__wrap"] = {
			 "flex-direction": "column"
		}

		selectors[" .uagb-button__wrapper:last-child"] = {
			"margin-bottom" : 0
		}

	} else if ( "tablet" == stack ) {

		tablet_selectors[" .uagb-button__wrapper"] = {
			"margin-left" : 0,
			"margin-right" : 0,
			"margin-bottom" : gap + "px"
		}

		tablet_selectors[" .uagb-buttons__wrap"] = {
			"flex-direction": "column"
		}

		tablet_selectors[" .uagb-button__wrapper:last-child"] = {
			"margin-bottom" : 0
		}

	} else if ( "mobile" == stack ) {

		mobile_selectors[" .uagb-button__wrapper"] = {
			"margin-left" : 0,
			"margin-right" : 0,
			"margin-bottom" : gap + "px"
		}

		mobile_selectors[" .uagb-buttons__wrap"] = {
			"flex-direction": "column"
		}

		mobile_selectors[" .uagb-button__wrapper:last-child"] = {
			"margin-bottom" : 0
		}
	}*/

	var styling_css = ""
	var id = `#uagb-gallery-${ props.clientId }`

	for( var i in selectors ) {

		styling_css += id

		styling_css += i + " { "

		var sel = selectors[i]
		var css = ""

		for( var j in sel ) {

			css += j + ": " + sel[j] + ";"
		}

		styling_css += css + " } "
	}

	styling_css += "@media only screen and (max-width: 976px) {"

	for( var i in tablet_selectors ) {

		styling_css += id

		styling_css += i + " { "

		var sel = tablet_selectors[i]
		var css = ""

		for( var j in sel ) {

			css += j + ": " + sel[j] + ";"
		}

		styling_css += css + " } "
	}

	styling_css += " }"

	styling_css += "@media only screen and (max-width: 767px) {"

	for( var i in mobile_selectors ) {

		styling_css += id

		styling_css += i + " { "

		var sel = mobile_selectors[i]
		var css = ""

		for( var j in sel ) {

			css += j + ": " + sel[j] + ";"
		}

		styling_css += css + " } "
	}

	styling_css += " }"

	return styling_css
}

export default styling
