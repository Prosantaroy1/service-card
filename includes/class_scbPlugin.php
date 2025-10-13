<?php

if (!class_exists('SCBPlugin')) {


    class SCBPlugin
    {
        public function __construct()
        {
            add_action('plugins_loaded', [$this, 'plugins_dependency']);
            add_action('admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);
            add_shortcode('service_card', [$this, 'service_card_shortcode']);
        }

        public function plugins_dependency()
        {
            require_once SCD_DIR_PATH . 'includes/function.php';
            require_once SCD_DIR_PATH . 'service-card-block.php';
            require_once SCD_DIR_PATH . 'includes/class_scbAdmin.php';
        }

        public function adminEnqueueScripts($screen)
        {
            global $typenow;

            if ('service_card' === $typenow) {
                wp_enqueue_script('shortcode-js', SCD_DIR_URL . '/build/shortcode.js', [], SCD_VERSION, true);
                wp_enqueue_style('shortcode-css', SCD_DIR_URL . '/build/shortcode.css', [], SCD_VERSION);
            }

            if ('service_card_page_service_card_Dashboard' === $screen || 'tools_page_service_card_Dashboard' === $screen) {
                wp_enqueue_style('vgb-admin-style', SCD_DIR_URL . '/build/admin-dashboard.css', false, SCD_VERSION);
                wp_enqueue_script('vgb-admin-script', SCD_DIR_URL . '/build/admin-dashboard.js', ['react', 'react-dom', 'wp-data', "wp-api", "wp-util", "wp-i18n", "lodash"], SCD_VERSION, true);

            }
        }
        public function service_card_shortcode($atts)
        {
            if (isset($atts['id'])) {
                $post = get_post($atts['id']);

                if ($post) {
                    $blocks = parse_blocks($post->post_content);

                    foreach ($blocks as $block) {
                        // if ($block['blockName'] === 'scd/service-card') {
                        //     return render_block($block);
                        // }
                        $activeLicence = SCD_HAS_PRO ? sc_fs()->can_use_premium_code() : false;

                        if ($activeLicence) {
                            return render_block($block);
                        } else {
                            return "Please active your licenses !!";
                        }
                    }
                } else {
                    return 'Post not found or invalid post type.';
                }
            }
        }


    }



}