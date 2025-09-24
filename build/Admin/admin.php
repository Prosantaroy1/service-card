<?php

if (!defined('ABSPATH')) 
{
    exit;
}


if (!class_exists('PREFIXPlugin')) {
    class PREFIXPlugin
    {

        function __construct()
        {
            add_action('admin_menu', array($this, 'add_service_card_submenu'));
            add_action('admin_enqueue_scripts', array($this, 'adminEnqueueScripts'));
        }

        function add_service_card_submenu()
        {
            add_submenu_page(
                'edit.php?post_type=service_card',
                'Card Demo',
                'Demo',
                'manage_options',
                'service_card_Demo',
                array($this, 'sc_service_card_Demo_page')
            );

            add_submenu_page(
                'edit.php?post_type=service_card',
                'Dashboard',
                'Dashboard',
                'manage_options',
                'service_card_Dashboard',
                array($this, 'sc_service_card_Dashboard_page'),
                0
            );
        }

        function sc_service_card_Demo_page()
        {
            echo "<h2>Demo Page</h2>";
        }

        function sc_service_card_Dashboard_page()
        {
            echo "<div id='vgbDashboard'></div>";
        }

        function adminEnqueueScripts($hook)
        {
            echo $hook;
            if ('service_card_page_service_card_Dashboard' === $hook) {
                wp_enqueue_style('vgb-admin-style', SCD_DIR_URL . 'build/admin-dashboard.css', [], SCD_VERSION);
                wp_enqueue_script('vgb-admin-script', SCD_DIR_URL . 'build/admin-dashboard.js', ['react', 'react-dom'], SCD_VERSION, true);
            }
        }
    }

    new PREFIXPlugin();
}

