<?php


class Admin_Page {

    public function __construct() {
        add_action('admin_menu', [ $this, 'create_admin_menu' ] );
    }

    public function create_admin_menu() {
        $capability = 'manage_options';
        $slug = 'qr-settings';

        add_menu_page(
            __( 'Qr Menu', 'qr-menu' ),
            __( 'Qr Menu', 'qr-menu' ),
            $capability,
            $slug,
            [ $this, 'menu_page_template' ],
            'dashicons-buddicons-replies'
        );
    }

    public function menu_page_template() {
        echo '<div class="wrap"><div id="qr-admin-app"></div></div>';
    }

}
new Admin_Page();