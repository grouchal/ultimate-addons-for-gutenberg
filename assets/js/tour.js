( function( $ ) {

	Tour = {

		init: function() {

			// $( document ).delegate( ".uagb-activate-widget", "click", Tour._activate_widget )
			// $( document ).delegate( ".uagb-deactivate-widget", "click", Tour._deactivate_widget )

			$( '.trigger-tooltip' ).tooltipster({
	        	theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
	        	maxWidth: '250',
	        	side : 'top',
	        	trigger : 'hover',
	        	delay : 300,
	        	animation : 'fade'
	        	zIndex : 99,
	        	interactive : true,
	        	animationDuration : 350,
	        });

		},

		/**
		 * Activate All Widgets.
		 */
		_bulk_activate_widgets: function( e ) {
			var button = $( this )

			var data = {
				action: "uagb_bulk_activate_widgets",
				nonce: uagb.ajax_nonce,
			}

			if ( button.hasClass( "updating-message" ) ) {
				return
			}

			$( button ).addClass("updating-message")

			e.preventDefault()
		},

	}

	$( document ).ready(function() {
		Tour.init()
	})


} )( jQuery )
