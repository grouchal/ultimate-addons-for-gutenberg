/**
 * Set inline styles.
 * @param  {object} props - The block object.
 * @return {object} The inline background type CSS.
 */

function styling( props ) {

	const {
		block_id,
		align,
		headingColor_1,
		contentColor_1,
		headingColor_2,
		contentColor_2,
		headingTag,
		headingFontSize_1,
		contentFontSize_1,
		headingFontSize_2,
		contentFontSize_2,
		defualtDisplay,
		swichType,
		color1,
		color2,
		controllerColor,
		switchSize,		
		headingBgColor,
		headingBorderType,
		headingBorderColor,
		headingBorderWidth,
		headingBorderRadius,
		contentBgColor,
		contentBorderType,
		contentBorderColor,
		contentBorderWidth,
		contentBorderRadius,
		btnHeadSpaceWidth,
		contentHeadSpace,
		stack,
	} = props.attributes

	var selectors = {
		" .editor-rich-text p.uagb-team__desc.editor-rich-text__tinymce": {
			"font-size": descFontSize + "px",
			"color": descColor,
			"margin-bottom": descSpace + "px",
		},
		" .uagb-team__prefix": {
			"font-size": prefixFontSize + "px",
			"color": prefixColor,
		},
		" .uagb-team__desc-wrap": {
			"margin-top": prefixSpace + "px",
		},
		" .uagb-team__social-icon a": {
			"color": socialColor + " !important",
			"font-size": socialFontSize + "px !important",
			"width": socialFontSize + "px !important",
			"height": socialFontSize + "px !important",
		},
		" .uagb-team__social-icon:hover a": {
			"color": socialHoverColor + " !important",
		},
		".uagb-team__image-position-left .uagb-team__social-icon" : {
			"margin-right": socialSpace + "px !important",
			"margin-left": "0",
		},
		".uagb-team__image-position-right .uagb-team__social-icon" : {
			"margin-left": socialSpace + "px !important",
			"margin-right": "0",
		},
		".uagb-team__image-position-above.uagb-team__align-center .uagb-team__social-icon" : {
			"margin-right": ( socialSpace / 2 ) + "px !important",
			"margin-left": ( socialSpace / 2 ) + "px !important",
		},
		".uagb-team__image-position-above.uagb-team__align-left .uagb-team__social-icon" : {
			"margin-right": socialSpace + "px !important",
			"margin-left": "0",
		},
		".uagb-team__image-position-above.uagb-team__align-right .uagb-team__social-icon" : {
			"margin-left": socialSpace + "px !important",
			"margin-right": "0",
		},
		" .uagb-team__image-wrap" : {
			"margin-top": imgTopMargin + "px",
			"margin-bottom": imgBottomMargin + "px",
			"margin-left": imgLeftMargin + "px",
			"margin-right": imgRightMargin + "px",
			"width": imgWidth + "px"
		}
	}

	if ( "above" == imgPosition ) {
		if ( "center" == align ) {
			selectors[" .uagb-team__image-wrap"]["margin-left"] = "auto"
			selectors[" .uagb-team__image-wrap"]["margin-right"] = "auto"
		} else if ( "left" == align ) {
			selectors[" .uagb-team__image-wrap"]["margin-right"] = "auto"
		} else if ( "right" == align ) {
			selectors[" .uagb-team__image-wrap"]["margin-left"] = "auto"
		}
	}

	if ( "above" != imgPosition ) {
		if ( "middle" == imgAlign ) {
			selectors[" .uagb-team__image-wrap"]["align-self"] = "center"
		}
	}

	selectors[" .editor-rich-text " + tag + ".uagb-team__title"] = {
		"font-size": titleFontSize + "px",
		"color": titleColor,
		"margin-bottom": titleSpace + "px",
	}

	var styling_css = ""

	for( var i in selectors ) {

		styling_css += `#uagb-team-${ props.clientId }`

		styling_css += i + " { "

		var sel = selectors[i]
		var css = ""

		for( var j in sel ) {

			css += j + ": " + sel[j] + ";"
		}

		styling_css += css + " } "
	}

	return styling_css
}

export default styling
