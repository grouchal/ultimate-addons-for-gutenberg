<?php
/**
 * UAGB Admin.
 *
 * @package UAGB
 */

if ( ! class_exists( 'UAGB_Admin' ) ) {

	/**
	 * Class UAGB_Admin.
	 */
	final class UAGB_Admin {

		/**
		 * Calls on initialization
		 *
		 * @since 0.0.1
		 */
		public static function init() {

			self::initialize_ajax();
			self::initialise_plugin();
			add_action( 'after_setup_theme', __CLASS__ . '::init_hooks' );
			// Activation hook.
			add_action( 'admin_init', __CLASS__ . '::activation_redirect' );

			add_action( 'admin_init', __CLASS__ . '::demo_page' );

			add_action('wp_footer', __CLASS__ . '::admin_footer');
		}

		/**
		 * Demo Tour HTML in footer
		 */
		public static function admin_footer() {
			//echo '<div class="uagb-tour">';
				ob_start();
				?>
				<div class="tour-pin-points">
					<span class="tooltip">
						<span class="tooltip-pin-content" id="tooltip-id-1" data-tour="1" data-tooltip-content="#tooltip-content-1">
							<i class="fa fa-dot-circle-o"></i>
						</span>
					</span>

					<span class="tooltip">
						<span class="tooltip-pin-content" id="tooltip-id-2" data-tour="2" data-tooltip-content="#tooltip-content-2">
							<i class="fa fa-dot-circle-o"></i>
						</span>
					</span>

					<span class="tooltip">
						<span class="tooltip-pin-content" id="tooltip-id-3" data-tour="3" data-tooltip-content="#tooltip-content-3">
							<i class="fa fa-dot-circle-o"></i>
						</span>
					</span>
				</div>
				<!-- <span class="trigger-tooltip tooltip" data-tooltip-content="#tooltip_content">This span has a tooltip with HTML when you hover over it!</span>

				<div class="tooltip_templates">
					<span id="tooltip_content">
						<img src="http://localhost/projects/local/wp-content/plugins/ultimate-addons-for-gutenberg/admin/assets/images/welcome-screen-astra.jpg" /> <strong>This is the content of my tooltip!</strong>
					</span>
				</div> -->
				<?php
			// 	echo '<span><span class="trigger-tooltip">1</span><p data-key="1">This is a tooltip 1</p></span>';
			// 	echo '<span><span class="trigger-tooltip">2</span><p data-key="2">This is a tooltip 2</p></span>';
			// 	echo '<span><span class="trigger-tooltip">3</span><p data-key="3">This is a tooltip 3</p></span>';
			// 	echo '<span><span class="trigger-tooltip">4</span><p data-key="4">This is a tooltip 4</p></span>';
			// 	echo '<span><span class="trigger-tooltip">5</span><p data-key="5">This is a tooltip 5</p></span>';
			// 	echo '<span><span class="trigger-tooltip">6</span><p data-key="6">This is a tooltip 6</p></span>';
			// echo '</div>';
				echo ob_get_clean();

			//echo '<script>jQuery(document).ready(function() { jQuery(\'.trigger-tooltip\').tooltipster(); });</script>';
		}

		/**
		 * Activation Reset
		 */
		public static function demo_page() {

			global $pagenow;

			if ( isset( $_GET['action'] ) && 'uag-demo' === $_GET['action'] ) {
				add_action( 'admin_enqueue_scripts', __CLASS__ . '::editor_scripts_and_styles' );
			}
		}

		/**
		 * Prepares server-registered blocks for JavaScript, returning an associative
		 * array of registered block data keyed by block name. Data includes properties
		 * of a block relevant for client registration.
		 *
		 * @return array An associative array of registered block data.
		 */
		public static function prepare_blocks_for_js() {
			$block_registry = WP_Block_Type_Registry::get_instance();
			$blocks         = array();
			$keys_to_pick   = array( 'title', 'description', 'icon', 'category', 'keywords', 'supports', 'attributes' );

			foreach ( $block_registry->get_all_registered() as $block_name => $block_type ) {
				foreach ( $keys_to_pick as $key ) {
					if ( ! isset( $block_type->{ $key } ) ) {
						continue;
					}

					if ( ! isset( $blocks[ $block_name ] ) ) {
						$blocks[ $block_name ] = array();
					}

					$blocks[ $block_name ][ $key ] = $block_type->{ $key };
				}
			}

			return $blocks;
		}

		/**
		 * Scripts & Styles.
		 *
		 * Enqueues the needed scripts and styles when visiting the top-level page of
		 * the Gutenberg editor.
		 *
		 * @since 0.1.0
		 *
		 * @param string $hook Screen name.
		 */
		public static function editor_scripts_and_styles( $hook ) {

			$is_demo = ( isset( $_GET['action'] ) && 'uag-demo' === $_GET['action'] );

			global $wp_scripts, $wp_meta_boxes;

			// Add "wp-hooks" as dependency of "heartbeat".
			$heartbeat_script = $wp_scripts->query( 'heartbeat', 'registered' );
			if ( $heartbeat_script && ! in_array( 'wp-hooks', $heartbeat_script->deps ) ) {
				$heartbeat_script->deps[] = 'wp-hooks';
			}

			// Enqueue heartbeat separately as an "optional" dependency of the editor.
			// Heartbeat is used for automatic nonce refreshing, but some hosts choose
			// to disable it outright.
			wp_enqueue_script( 'heartbeat' );

			// Transform a "heartbeat-tick" jQuery event into "heartbeat.tick" hook action.
			// This removes the need of using jQuery for listening to the event.
			wp_add_inline_script(
				'heartbeat',
				'jQuery( document ).on( "heartbeat-tick", function ( event, response ) { wp.hooks.doAction( "heartbeat.tick", response ) } );',
				'after'
			);

			// Ignore Classic Editor's `rich_editing` user option, aka "Disable visual
			// editor". Forcing this to be true guarantees that TinyMCE and its plugins
			// are available in Gutenberg. Fixes
			// https://github.com/WordPress/gutenberg/issues/5667.
			$user_can_richedit = user_can_richedit();
			add_filter( 'user_can_richedit', '__return_true' );

			wp_enqueue_script( 'wp-edit-post' );
			wp_enqueue_script( 'wp-format-library' );
			wp_enqueue_style( 'wp-format-library' );

			global $post;

			// Set initial title to empty string for auto draft for duration of edit.
			// Otherwise, title defaults to and displays as "Auto Draft".
			$is_new_post = 'auto-draft' === $post->post_status;

			// Set the post type name.
			$post_type        = get_post_type( $post );
			$post_type_object = get_post_type_object( $post_type );
			$rest_base        = ! empty( $post_type_object->rest_base ) ? $post_type_object->rest_base : $post_type_object->name;

			$preload_paths = array(
				'/',
				'/wp/v2/types?context=edit',
				'/wp/v2/taxonomies?per_page=-1&context=edit',
				'/wp/v2/themes?status=active',
				sprintf( '/wp/v2/%s/%s?context=edit', $rest_base, $post->ID ),
				sprintf( '/wp/v2/types/%s?context=edit', $post_type ),
				sprintf( '/wp/v2/users/me?post_type=%s&context=edit', $post_type ),
				array( '/wp/v2/media', 'OPTIONS' ),
			);

			/**
			 * Preload common data by specifying an array of REST API paths that will be preloaded.
			 *
			 * Filters the array of paths that will be preloaded.
			 *
			 * @param array $preload_paths Array of paths to preload
			 * @param object $post         The post resource data.
			 */
			$preload_paths = apply_filters( 'block_editor_preload_paths', $preload_paths, $post );

			// Ensure the global $post remains the same after
			// API data is preloaded. Because API preloading
			// can call the_content and other filters, callbacks
			// can unexpectedly modify $post resulting in issues
			// like https://github.com/WordPress/gutenberg/issues/7468.
			$backup_global_post = $post;

			$preload_data = array_reduce(
				$preload_paths,
				'rest_preload_api_request',
				array()
			);

			// Restore the global $post as it was before API preloading.
			$post = $backup_global_post;

			wp_add_inline_script(
				'wp-api-fetch',
				sprintf( 'wp.apiFetch.use( wp.apiFetch.createPreloadingMiddleware( %s ) );', wp_json_encode( $preload_data ) ),
				'after'
			);

			wp_add_inline_script(
				'wp-blocks',
				sprintf( 'wp.blocks.setCategories( %s );', wp_json_encode( get_block_categories( $post ) ) ),
				'after'
			);

			// Assign initial edits, if applicable. These are not initially assigned
			// to the persisted post, but should be included in its save payload.
			if ( $is_demo ) {
				// Prepopulate with some test content in demo.
				ob_start();
				include( UAGB_DIR . 'admin/uagb-demo.php' );
				$demo_content = ob_get_clean();

				$initial_edits = array(
					'title'   => __( 'Welcome to the Ultimate Addons for Gutenberg', 'ultimate-addons-for-gutenberg' ),
					'content' => $demo_content,
				);
			} elseif ( $is_new_post ) {
				// Override "(Auto Draft)" new post default title with empty string,
				// or filtered value.
				$initial_edits = array(
					'title'   => $post->post_title,
					'content' => $post->post_content,
					'excerpt' => $post->post_excerpt,
				);
			} else {
				$initial_edits = null;
			}

			// gutenberg_load_locale_data();
			// Preload server-registered block schemas.
			wp_add_inline_script(
				'wp-blocks',
				'wp.blocks.unstable__bootstrapServerSideBlockDefinitions(' . json_encode( self::prepare_blocks_for_js() ) . ');'
			);

			// Get admin url for handling meta boxes.
			$meta_box_url = admin_url( 'post.php' );
			$meta_box_url = add_query_arg(
				array(
					'post'           => $post->ID,
					'action'         => 'edit',
					'classic-editor' => true,
					'meta_box'       => true,
				),
				$meta_box_url
			);
			wp_localize_script( 'wp-editor', '_wpMetaBoxUrl', $meta_box_url );

			// Initialize the editor.
			$theme_support = get_theme_support( 'gutenberg' );
			$align_wide    = get_theme_support( 'align-wide' );
			$color_palette = current( (array) get_theme_support( 'editor-color-palette' ) );
			$font_sizes    = current( (array) get_theme_support( 'editor-font-sizes' ) );

			/**
			 * Filters the allowed block types for the editor, defaulting to true (all
			 * block types supported).
			 *
			 * @param bool|array $allowed_block_types Array of block type slugs, or
			 *                                        boolean to enable/disable all.
			 * @param object $post                    The post resource data.
			 */
			$allowed_block_types = apply_filters( 'allowed_block_types', true, $post );

			// Get all available templates for the post/page attributes meta-box.
			// The "Default template" array element should only be added if the array is
			// not empty so we do not trigger the template select element without any options
			// besides the default value.
			$available_templates = wp_get_theme()->get_page_templates( get_post( $post->ID ) );
			$available_templates = ! empty( $available_templates ) ? array_merge(
				array(
					'' => apply_filters( 'default_page_template_title', __( 'Default template', 'ultimate-addons-for-gutenberg' ), 'rest-api' ),
				),
				$available_templates
			) : $available_templates;

			// Media settings.
			$max_upload_size = wp_max_upload_size();
			if ( ! $max_upload_size ) {
				$max_upload_size = 0;
			}

			// Editor Styles.
			global $editor_styles;
			$styles = array();

			/* Translators: Use this to specify the CSS font family for the default font */
			$locale_font_family = esc_html_x( 'Noto Serif', 'CSS Font Family for Editor Font', 'ultimate-addons-for-gutenberg' );
			$styles[]           = array(
				'css' => "body { font-family: '$locale_font_family' }",
			);

			if ( $editor_styles && current_theme_supports( 'editor-styles' ) ) {
				foreach ( $editor_styles as $style ) {
					if ( filter_var( $style, FILTER_VALIDATE_URL ) ) {
						$styles[] = array(
							'css' => file_get_contents( $style ),
						);
					} else {
						$file = get_theme_file_path( $style );
						if ( file_exists( $file ) ) {
							$styles[] = array(
								'css'     => file_get_contents( $file ),
								'baseURL' => get_theme_file_uri( $style ),
							);
						}
					}
				}
			}

			// Lock settings.
			$user_id = wp_check_post_lock( $post->ID );
			if ( $user_id ) {
				/**
				 * Filters whether to show the post locked dialog.
				 *
				 * Returning a falsey value to the filter will short-circuit displaying the dialog.
				 *
				 * @since 3.6.0
				 *
				 * @param bool         $display Whether to display the dialog. Default true.
				 * @param WP_Post      $post    Post object.
				 * @param WP_User|bool $user    The user id currently editing the post.
				 */
				if ( apply_filters( 'show_post_locked_dialog', true, $post, $user_id ) ) {
					$locked = true;
				}

				$user_details = null;
				if ( $locked ) {
					$user         = get_userdata( $user_id );
					$user_details = array(
						'name' => $user->display_name,
					);
					$avatar       = get_avatar( $user_id, 64 );
					if ( $avatar ) {
						if ( preg_match( "|src='([^']+)'|", $avatar, $matches ) ) {
							$user_details['avatar'] = $matches[1];
						}
					}
				}

				$lock_details = array(
					'isLocked' => $locked,
					'user'     => $user_details,
				);
			} else {

				// Lock the post.
				$active_post_lock = wp_set_post_lock( $post->ID );
				$lock_details     = array(
					'isLocked'       => false,
					'activePostLock' => esc_attr( implode( ':', $active_post_lock ) ),
				);
			}

			$editor_settings = array(
				'alignWide'              => $align_wide || ! empty( $theme_support[0]['wide-images'] ), // Backcompat. Use `align-wide` outside of `gutenberg` array.
				'availableTemplates'     => $available_templates,
				'allowedBlockTypes'      => $allowed_block_types,
				'disableCustomColors'    => get_theme_support( 'disable-custom-colors' ),
				'disableCustomFontSizes' => get_theme_support( 'disable-custom-font-sizes' ),
				'disablePostFormats'     => ! current_theme_supports( 'post-formats' ),
				'titlePlaceholder'       => apply_filters( 'enter_title_here', __( 'Add title', 'ultimate-addons-for-gutenberg' ), $post ),
				'bodyPlaceholder'        => apply_filters( 'write_your_story', __( 'Start writing or type / to choose a block', 'ultimate-addons-for-gutenberg' ), $post ),
				'isRTL'                  => is_rtl(),
				'autosaveInterval'       => 10,
				'maxUploadFileSize'      => $max_upload_size,
				'allowedMimeTypes'       => get_allowed_mime_types(),
				'styles'                 => $styles,
				'imageSizes'             => self::get_available_image_sizes(),
				'richEditingEnabled'     => $user_can_richedit,

				// Ideally, we'd remove this and rely on a REST API endpoint.
				'postLock'               => $lock_details,
				'postLockUtils'          => array(
					'nonce'       => wp_create_nonce( 'lock-post_' . $post->ID ),
					'unlockNonce' => wp_create_nonce( 'update-post_' . $post->ID ),
					'ajaxUrl'     => admin_url( 'admin-ajax.php' ),
				),

				// Whether or not to load the 'postcustom' meta box is stored as a user meta
				// field so that we're not always loading its assets.
				'enableCustomFields'     => (bool) get_user_meta( get_current_user_id(), 'enable_custom_fields', true ),
			);

			$post_autosave = self::get_autosave_newer_than_post_save( $post );
			if ( $post_autosave ) {
				$editor_settings['autosave'] = array(
					'editLink' => add_query_arg( 'gutenberg', true, get_edit_post_link( $post_autosave->ID ) ),
				);
			}

			if ( false !== $color_palette ) {
				$editor_settings['colors'] = $color_palette;
			}

			if ( ! empty( $font_sizes ) ) {
				$editor_settings['fontSizes'] = $font_sizes;
			}

			if ( ! empty( $post_type_object->template ) ) {
				$editor_settings['template']     = $post_type_object->template;
				$editor_settings['templateLock'] = ! empty( $post_type_object->template_lock ) ? $post_type_object->template_lock : false;
			}

			$current_screen  = get_current_screen();
			$core_meta_boxes = array();

			// Make sure the current screen is set as well as the normal core metaboxes.
			if ( isset( $current_screen->id ) && isset( $wp_meta_boxes[ $current_screen->id ]['normal']['core'] ) ) {
				$core_meta_boxes = $wp_meta_boxes[ $current_screen->id ]['normal']['core'];
			}

			// Check if the Custom Fields meta box has been removed at some point.
			if ( ! isset( $core_meta_boxes['postcustom'] ) || ! $core_meta_boxes['postcustom'] ) {
				unset( $editor_settings['enableCustomFields'] );
			}

			/**
			 * Filters the settings to pass to the block editor.
			 *
			 * @since 3.7.0
			 *
			 * @param array   $editor_settings Default editor settings.
			 * @param WP_Post $post            Post being edited.
			 */
			$editor_settings = apply_filters( 'block_editor_settings', $editor_settings, $post );

			$init_script = <<<JS
	( function() {
		window._wpLoadGutenbergEditor = new Promise( function( resolve ) {
			wp.domReady( function() {
				resolve( wp.editPost.initializeEditor( 'editor', "%s", %d, %s, %s ) );
			} );
		} );
} )();
JS;

			$script = sprintf(
				$init_script,
				$post->post_type,
				$post->ID,
				wp_json_encode( $editor_settings ),
				wp_json_encode( $initial_edits )
			);
			wp_add_inline_script( 'wp-edit-post', $script );

			/**
			 * Scripts
			 */
			wp_enqueue_media(
				array(
					'post' => $post->ID,
				)
			);
			wp_enqueue_editor();

			/**
			 * Styles
			 */
			wp_enqueue_style( 'wp-edit-post' );

			/**
			 * Fires after block assets have been enqueued for the editing interface.
			 *
			 * Call `add_action` on any hook before 'admin_enqueue_scripts'.
			 *
			 * In the function call you supply, simply use `wp_enqueue_script` and
			 * `wp_enqueue_style` to add your functionality to the Gutenberg editor.
			 *
			 * @since 0.4.0
			 */
			do_action( 'enqueue_block_editor_assets' );
		}

		/**
		 * Retrieve The available image sizes for a post
		 *
		 * @return array
		 */
		public static function get_available_image_sizes() {
			$size_names = apply_filters(
				'image_size_names_choose',
				array(
					'thumbnail' => __( 'Thumbnail', 'gutenberg' ),
					'medium'    => __( 'Medium', 'gutenberg' ),
					'large'     => __( 'Large', 'gutenberg' ),
					'full'      => __( 'Full Size', 'gutenberg' ),
				)
			);

			$all_sizes = array();
			foreach ( $size_names as $size_slug => $size_name ) {
				$all_sizes[] = array(
					'slug' => $size_slug,
					'name' => $size_name,
				);
			}

			return $all_sizes;
		}

		/**
		 * Retrieve a stored autosave that is newer than the post save.
		 *
		 * Deletes autosaves that are older than the post save.
		 *
		 * @param  WP_Post $post Post object.
		 * @return WP_Post|boolean The post autosave. False if none found.
		 */
		public static function get_autosave_newer_than_post_save( $post ) {
			// Add autosave data if it is newer and changed.
			$autosave = wp_get_post_autosave( $post->ID );

			if ( ! $autosave ) {
				return false;
			}

			// Check if the autosave is newer than the current post.
			if (
				mysql2date( 'U', $autosave->post_modified_gmt, false ) > mysql2date( 'U', $post->post_modified_gmt, false )
			) {
				return $autosave;
			}

			// If the autosave isn't newer, remove it.
			wp_delete_post_revision( $autosave->ID );

			return false;
		}

		/**
		 * Activation Reset
		 */
		public static function activation_redirect() {
			if ( get_option( '__uagb_do_redirect' ) ) {
				update_option( '__uagb_do_redirect', false );
				if ( ! is_multisite() ) {
					exit( wp_redirect( admin_url( 'options-general.php?page=' . UAGB_SLUG ) ) );
				}
			}
		}

		/**
		 * Adds the admin menu and enqueues CSS/JS if we are on
		 * the builder admin settings page.
		 *
		 * @since 0.0.1
		 * @return void
		 */
		static public function init_hooks() {
			if ( ! is_admin() ) {
				return;
			}

			// Add UAGB menu option to admin.
			add_action( 'network_admin_menu', __CLASS__ . '::menu' );

			add_action( 'admin_menu', __CLASS__ . '::menu' );

			add_action( 'uagb_render_admin_content', __CLASS__ . '::render_content' );

			add_action( 'admin_notices', __CLASS__ . '::register_notices' );

			add_filter( 'wp_kses_allowed_html', __CLASS__ . '::add_data_attributes', 10, 2 );

			add_action( 'admin_enqueue_scripts', __CLASS__ . '::notice_styles_scripts' );

			add_action( 'wp_ajax_uag-theme-activate', __CLASS__ . '::theme_activate' );

			// Enqueue admin scripts.
			if ( isset( $_REQUEST['page'] ) && UAGB_SLUG == $_REQUEST['page'] ) {

				add_action( 'admin_enqueue_scripts', __CLASS__ . '::styles_scripts' );

				self::save_settings();
			}
		}

		/**
		 * Filters and Returns a list of allowed tags and attributes for a given context.
		 *
		 * @param Array  $allowedposttags Array of allowed tags.
		 * @param String $context Context type (explicit).
		 * @since 1.8.0
		 * @return Array
		 */
		public static function add_data_attributes( $allowedposttags, $context ) {
			$allowedposttags['a']['data-repeat-notice-after'] = true;

			return $allowedposttags;
		}

		/**
		 * Ask Plugin Rating
		 *
		 * @since 1.8.0
		 */
		public static function register_notices() {

			if ( false === get_option( 'uagb-old-setup' ) ) {

				set_transient( 'uagb-first-rating', true, MONTH_IN_SECONDS );
				update_option( 'uagb-old-setup', true );

			} elseif ( false === get_transient( 'uagb-first-rating' ) ) {

				$image_path = UAGB_URL . 'admin/assets/images/uagb_notice.svg';

				UAGB_Admin_Notices::add_notice(
					array(
						'id'                         => 'uagb-admin-rating',
						'type'                       => '',
						'message'                    => sprintf(
							'<div class="notice-image">
								<img src="%1$s" class="custom-logo" alt="Ultimate Addons for Gutenberg" itemprop="logo"></div>
								<div class="notice-content">
									<div class="notice-heading">
										%2$s
									</div>
									%3$s<br />
									<div class="uagb-review-notice-container">
										<a href="%4$s" class="uagb-notice-close uagb-review-notice button-primary" target="_blank">
										%5$s
										</a>
									<span class="dashicons dashicons-calendar"></span>
										<a href="#" data-repeat-notice-after="%6$s" class="uagb-notice-close uagb-review-notice">
										%7$s
										</a>
									<span class="dashicons dashicons-smiley"></span>
										<a href="#" class="uagb-notice-close uagb-review-notice">
										%8$s
										</a>
									</div>
								</div>',
							$image_path,
							__( 'Hello! Thank you for choosing the Ultimate Addons for Gutenberg to build this website!', 'ultimate-addons-for-gutenberg' ),
							__( 'Could you please do us a BIG favor and give it a 5-star rating on WordPress? This will boost our motivation and help other users make a comfortable decision while choosing this plugin.', 'ultimate-addons-for-gutenberg' ),
							'https://wordpress.org/support/plugin/ultimate-addons-for-gutenberg/reviews/?filter=5#new-post',
							__( 'Ok, you deserve it', 'ultimate-addons-for-gutenberg' ),
							MONTH_IN_SECONDS,
							__( 'Nope, maybe later', 'ultimate-addons-for-gutenberg' ),
							__( 'I already did', 'ultimate-addons-for-gutenberg' )
						),
						'repeat-notice-after'        => MONTH_IN_SECONDS,
						'priority'                   => 10,
						'display-with-other-notices' => false,
					)
				);
			}
		}

		/**
		 * Initialises the Plugin Name.
		 *
		 * @since 0.0.1
		 * @return void
		 */
		static public function initialise_plugin() {

			define( 'UAGB_PLUGIN_NAME', 'Ultimate Addons for Gutenberg' );
			define( 'UAGB_PLUGIN_SHORT_NAME', 'UAG' );
		}

		/**
		 * Renders the admin settings menu.
		 *
		 * @since 0.0.1
		 * @return void
		 */
		static public function menu() {

			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			add_submenu_page(
				'options-general.php',
				UAGB_PLUGIN_SHORT_NAME,
				UAGB_PLUGIN_SHORT_NAME,
				'manage_options',
				UAGB_SLUG,
				__CLASS__ . '::render'
			);
		}

		/**
		 * Renders the admin settings.
		 *
		 * @since 0.0.1
		 * @return void
		 */
		static public function render() {
			$action = ( isset( $_GET['action'] ) ) ? $_GET['action'] : '';
			$action = ( ! empty( $action ) && '' != $action ) ? $action : 'general';
			$action = str_replace( '_', '-', $action );

			// Enable header icon filter below.
			$uagb_icon                 = apply_filters( 'uagb_header_top_icon', true );
			$uagb_visit_site_url       = apply_filters( 'uagb_site_url', 'https://www.ultimategutenberg.com/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard' );
			$uagb_header_wrapper_class = apply_filters( 'uagb_header_wrapper_class', array( $action ) );

			include_once UAGB_DIR . 'admin/uagb-admin.php';
		}

		/**
		 * Renders the admin settings content.
		 *
		 * @since 0.0.1
		 * @return void
		 */
		static public function render_content() {

			$action = ( isset( $_GET['action'] ) ) ? $_GET['action'] : '';
			$action = ( ! empty( $action ) && '' != $action ) ? $action : 'general';
			$action = str_replace( '_', '-', $action );

			$uagb_header_wrapper_class = apply_filters( 'uagb_header_wrapper_class', array( $action ) );

			include_once UAGB_DIR . 'admin/uagb-' . $action . '.php';
		}

		/**
		 * Enqueues the needed CSS/JS for the builder's admin settings page.
		 *
		 * @since 1.8.0
		 */
		static public function notice_styles_scripts() {

			wp_enqueue_script( 'uagb-admin-notices', UAGB_URL . 'admin/assets/uagb-admin-notices.js', array( 'jquery' ), UAGB_VER, true );
			// Styles.
			wp_enqueue_style( 'uagb-notice-settings', UAGB_URL . 'admin/assets/admin-notice.css', array(), UAGB_VER );
		}

		/**
		 * Enqueues the needed CSS/JS for the builder's admin settings page.
		 *
		 * @since 1.0.0
		 */
		static public function styles_scripts() {

			// Styles.
			wp_enqueue_style( 'uagb-admin-settings', UAGB_URL . 'admin/assets/admin-menu-settings.css', array(), UAGB_VER );
			// Script.
			wp_enqueue_script( 'uagb-admin-settings', UAGB_URL . 'admin/assets/admin-menu-settings.js', array( 'jquery', 'wp-util', 'updates' ), UAGB_VER );

			$localize = array(
				'ajax_url'        => admin_url( 'admin-ajax.php' ),
				'ajax_nonce'      => wp_create_nonce( 'uagb-block-nonce' ),
				'activate'        => __( 'Activate', 'ultimate-addons-for-gutenberg' ),
				'deactivate'      => __( 'Deactivate', 'ultimate-addons-for-gutenberg' ),
				'enable_beta'     => __( 'Enable Beta Updates', 'ultimate-addons-for-gutenberg' ),
				'disable_beta'    => __( 'Disable Beta Updates', 'ultimate-addons-for-gutenberg' ),
				'installing_text' => __( 'Installing Astra', 'ultimate-addons-for-gutenberg' ),
				'activating_text' => __( 'Activating Astra', 'ultimate-addons-for-gutenberg' ),
				'activated_text'  => __( 'Astra Activated!', 'ultimate-addons-for-gutenberg' ),
			);

			wp_localize_script( 'uagb-admin-settings', 'uagb', apply_filters( 'uagb_js_localize', $localize ) );
		}

		/**
		 * Save All admin settings here
		 */
		static public function save_settings() {

			// Only admins can save settings.
			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			// Let extensions hook into saving.
			do_action( 'uagb_admin_settings_save' );
		}

		/**
		 * Initialize Ajax
		 */
		static public function initialize_ajax() {
			// Ajax requests.
			add_action( 'wp_ajax_uagb_activate_widget', __CLASS__ . '::activate_widget' );
			add_action( 'wp_ajax_uagb_deactivate_widget', __CLASS__ . '::deactivate_widget' );

			add_action( 'wp_ajax_uagb_bulk_activate_widgets', __CLASS__ . '::bulk_activate_widgets' );
			add_action( 'wp_ajax_uagb_bulk_deactivate_widgets', __CLASS__ . '::bulk_deactivate_widgets' );

			add_action( 'wp_ajax_uagb_allow_beta_updates', __CLASS__ . '::allow_beta_updates' );
		}

		/**
		 * Activate module
		 */
		static public function activate_widget() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			$block_id            = sanitize_text_field( $_POST['block_id'] );
			$blocks              = UAGB_Helper::get_admin_settings_option( '_uagb_blocks', array() );
			$blocks[ $block_id ] = $block_id;
			$blocks              = array_map( 'esc_attr', $blocks );

			// Update blocks.
			UAGB_Helper::update_admin_settings_option( '_uagb_blocks', $blocks );

			echo $block_id;

			die();
		}

		/**
		 * Deactivate module
		 */
		static public function deactivate_widget() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			$block_id            = sanitize_text_field( $_POST['block_id'] );
			$blocks              = UAGB_Helper::get_admin_settings_option( '_uagb_blocks', array() );
			$blocks[ $block_id ] = 'disabled';
			$blocks              = array_map( 'esc_attr', $blocks );

			// Update blocks.
			UAGB_Helper::update_admin_settings_option( '_uagb_blocks', $blocks );

			echo $block_id;

			die();
		}

		/**
		 * Activate all module
		 */
		static public function bulk_activate_widgets() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			// Get all widgets.
			$all_blocks = UAGB_Helper::$block_list;
			$new_blocks = array();

			// Set all extension to enabled.
			foreach ( $all_blocks  as $slug => $value ) {
				$_slug                = str_replace( 'uagb/', '', $slug );
				$new_blocks[ $_slug ] = $_slug;
			}

			// Escape attrs.
			$new_blocks = array_map( 'esc_attr', $new_blocks );

			// Update new_extensions.
			UAGB_Helper::update_admin_settings_option( '_uagb_blocks', $new_blocks );

			echo 'success';

			die();
		}

		/**
		 * Deactivate all module
		 */
		static public function bulk_deactivate_widgets() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			// Get all extensions.
			$old_blocks = UAGB_Helper::$block_list;
			$new_blocks = array();

			// Set all extension to enabled.
			foreach ( $old_blocks  as $slug => $value ) {
				$_slug                = str_replace( 'uagb/', '', $slug );
				$new_blocks[ $_slug ] = 'disabled';
			}

			// Escape attrs.
			$new_blocks = array_map( 'esc_attr', $new_blocks );

			// Update new_extensions.
			UAGB_Helper::update_admin_settings_option( '_uagb_blocks', $new_blocks );

			echo 'success';

			die();
		}

		/**
		 * Allow beta updates
		 */
		static public function allow_beta_updates() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			$beta_update = sanitize_text_field( $_POST['allow_beta'] );

			// Update new_extensions.
			UAGB_Helper::update_admin_settings_option( '_uagb_beta', $beta_update );

			echo 'success';

			die();
		}

		/**
		 * Required Plugin Activate
		 *
		 * @since 1.8.2
		 */
		public static function theme_activate() {

			if ( ! current_user_can( 'switch_themes' ) || ! isset( $_POST['slug'] ) || ! $_POST['slug'] ) {
				wp_send_json_error(
					array(
						'success' => false,
						'message' => __( 'No Theme specified', 'ultimate-addons-for-gutenberg' ),
					)
				);
			}

			$theme_slug = ( isset( $_POST['slug'] ) ) ? esc_attr( $_POST['slug'] ) : '';

			$activate = switch_theme( $theme_slug );

			if ( is_wp_error( $activate ) ) {
				wp_send_json_error(
					array(
						'success' => false,
						'message' => $activate->get_error_message(),
					)
				);
			}

			wp_send_json_success(
				array(
					'success' => true,
					'message' => __( 'Theme Successfully Activated', 'ultimate-addons-for-gutenberg' ),
				)
			);

		}

	}

	UAGB_Admin::init();

}
