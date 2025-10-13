<?php
/**
 * Plugin Name: Service Card
 * Description: Short description of the Service Card plugin.
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: service-card
 * Domain Path: /languages
 * @fs_free_only /freemius-lite
 * @fs_premium_only /freemius
 */

if (!defined('ABSPATH')) {
    exit;
}

if (function_exists('sc_fs')) {
    sc_fs()->set_basename(true, __FILE__);
} else {

    define('SCD_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0');
    define('SCD_DIR_URL', plugin_dir_url(__FILE__));
    define('SCD_DIR_PATH', plugin_dir_path(__FILE__));
    define('SCD_HAS_PRO', (plugin_basename(__FILE__) === 'service-card-premium/service-card.php'));

    if (!function_exists('sc_fs')) {

        function sc_fs()
        {
            global $sc_fs;

            if (!isset($sc_fs)) {
                $fsLitePath = SCD_DIR_PATH . '/freemius-lite/start.php';
                $fsPath = SCD_DIR_PATH . '/freemius/start.php';

                if (SCD_HAS_PRO && (file_exists($fsPath))) {
                    require_once $fsPath;
                } else {
                    require_once $fsLitePath;
                }

                $scdFsConfig =  [
                    'id' => '20854',
                    'slug' => 'service-card',
                    'type' => 'plugin',
                    'public_key' => 'pk_845c19fabdc20ef5233116f937b0e',
                    'is_premium' => true,
                    'premium_suffix' => 'premium',
                    'has_premium_version' => true,
                    'has_addons' => false,
                    'has_paid_plans' => true,
                    'menu' => SCD_HAS_PRO ? array(
                        'slug' => 'edit.php?post_type=service_card',
                        'first-path' => 'edit.php?post_type=service_card&page=service_card_Dashboard',
                        'support' => false
                    ) : array(
                        'slug' => 'service_card_Dashboard',
                        'first-path' => 'tools.php?page=service_card_Dashboard#/welcome',
                        'support' => false,
                        'parent' => array(
                            'slug' => 'tools.php',
                        ),
                    ),
                ];

                $sc_fs = SCD_HAS_PRO && file_exists($fsPath) ? fs_dynamic_init($scdFsConfig) : fs_lite_dynamic_init($scdFsConfig);

            }

            return $sc_fs;
        }
        sc_fs();

        do_action('sc_fs_loaded');
    }

    require_once SCD_DIR_PATH . 'includes/class_scbPlugin.php';
    new SCBPlugin();
}






