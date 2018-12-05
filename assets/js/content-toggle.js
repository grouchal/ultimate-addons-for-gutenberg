/**
 * Common js file for Content Toggle.
 */
( function( $ ) {

	// Listen for events.
	window.addEventListener("load", uagbContentToggleInit);
	window.addEventListener("resize", uagbContentToggleInit);

	jQuery(window).on("uagbToggleContent", function(e,data) {
	    uagbContentToggleInit();
	});

	// Callback function for all event listeners.
	function uagbContentToggleInit() {

		var wrapper            = $(".uagb-content-toggle__outer-wrap")

		wrapper.each(function() {
			var $scope 			= jQuery(this),
				$this           = $scope.find( '.uagb-ctgl__wrapper' ),
				rbs_section_1   = $scope.find( ".uagb-ctgl__section-1" ),
				rbs_section_2   = $scope.find( ".uagb-ctgl__section-2" ),
				main_btn        = $scope.find( ".uagb-ctgl__main-btn" ),
				switch_type     = main_btn.attr( 'data-switch-type' ),
				rbs_label_1   	= $scope.find( ".uael-sec-1" ),
				rbs_label_2   	= $scope.find( ".uael-sec-2" ),
				current_class 	= '';

			switch ( switch_type ) {
				case 'round_1':
					current_class = '.uagb-ctgl__switch-round-1';
					break;
				case 'round_2':
					current_class = '.uagb-ctgl__switch-round-2';
					break;
				case 'rectangle':
					current_class = '.uagb-ctgl__switch-rectangle';
					break;
				case 'label_box':
					current_class = '.uagb-ctgl__switch-label-box';
					break;
				default:
					current_class = 'No Class Selected';
					break;
			}

			var rbs_switch      = $scope.find( current_class );

			if( rbs_switch.is( ':checked' ) ) {
				rbs_section_1.hide();
				rbs_section_2.show();
			} else {
				rbs_section_1.show();
				rbs_section_2.hide();
			}

			rbs_switch.on('click', function(e){		        
		        rbs_section_1.toggle();
		        rbs_section_2.toggle();	
		    });

		})	
    		
	}

} )( jQuery )
