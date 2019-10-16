<?php
/**
 * UAGB Helper.
 *
 * @package UAGB
 */

if ( ! class_exists( 'UAGB_Batch' ) ) {

	/**
	 * Class UAGB_Batch.
	 */
	final class UAGB_Batch {


		/**
		 * Member Variable
		 *
		 * @since 0.0.1
		 * @var instance
		 */
		private static $instance;

		/**
		 * Member Variable
		 *
		 * @since 0.0.1
		 * @var instance
		 */
		public static $block_list;

		/**
		 * Current Block List
		 *
		 * @since 1.13.4
		 * @var current_block_list
		 */
		public static $current_block_list = array();

		/**
		 * UAG Block Flag
		 *
		 * @since 1.13.4
		 * @var uag_flag
		 */
		public static $uag_flag = false;

		/**
		 * Enque Style and Script Variable
		 *
		 * @since x.x.x
		 * @var instance
		 */
		public static $css_file_handler;

		/**
		 * Stylesheet
		 *
		 * @since 1.13.4
		 * @var stylesheet
		 */
		public static $stylesheet;

		/**
		 * Script
		 *
		 * @since 1.13.4
		 * @var script
		 */
		public static $script;

		/**
		 * Store Json variable
		 *
		 * @since 1.8.1
		 * @var instance
		 */
		public static $icon_json;

		/**
		 * Page Blocks Variable
		 *
		 * @since 1.6.0
		 * @var instance
		 */
		public static $page_blocks;

		/**
		 * Google fonts to enqueue
		 *
		 * @var array
		 */
		public static $gfonts = array();

		/**
		 *  Initiator
		 *
		 * @since 0.0.1
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {

			self::$block_list = UAGB_Config::get_block_attributes();

			// add_action( 'wp_enqueue_scripts', array( $this, 'block_assets' ) );
			// add_action( 'wp', array( $this, 'generate_stylesheet' ), 99 );
			// add_action( 'wp', array( $this, 'generate_script' ), 100 );
			// add_action( 'wp_head', array( $this, 'frontend_gfonts' ), 120 );
			// add_action( 'wp_head', array( $this, 'print_stylesheet' ), 80 );
			add_action( 'wp_footer', array( $this, 'print_script' ), 1000 );
		}

		/**
		 * Enqueue Gutenberg block assets for both frontend + backend.
		 *
		 * @since 1.13.4
		 */
		public function block_assets() {

			$block_list_for_assets = self::$current_block_list;

			$blocks = UAGB_Config::get_block_attributes();

			foreach ( $block_list_for_assets as $key => $curr_block_name ) {

				$js_assets = ( isset( $blocks[ $curr_block_name ]['js_assets'] ) ) ? $blocks[ $curr_block_name ]['js_assets'] : array();

				$css_assets = ( isset( $blocks[ $curr_block_name ]['css_assets'] ) ) ? $blocks[ $curr_block_name ]['css_assets'] : array();

				foreach ( $js_assets as $asset_handle => $val ) {
					// Scripts.
					wp_enqueue_script( $val );
				}

				foreach ( $css_assets as $asset_handle => $val ) {
					// Styles.
					wp_enqueue_style( $val );
				}
			}

			$file_handler = self::$css_file_handler;

			if ( isset( $file_handler['css_url'] ) ) {
				wp_enqueue_style( 'uag-style', $file_handler['css_url'], array(), '', 'all' );
			}
			if ( isset( $file_handler['js_url'] ) ) {
				wp_enqueue_script( 'uag-script', $file_handler['js_url'], array(), UAGB_VER, true );
			}

		}

		/**
		 * Print the Script in footer.
		 */
		public function print_script() {
			$args = array(
			    'post_type' => 'page',
			    'posts_per_page'  => -1,
				'post_status' => 'publish',
			);
			 
			// Custom query.
			$query = new WP_Query( $args );

			// Check that we have query results.
			if ( $query->have_posts() ) {

				// Start looping over the query results.
				while ( $query->have_posts() ) {

					$query->the_post();
					$id = get_the_ID();

					$this->_generate_stylesheet( $query->post );
					// Contents of the queried post results go here.
				}

			}

			// Restore original post data.
			wp_reset_postdata();
			echo '<xmp>stdata('; print_r( self::$stylesheet ); echo '</xmp>';
			echo '<xmp>'; print_r( self::$stylesheet ); echo '</xmp>'; print_r( self::$current_block_list ); echo '</xmp>';

			// if ( is_null( self::$script ) || '' === self::$script ) {
			// 	return;
			// }

			// self::file_write( self::$script, 'js' );

			// ob_start();
			?>
			<!-- <script type="text/javascript" id="uagb-script-frontend">( function( $ ) { <?php //echo self::$script; ?> })(jQuery) </script> -->
			<?php
			// ob_end_flush();
		}

		/**
		 * Generates CSS recurrsively.
		 *
		 * @param object $block The block object.
		 * @since 0.0.1
		 */
		public function get_block_css( $block ) {

            // @codingStandardsIgnoreStart

            $block = ( array ) $block;

            $name = $block['blockName'];
            $css  = '';
            $block_id = '';

            if( ! isset( $name ) ) {
                return;
            }

            if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
                $blockattr = $block['attrs'];
                if ( isset( $blockattr['block_id'] ) ) {
                    $block_id = $blockattr['block_id'];
                }
            }

            self::$current_block_list[] = $name;

			if ( strpos( $name, 'uagb/' ) !== false ) {
				self::$uag_flag = true;
			}

            switch ( $name ) {
                case 'uagb/section':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                case 'uagb/advanced-heading':
                	$matches = array();
					preg_match_all('#<div class="wp-block-uagb-advanced-heading[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                case 'uagb/info-box':
                	$matches = array();
					preg_match_all('#<div class="uagb-infobox__outer-wrap[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
					$css .= "blockid - " . $block_id . "<br/>";
                    break;

                /*case 'uagb/buttons':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                case 'uagb/blockquote':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

				case 'uagb/testimonial':
					$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
					$css .= "blockid - " . $block_id . "<br/>";
					break;*/

                case 'uagb/team':
                	$matches = array();
					preg_match_all('#<div class="wp-block-uagb-team[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    break;

                /*case 'uagb/social-share':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                case 'uagb/content-timeline':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

				case 'uagb/restaurant-menu':
					$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
					$css .= "blockid - " . $block_id . "<br/>";
					break;

                case 'uagb/call-to-action':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                case 'uagb/post-timeline':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;*/

                case 'uagb/icon-list':
                	$matches = array();
					preg_match_all('#<div class="wp-block-uagb-icon-list[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                /*case 'uagb/post-grid':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                case 'uagb/post-carousel':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                case 'uagb/post-masonry':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;*/

                case 'uagb/columns':
                	$matches = array();
					preg_match_all('#<div class="wp-block-uagb-columns[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                case 'uagb/column':
                	$matches = array();
					preg_match_all('#<div class="wp-block-uagb-column [^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
                    $css .= "blockid - " . $block_id . "<br/>";
                    break;

                /*case 'uagb/cf7-styler':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
					$css .= "blockid - " . $block_id . "<br/>";
					break;

				case 'uagb/marketing-button':
					$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
					$css .= "blockid - " . $block_id . "<br/>";
					break;

                case 'uagb/gf-styler':
                	$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
					$css .= "blockid - " . $block_id . "<br/>";
					break;

				case 'uagb/table-of-contents':
					$matches = array();
					preg_match_all('#<section class="wp-block-uagb-section[^>]*#', $block['innerHTML'], $matches);

					echo '<xmp>'; print_r($matches); echo '</xmp>';
					$css .= "blockid - " . $block_id . "<br/>";
					break;*/

                default:
                    // Nothing to do here.
                    break;
            }

            if ( isset( $block['innerBlocks'] ) ) {
                foreach ( $block['innerBlocks'] as $j => $inner_block ) {
                    if ( 'core/block' == $inner_block['blockName'] ) {
                        $id = ( isset( $inner_block['attrs']['ref'] ) ) ? $inner_block['attrs']['ref'] : 0;

                        if ( $id ) {
                            $content = get_post_field( 'post_content', $id );

                            $reusable_blocks = $this->parse( $content );

                            self::$stylesheet .= $this->get_stylesheet( $reusable_blocks );
                        }
                    } else {
                    	// Get CSS for the Block.
                        $css .= $this->get_block_css( $inner_block );
                    }
                }
            }

            self::$current_block_list = array_unique( self::$current_block_list );

            return $css;

            // @codingStandardsIgnoreEnd
		}

		/**
		 * Generates stylesheet in loop.
		 *
		 * @param object $this_post Current Post Object.
		 * @since 1.7.0
		 */
		public function _generate_stylesheet( $this_post ) {

			if ( ! is_object( $this_post ) ) {
				return;
			}

			if ( ! isset( $this_post->ID ) ) {
				return;
			}

			if ( has_blocks( $this_post->ID ) ) {

				if ( isset( $this_post->post_content ) ) {

					$content = get_post_field( 'post_content', $this_post->ID );

					$blocks            = $this->parse( $content );
					self::$page_blocks = $blocks;

					if ( ! is_array( $blocks ) || empty( $blocks ) ) {
						return;
					}

					self::$stylesheet .= $this->get_stylesheet( $blocks );
				}
			}
		}

		/**
		 * Parse Guten Block.
		 *
		 * @param string $content the content string.
		 * @since 1.1.0
		 */
		public function parse( $content ) {

			global $wp_version;

			return ( version_compare( $wp_version, '5', '>=' ) ) ? parse_blocks( $content ) : gutenberg_parse_blocks( $content );
		}

		/**
		 * Generates stylesheet for reusable blocks.
		 *
		 * @param array $blocks Blocks array.
		 * @since 1.1.0
		 */
		public function get_stylesheet( $blocks ) {

			$desktop = '';
			$tablet  = '';
			$mobile  = '';
			$css = '';

			$tab_styling_css = '';
			$mob_styling_css = '';

			foreach ( $blocks as $i => $block ) {

				if ( is_array( $block ) ) {

					if ( '' === $block['blockName'] ) {
						continue;
					}
					if ( 'core/block' === $block['blockName'] ) {
						$id = ( isset( $block['attrs']['ref'] ) ) ? $block['attrs']['ref'] : 0;

						if ( $id ) {
							$content = get_post_field( 'post_content', $id );

							$reusable_blocks = $this->parse( $content );

							self::$stylesheet .= $this->get_stylesheet( $reusable_blocks );

						}
					} else {
						// Get CSS for the Block.
						$css .= $this->get_block_css( $block );
					}
				}
			}

			return $css;
		}
	}

	/**
	 *  Prepare if class 'UAGB_Batch' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Batch::get_instance();
}
