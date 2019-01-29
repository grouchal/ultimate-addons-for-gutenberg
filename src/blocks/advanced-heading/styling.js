/**
 * Set inline styles.
 * @param  {object} props - The block object.
 * @return {object} The inline background type CSS.
 */

function styling( props ) {

	const {
		headingAlign,
		headingTag,
		headingColor,
		headSpace,
		seperatorStyle,
		separatorHeight,
		separatorWidth,
		separatorWidthType,
		separatorColor,
		separatorSpace,
		subHeadingColor,
		subHeadSpace,
		headFontSize,
		headFontSizeType,
		headFontSizeMobile,
		headFontSizeTablet,
		subHeadFontSize,
		subHeadFontSizeType,
		subHeadFontSizeMobile,
		subHeadFontSizeTablet,
	} = props.attributes

	var tablet_selectors = {}
	var mobile_selectors = {}

	var selectors = {
		" .uagb-separator-wrap": {
			"text-align": headingAlign,
		},
		" .editor-rich-text .uagb-desc-text": {
			"text-align": headingAlign,
			"font-size": subHeadFontSize + subHeadFontSizeType,
			"color": subHeadingColor,
		}
	}

	selectors[" .editor-rich-text " + headingTag + ".uagb-heading-text"] = {
		"text-align": headingAlign,
		"font-size": headFontSize + headFontSizeType,
		"color": headingColor,
		"margin-bottom": headSpace + "px",
	}

	if( seperatorStyle !== "none" ){
		selectors[" .uagb-separator"] = {
			"border-top-style": seperatorStyle,
			"border-top-width": separatorHeight + "px",
			"width": separatorWidth + separatorWidthType,
			"border-color": separatorColor,
			"margin-bottom": separatorSpace + "px",
		}
	}
	var styling_css = ""

	tablet_selectors[" .editor-rich-text " + headingTag + ".uagb-heading-text"] = {
		"font-size": headFontSizeTablet + headFontSizeType,
	}
	tablet_selectors[" .editor-rich-text .uagb-desc-text"] = {
		"font-size": subHeadFontSizeTablet + subHeadFontSizeType,
	}

	mobile_selectors[" .editor-rich-text " + headingTag + ".uagb-heading-text"] = {
		"font-size": headFontSizeMobile + headFontSizeType,
	}
	mobile_selectors[" .editor-rich-text .uagb-desc-text"] = {
		"font-size": subHeadFontSizeMobile + subHeadFontSizeType,
	}

	for( var i in selectors ) {

		styling_css += `.block-editor-page #wpwrap #uagb-adv-heading-${ props.clientId }`

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

		styling_css += `.block-editor-page #wpwrap #uagb-adv-heading-${ props.clientId }`

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

		styling_css += `.block-editor-page #wpwrap #uagb-adv-heading-${ props.clientId }`

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
