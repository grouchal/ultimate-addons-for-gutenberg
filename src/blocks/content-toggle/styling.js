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
		" .uagb-ctgl__main-btn": {
			"font-size": switchSize + "px",
		},
		" span.uagb-ctgl__slider.uagb-ctgl__round": {
			"background-color": color1,
		},
		" .uagb-ctgl__switch:checked + .uagb-ctgl__slider": {
			"background-color": color2,
		},
		" .uagb-ctgl__slider.uagb-ctgl__round:before": {
			"background-color": controllerColor,
		},
		" .uagb-ctgl_toggle_switch input[type='checkbox'] + label:after": {
			"background-color": controllerColor,
			"border": "0.3em solid "+ color1
		},
		" .uagb-ctgl_toggle_switch input[type='checkbox'] + label:before": {
			"background-color": color1,
		},
		" .uagb-ctgl_toggle_switch input[type='checkbox']:checked + label:before": {
			"background-color": color2,
		},
		" .uagb-ctgl_toggle_switch .uagb-ctgl__switch-round-2[type='checkbox']:checked + label:after": {
			"border-color": color2,
		},
		" .uagb-ctgl__sec-heading-1": {
			"color": headingColor_1 ,
			"font-size": headingFontSize_1 + "px ",
		},
		" .uagb-ctgl__sec-heading-2": {
			"color": headingColor_2 ,
			"font-size": headingFontSize_2 + "px ",
		},
		" .uagb-ctgl__content-1": {
			"color": contentColor_1 ,
			"font-size": contentFontSize_1 + "px ",
		},
		" .uagb-ctgl__content-2": {
			"color": contentColor_2 ,
			"font-size": contentFontSize_2 + "px ",
		},	
		" .uagb-ctgl__toggle": {
			"background-color": headingBgColor ,
			"border-style": headingBorderType,
			"border-width": headingBorderWidth + "px ",
			"border-color": headingBorderColor ,
			"border-radius": headingBorderRadius + "px ",
			"margin-bottom": contentHeadSpace + "px",
			"justify-content": align,
		},	
		" .uagb-ctgl-toggle-sections": {
			"background-color": contentBgColor ,
			"border-style": contentBorderType,
			"border-width": contentBorderWidth + "px ",
			"border-color": contentBorderColor ,
			"border-radius": contentBorderRadius + "px ",
		},	
		" .uagb-ctgl__sec-1":{
			"margin-right": btnHeadSpaceWidth + "% ",
		},	
		" .uagb-ctgl__sec-2":{
			"margin-left": btnHeadSpaceWidth + "% ",
		}
	}


	var styling_css = ""

	for( var i in selectors ) {

		styling_css += `.block-editor-page #wpwrap #uagb-content-toggle-${ props.clientId }`

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
