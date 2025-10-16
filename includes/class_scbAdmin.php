<?php

if (!class_exists('SCBAdmin')) {

    class SCBAdmin
    {
        public function __construct()
        {
            if (SCD_HAS_PRO) {
                add_action('init', [$this, 'scbRegisterType']);
            }
           // add_action('init', [$this, 'scbRegisterType']);
            add_action('admin_menu', [$this, 'add_service_card_submenu']);
            add_filter('manage_service_card_posts_columns', [$this, 'sc_setCustomColumn_edit']);
            add_action('manage_service_card_posts_custom_column', [$this, 'sc_manageCustomColumn'], 10, 2);
        }

        public function scbRegisterType()
        {
            register_post_type('service_card', [
                'label' => 'service_card',
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

        public function add_service_card_submenu()
        {
            add_submenu_page(
                SCD_HAS_PRO ? 'edit.php?post_type=service_card' : 'tools.php',
                //'edit.php?post_type=service_card',
                'Get Service',
                'Get Service',
                'manage_options',
                'service_card_Dashboard',
                [$this, 'sc_service_card_Dashboard_page']
            );
        }
        public function sc_service_card_Dashboard_page()
        {
            ?>
            <div id='vgbDashboard' data-info='<?php echo esc_attr(wp_json_encode([
                'version' => SCD_VERSION,
                'isPremium' => scbIsPremium(),
                'hasPro' => SCD_HAS_PRO,
            ])); ?>'></div>
            <?php
        }
        public function sc_setCustomColumn_edit($column)
        {
            unset($column['date']);
            $column['shortcode'] = 'ShortCode';
            $column['date'] = 'Date';
            $column['publisher'] = 'Publisher';
            return $column;
        }
        public function sc_manageCustomColumn($column_name, $post_id)
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
    }



    new SCBAdmin();

}