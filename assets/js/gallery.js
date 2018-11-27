/**
 * Image Gallery
 */
( function( $ ) {

	// Listen for events.
	window.addEventListener( "load", uagbGallery )

	// Callback function for all event listeners.
	function uagbGallery() {

		var gallery = $( ".uagb-gallery__outer-wrap" )

		gallery.each(function() {

			if ( $( this ).hasClass( "uagb-gallery__layout-justified" ) ) {

				$( this ).justifiedGallery({
					rowHeight : 100,
					lastRow : "nojustify",
					selector : "div",
					waitThumbnailsLoad : true,
				})
			}

		})
	}

} )( jQuery )
