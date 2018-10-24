/**
 * BLOCK: advanced-heading
 */

// Import block dependencies and components.
import classnames from "classnames"

// Import icon.
import AuthorName from "./components/AuthorName";
import Designation from "./components/Designation";
import Description from "./components/Description";
import PositionClasses from "./classes";
import TestimonialStyle from "./inline-styles";
import TestimonialImage from "./components/TestimonialImage";
import edit from "./edit";
import attributes from "./attributes";
import "./editor.scss"
import "./style.scss"
const { __ } = wp.i18n

// Import registerBlockType() from wp.blocks
const {
	registerBlockType,
} = wp.blocks

const {
	RichText
} = wp.editor

const {
	compose
} = wp.compose;

const {
	withViewportMatch
} = wp.viewport

// Extend component
const { Fragment } = wp.element

const el = wp.element.createElement;

//Icon
const iconEl = el('svg', { width: 20, height: 20 },
  el('path', { d: "M14.064 7.039c0-1.017-0.827-1.843-1.843-1.843-1.016 0-1.842 0.826-1.842 1.843 0 1.016 0.826 1.843 1.842 1.843 1.017 0 1.843-0.827 1.843-1.843zM11.561 7.039c0-0.364 0.297-0.661 0.661-0.661 0.365 0 0.662 0.297 0.662 0.661s-0.297 0.661-0.662 0.661c-0.363 0-0.661-0.297-0.661-0.661z" } ),
  el('path', { d: "M18.818 13.372h-0.598v-1.779h-0.369v-9.067c0-0.709-0.576-1.285-1.285-1.285h-15.28c-0.71 0-1.286 0.577-1.286 1.285v13.429c0 0.709 0.577 1.285 1.286 1.285h13.323v1.522h3.611v-1.779h1.779v-3.609h-1.182zM12.83 16.057h-11.544c-0.058 0-0.103-0.047-0.103-0.103v-13.429c0-0.057 0.046-0.103 0.103-0.103h15.281c0.057 0 0.103 0.046 0.103 0.103v9.068h-1.043v-8.153h-13.418v8.97h12.401v0.963h-1.779v2.686zM9.512 7.475l-1.154 1.802-1.963-3.058-3.004 4.684v-6.281h11.055v6.603h-2.529l-2.404-3.75zM10.432 11.1h-1.84l0.92-1.436 0.92 1.436zM8.121 11.1h-3.453l1.727-2.693 1.727 2.693zM18.818 15.799h-1.779v1.779h-1.246v-1.779h-1.779v-1.246h1.779v-1.779h1.246v1.779h1.779v1.246z" } )
);

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
registerBlockType( "uagb/testimonial", {

	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( "UAGB - Testimonial" ), // Block title.
	description: __( "Add Testimonial." ), // Block description.
	icon: iconEl, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	keywords: [
		__( "testimonial" ),
		__( "uagb" ),
	],
	category: "formatting",

	attributes,
	edit,
	save: function( props ) {
		const {
			block_id,
			className
		} = props.attributes;

		const my_block_id = 'uagb-'+ block_id;
		var ClassNamesId    =  ( typeof className != "undefined" ) ? className : '';

		ClassNamesId = ClassNamesId +' '+ my_block_id;

		var back_style = TestimonialStyle( props );

		// Get icon/Image components.
		let is_image = <TestimonialImage attributes={ props.attributes } />;
		

		// Get description.
		const desc = (
			<Fragment>				
				<div className = "uagb-testimonial-text-wrap">
					<Description attributes={props.attributes} setAttributes = "not_set"/>
				</div>
			</Fragment>
		);

		// Get Title and AuthorName components.
		const title_text = (
			<Fragment>
				<div className = "uagb-testimonial-title-wrap">
					<AuthorName attributes={ props.attributes } setAttributes = "not_set"/>
					<Designation attributes={ props.attributes} setAttributes = "not_set"/>
				</div>
			</Fragment>
		);

		//return null;

		return (
			<Fragment>
				<div className={ ClassNamesId }>
					<div className = { classnames(
						"uagb-testinomial-wrapper",
						...PositionClasses(  props.attributes  ),
					) }>
						<div className = "uagb-testimonial-content">
							{ desc }
							{ is_image }
							{ title_text }												
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
} )
