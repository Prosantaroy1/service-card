<?php

if (!class_exists('SCBBlock')) {


    class SCBBlock
    {
        public function __construct()
        {
            add_action('init', [$this, 'onInit']);
            add_action('enqueue_block_editor_assets', [$this, "scbEnqueueEditorAssets"]);
        }

        public function onInit()
        {
            register_block_type(__DIR__ . '/build');
            wp_set_script_translations('vgb-admin-dashboard', 'service-card', SCD_DIR_PATH . 'languages');
        }

        public function scbEnqueueEditorAssets()
        {
            wp_add_inline_script(
                'scd-service-card-editor-script',
                'const scdIsPipeChecker = ' . wp_json_encode(scbIsPremium()) . ';',
                'before'
            );

        }

    }

    new SCBBlock();

}

