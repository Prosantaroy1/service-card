<?php
/**
 * Plugin Name: Service Card 
 * Description: Short description of the plugin Service Card 
 * Version: 1.0.0
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

// Constant
define('SCD_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0');
define('SCD_DIR_URL', plugin_dir_url(__FILE__));
define('SCD_DIR_PATH', plugin_dir_path(__FILE__));


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
			// redirect active plugin dashboard
			add_action('admin_init', [$this, 'sc_plugin_redirect_after_activation']);
			register_activation_hook(__FILE__, [$this, 'sc_plugin_activate_redirect']);
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
				'template_lock' => 'all', //lock
				'show_in_nav_menus' => true,
				'show_in_admin_bar' => true,

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
				wp_enqueue_script('shortcode-js', SCD_DIR_URL . './build/shortcode.js', [], SCD_DIR_PATH, true);
				wp_enqueue_style('shortcode-css', SCD_DIR_URL . './build/shortcode.css', SCD_DIR_PATH);

			}
		}
		//submenu
		function add_service_card_submenu()
		{
			add_submenu_page(
				'edit.php?post_type=service_card',
				'Card Settings',
				'Settings',
				'manage_options',
				'service_card_settings',
				[$this, 'sc_service_card_settings_page']
			);
		}
		function sc_service_card_settings_page()
		{

			?>
			<style>
				.dashboard-container {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					padding: 25px;
					border: 1px solid #ddd;
					border-radius: 12px;
					background: #f9f9f9;
					margin: 30px auto;
					gap: 30px;
				}

				.dashboard-text {
					flex: 1;
					padding-right: 20px;
				}

				.dashboard-text h2 {
					margin: 0 0 12px;
					font-size: 28px;
					color: #222;
				}

				.dashboard-text p {
					margin: 10px 0;
					color: #555;
					line-height: 1.6;
					font-size: 15px;
				}

				.dashboard-text ul {
					margin: 12px 0 18px 20px;
					padding: 0;
					color: #444;
				}

				.dashboard-text ul li {
					margin-bottom: 6px;
					list-style: disc;
					font-size: 14px;
				}

				.dashboard-image {
					flex: 1;
					text-align: center;
				}

				.dashboard-image img {
					max-width: 100%;
					height: auto;
					border-radius: 10px;
					box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
				}

				h3 {
					text-align: center;
					margin-bottom: 20px;
					color: #444;
					font-size: 20px;
				}
			</style>

			<h3>Admin Dashboard Setting</h3>
			<div class="dashboard-container">
				<!-- Left side -->
				<div class="dashboard-text">
					<h2>Dashboard</h2>
					<p>
						Manage your admin settings from here. You can customize the dashboard,
						update preferences, and view system status easily.
					</p>
					<p>
						To use this plugin, go to the <strong>Settings</strong> menu from the left sidebar,
						then open <strong>Dashboard Settings</strong>. Here you can:
					</p>
					<ul>
						<li>Enable or disable specific dashboard features</li>
						<li>Change the appearance and layout of the dashboard</li>
						<li>Update plugin preferences</li>
						<li>Preview changes instantly with the demo panel</li>
					</ul>
					<p>
						After saving your changes, the dashboard will automatically update
						with your new preferences. If you face any issue, check the
						<strong>Help</strong> section inside the plugin settings page.
					</p>
				</div>

				<!-- Right side -->
				<div class="dashboard-image">
					<img src="https://i.ibb.co.com/nqNHxg8g/demoOne.png" alt="Dashboard Demo">
				</div>
			</div>
			<?php

		}
		function sc_plugin_activate_redirect()
		{
			add_option('sc_plugin_redirect_after_activation', true);
		}


		function sc_plugin_redirect_after_activation()
		{
			if (is_admin() && get_option('sc_plugin_redirect_after_activation')) {

				delete_option('sc_plugin_redirect_after_activation');

				$redirect_url = admin_url('edit.php?post_type=service_card&page=service_card_settings');
				wp_safe_redirect($redirect_url);
				exit;
			}
		}

	}
	new PREFIXPlugin();
}