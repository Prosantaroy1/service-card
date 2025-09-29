<?php
/**
 * Plugin Name: Service Card 
 * Description: Short description of the plugin Service Card 
 * Version: 1.1.1
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: service-card
 */

// ABS PATH
if (!defined('ABSPATH')) {
	exit;
}


if (function_exists('sc_fs')) {
	register_activation_hook(__FILE__, function () {
		if (is_plugin_active('service-card/service-card.php')) {
			deactivate_plugins('service-card/service-card.php');
		}
		if (is_plugin_active('service-card-premium/service-card.php')) {
			deactivate_plugins('service-card-premium/service-card.php');
		}
	});
	// sc_fs()->set_basename(true, __FILE__);
} else {
	// Constant
	define('SCD_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.1.0');
	define('SCD_DIR_URL', plugin_dir_url(__FILE__));
	define('SCD_DIR_PATH', plugin_dir_path(__FILE__));
	//==define==
	define('SCD_HAS_PRO', file_exists(dirname(__FILE__) . '/freemius/start.php'));

	/*----SDK free---*/
	if (!function_exists('sc_fs')) {
		// Create a helper function for easy SDK access.
		function sc_fs()
		{
			global $sc_fs;

			if (!isset($sc_fs)) {

				if (SCD_HAS_PRO) {
					require_once dirname(__FILE__) . '/freemius/start.php';
				} else {
					require_once dirname(__FILE__) . '/freemius-lite/start.php';
				}

				$scdConfig = array(
					'id' => '20854',
					'slug' => 'service-card',
					'type' => 'plugin',
					'public_key' => 'pk_845c19fabdc20ef5233116f937b0e',
					'is_premium' => SCD_HAS_PRO,
					'premium_suffix' => 'pro',
					'has_premium_version' => true,
					'has_addons' => false,
					'has_paid_plans' => true,
					'wp_org_gatekeeper' => 'OA7#BoRiBNqdf52FvzEf!!074aRLPs8fspif$7K1#4u4Csys1fQlCecVcUTOs2mcpeVHi#C2j9d09fOTvbC0HloPT7fFee5WdS3G',
					'menu' => array(
						'slug' => 'edit.php?post_type=Service_card',
						'first-path' => 'edit.php?post_type=service_card&page=service_card_Dashboard',
						'support' => false,
					),
				);


				$sc_fs = SCD_HAS_PRO ? fs_dynamic_init($scdConfig) : fs_lite_dynamic_init($scdConfig);
			}

			return $sc_fs;
		}

		sc_fs();
		do_action('sc_fs_loaded');
	}

	function scbIsPremium()
	{
		return SCD_HAS_PRO ? sc_fs()->can_use_premium_code() : false;
	}


	// ... my plugin's main file logic ...
	if (!class_exists('PREFIXPlugin')) {
		class PREFIXPlugin
		{
			function __construct()
			{
				add_action('init', [$this, 'onInit']);
				add_shortcode('service_card', [$this, 'service_card_shortcode']);
				add_filter('manage_service_card_posts_columns', [$this, 'sc_setCustomColumn_edit']);
				add_action('manage_service_card_posts_custom_column', [$this, 'sc_manageCustomColumn'], 10, 2);
				add_action('admin_enqueue_scripts', [$this, 'sc_admin_enqueue_script']);
				add_action('admin_menu', [$this, 'add_service_card_submenu']);
				add_action('admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);
				// for premium only
				add_action('wp_ajax_scbPremiumChecker', [$this, 'scbPremiumChecker']);
				add_action('wp_ajax_nopriv_scbPremiumChecker', [$this, 'scbPremiumChecker']);
				add_action('admin_init', [$this, 'registerSettings']);
				add_action('rest_api_init', [$this, 'registerSettings']);
			}

			function scbPremiumChecker()
			{
				$nonce = sanitize_text_field($_POST['_wpnonce'] ?? null);

				if (!wp_verify_nonce($nonce, 'wp_ajax')) {
					wp_send_json_error('Invalid Request');
				}

				wp_send_json_success([
					'isPipe' => scbIsPremium()
				]);
			}

			function registerSettings()
			{
				register_setting('scbUtils', 'scbUtils', [
					'show_in_rest' => [
						'name' => 'scbUtils',
						'schema' => ['type' => 'string']
					],
					'type' => 'string',
					'default' => wp_json_encode(['nonce' => wp_create_nonce('wp_ajax')]),
					'sanitize_callback' => 'sanitize_text_field'
				]);
			}

			function onInit()
			{
				register_block_type(__DIR__ . '/build');
				register_post_type('Service_card', [
					'label' => 'Service_card',
					'description' => 'this is Service_card and seo friendly card',
					'labels' => [
						'name' => __('Service_card', 'service-card'),
						'singular_name' => __('Service_card', 'service-card'),
						'add_new' => __('Add New', 'service-card'),
						'add_new_item' => __('Add New Service_card', 'service-card'),
						'edit_item' => __('Edit Service_card', 'service-card'),
						'new_item' => __('New Service_card', 'service-card'),
						'view_item' => __('View Service_card', 'service-card'),
						'view_items' => __('View Service_card', 'service-card'),
						'search_items' => __('Search Service_card', 'service-card'),
						'not_found' => __('No Service_card found.', 'service-card'),
						'not_found_in_trash' => __('No Service_card found in Trash.', 'service-card'),
						'parent_item_colon' => __('Parent Service_card:', 'service-card'),
						'all_items' => __('All Service_card', 'service-card'),
						'archives' => __('Service_card Archives', 'service-card'),
						'attributes' => __('Service_card Attributes', 'service-card'),
						'insert_into_item' => __('Insert into Service_card', 'service-card'),
						'uploaded_to_this_item' => __('Uploaded to this Service_card', 'service-card'),
						'featured_image' => __('Featured Image', 'service-card'),
						'set_featured_image' => __('Set featured image', 'service-card'),
						'remove_featured_image' => __('Remove featured image', 'service-card'),
						'use_featured_image' => __('Use as featured image', 'service-card'),
						'menu_name' => __('Service Card', 'service-card'),
						'filter_items_list' => __('Filter Service_card list', 'service-card'),
						'filter_by_date' => __('Filter by date', 'service-card'),
						'items_list_navigation' => __('Service_card list navigation', 'service-card'),
						'items_list' => __('Service_card list', 'service-card'),
						'item_published' => __('Service_card published.', 'service-card'),
						'item_published_privately' => __('Service_card published privately.', 'service-card'),
						'item_reverted_to_draft' => __('Service_card reverted to draft.', 'service-card'),
						'item_scheduled' => __('Service_card scheduled.', 'service-card'),
						'item_updated' => __('Service_card updated.', 'service-card'),
						'item_link' => __('Service_card Link', 'service-card'),
						'item_link_description' => __('A link to an Service_card.', 'service-card'),
					],
					'public' => true, //frontend or backend show
					"publicly_queryable" => false, //view link hidden
					'show_ui' => true,  //admin show
					'show_in_menu' => true,
					'show_in_rest' => true,  //REST support
					'menu_position' => 79, //position type
					'menu_icon' => 'dashicons-index-card', //icon
					'supports' => array('title', 'editor', 'revisions'),
					'template' => [['scd/service-card']],  //open templated
					// 'template_lock' => 'all', //lock


				]);
			}
			//custome column add CPT
			function sc_setCustomColumn_edit($column)
			{
				unset($column['date']);
				$column['shortcode'] = 'ShortCode';
				$column['date'] = 'Date';
				$column['publisher'] = 'Publisher';
				return $column;
			}
			//column data CPT
			function sc_manageCustomColumn($column_name, $post_id)
			{
				if ($column_name == 'shortcode') {
					echo '<div class="bPlAdminShortcode" id="bPlAdminShortcode-' . esc_attr($post_id) . '">
						<input value="[service_card id=' . esc_attr($post_id) . ']" onclick="copyBPlAdminShortcode(\'' . esc_attr($post_id) . '\')" readonly>
						<span class="tooltip">Copy To Clipboard</span>
					  </div>';
				}
				if ($column_name == 'publisher') {
					echo 'Prosanta Roy';
				}
			}
			// Shortcode
			function service_card_shortcode($atts)
			{
				$post_id = $atts['id'];
				$post = get_post($post_id);

				if (!$post) {
					return '';
				}

				if (post_password_required($post)) {
					return get_the_password_form($post);
				}

				switch ($post->post_status) {
					case 'publish':
						return $this->displayContent($post);

					case 'private':
						if (current_user_can('read_private_posts')) {
							return $this->displayContent($post);
						}
						return '';

					case 'draft':
					case 'pending':
					case 'future':
						if (current_user_can('edit_post', $post_id)) {
							return $this->displayContent($post);
						}
						return '';

					default:
						return '';
				}
			}
			function displayContent($post)
			{
				$blocks = parse_blocks($post->post_content);
				return render_block($blocks[0]);
			}
			//data enqueueshortcode
			function sc_admin_enqueue_script()
			{
				global $typenow;

				if ('service_card' === $typenow) {
					wp_enqueue_script('shortcode-js', SCD_DIR_URL . './build/shortcode.js', [], SCD_VERSION, true);
					wp_enqueue_style(
						'shortcode-css',
						SCD_DIR_URL . './build/shortcode.css',
						[],
						SCD_VERSION
					);


				}
			}
			//submenu
			function add_service_card_submenu()
			{
				add_submenu_page(
					'edit.php?post_type=service_card',
					'Dashboard',
					'Dashboard',
					'manage_options',
					'service_card_Dashboard',
					[$this, 'sc_service_card_Dashboard_page'],
					0
				);
			}

			// Dashboard Menu
			function sc_service_card_Dashboard_page()
			{
				?>
				<div id='vgbDashboard' data-info='<?php echo esc_attr(wp_json_encode([
					'version' => SCD_VERSION,
					'isPremium' => scbIsPremium(),
					'hasPro' => SCD_HAS_PRO,
				])); ?>'></div>
				<?php
			}
			function adminEnqueueScripts($hook)
			{

				if ('service_card_page_service_card_Dashboard' === $hook) {
					wp_enqueue_style('vgb-admin-style', SCD_DIR_URL . './build/admin-dashboard.css', false, SCD_VERSION);
					wp_enqueue_script('vgb-admin-script', SCD_DIR_URL . './build/admin-dashboard.js', ['react', 'react-dom', 'wp-data', "wp-api", "wp-util", "wp-i18n", "lodash"], SCD_VERSION, true);
					wp_set_script_translations('vgb-admin-dashboard', 'service-card', SCD_DIR_PATH . 'languages');

				}
			}

		}

		new PREFIXPlugin();

	}
}