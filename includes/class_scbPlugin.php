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
            // wp_enqueue_style('vgb-admin-style', SCD_DIR_URL . '/build/admin-dashboard.css', false, SCD_VERSION);
            // wp_enqueue_script('vgb-admin-script', SCD_DIR_URL . '/build/admin-dashboard.js', ['react', 'react-dom', 'wp-data', "wp-api", "wp-util", "wp-i18n", "lodash"], SCD_VERSION, true);
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
                            $overlayHTML = '

                                        <style>
                                            .bcb-premium-slider-wrapper { position: relative; }
                                            .bcb-premium-overlay { top: 382px; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 999; }
                                            .bcb-premium-overlay-content { text-align: center; padding: 20px 30px; border-radius: 10px; max-width: 300px; color: white; }
                                            .bcb-upgrade-btn { display: inline-block; margin-top: 10px; padding: 8px 18px; background-color: #0073aa; color: #fff; text-decoration: none; font-weight: 600; border-radius: 5px; transition: background-color 0.3s ease; }
                                            .bcb-upgrade-btn:hover { background-color: #005177; }
                                            @media (max-width: 480px) { .bcb-premium-overlay-content { padding: 15px 20px; } .bcb-upgrade-btn { padding: 6px 14px; } }
                                        </style>
                                        <div class="bcb-premium-overlay">
                                            <div class="bcb-premium-overlay-content">
                                            <p>This shortcode feature is available in the Pro version. If you are using the Pro version, please activate your license.</p>
                                            <a href="' . esc_url(admin_url('edit.php?post_type=service_card&page=service_card_Dashboard#/pricing')) . '" class="bcb-upgrade-btn">Upgrade to Pro</a>
                                            </div>
                                        </div>';

                            return '
                                    <div class="bcb-premium-slider-wrapper">
                                        ' . $overlayHTML . '
                                    </div>';
                        }
                    }
                } else {
                    return 'Post not found or invalid post type.';
                }
            }
        }


    }



}