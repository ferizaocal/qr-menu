<?php
/*
Plugin Name: QR MENU
Plugin URI: 
Description: 
Author: Feriza nur öcal
Version: 1.0
Author URI: 
*/
if (!defined('ABSPATH')) : exit();
endif;

$pluginVersion = '1.0';

define('WPRK_PATH', trailingslashit(plugin_dir_path(__FILE__)));
define('WPRK_URL', trailingslashit(plugins_url('/', __FILE__)));



function loadscripts()
{
    wp_enqueue_script('react-menu', WPRK_URL . 'dist/admin.js', ['jquery', 'wp-element'], wp_rand(), true);
    wp_localize_script('react-menu', 'appLocalizer', [
        'apiUrl' => home_url('/wp-json'),
        'nonce' => wp_create_nonce('wp_rest'),
    ]);
}
function init(){
    create_branch();
    create_category();
    create_menu_item();
    create_language();
    create_ticket();
    create_item_ticket();
    initData();
  
}
register_activation_hook(
    __FILE__,
    'init'
);
register_deactivation_hook(
    __FILE__,
    'table_delete'
);
function table_delete()
{
    delete_tables('branches');
    delete_tables('categories');
    delete_tables('items');
    delete_tables('languages');
    delete_tables('tickets');
    delete_tables('itemtickets');
 
  
}
function create_branch()
{
    global $wpdb;
    $table_name = "branches";
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
          id mediumint(9) NOT NULL AUTO_INCREMENT,
          BranchName text NOT NULL,
          CurrencyUnit text NOT NULL,
          Language text NOT NULL,
          Address text  NULL,
          Country text  NULL,
          City text  NULL,
          District text  NULL,
          Telephone text  NULL,
          Email text NOT NULL,
          UNIQUE KEY id(id)
        ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    add_option("create_branch", $pluginVersion);
}
function create_category()
{
    global $wpdb;
    $table_name = "categories";
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
          id mediumint(9) NOT NULL AUTO_INCREMENT,
          BranchId mediumint(9) NOT NULL,
          LanguageId mediumint(9) NOT NULL,
          CategoryName text NOT NULL,
          CategoryImage text NULL,
          UNIQUE KEY id(id)
        ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    add_option("create_category", $pluginVersion);
}
function create_menu_item()
{
    global $wpdb;
    $table_name = "items";
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
          id mediumint(9) NOT NULL AUTO_INCREMENT,
          CategoryId mediumint(9) NOT NULL,
          ItemImage text  NULL,
          ItemName text NOT NULL,
          ItemExplanation text NOT NULL,
          ItemPrice double DEFAULT NULL,
          UNIQUE KEY id(id)
        ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    add_option("create_menu_item", $pluginVersion);
}
function initData(){
    global $wpdb;
    $wpdb->insert(
        'languages',
        array(
            'LanguageName' => "Türkçe",
        )
    );
}
function create_language()
{
    global $wpdb;
    $table_name = "languages";
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
          id mediumint(9) NOT NULL AUTO_INCREMENT,
          LanguageName text NOT NULL,
          UNIQUE KEY id(id)
        ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    add_option("create_language", $pluginVersion);
}
function create_ticket()
{
    global $wpdb;
    $table_name = "tickets";
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
          id mediumint(9) NOT NULL AUTO_INCREMENT,
          TicketValue text NOT NULL,
          BranchId mediumint(9) NOT NULL,
          TicketName text NOT NULL,
          UNIQUE KEY id(id)
        ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    add_option("create_ticket", $pluginVersion);
}
function create_item_ticket()
{
    global $wpdb;
    $table_name = "itemtickets";
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
          id mediumint(9) NOT NULL AUTO_INCREMENT,
          TicketId mediumint(9) NOT NULL,
          ItemId mediumint(9) NOT NULL,
          UNIQUE KEY id(id)
        ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    add_option("create_item_ticket", $pluginVersion);
}



function delete_tables($table)
{
    global $wpdb;
    $sql = "DROP TABLE IF EXISTS $table";
    $wpdb->query($sql);
    delete_option("delete_tables", $pluginVersion);
}

add_action('admin_enqueue_scripts', 'loadscripts');


require_once WPRK_PATH . 'classes/AdminPage.php';
require_once WPRK_PATH . 'classes/Branch.php';
require_once WPRK_PATH . 'classes/Category.php';
require_once WPRK_PATH . 'classes/MenuItem.php';
require_once WPRK_PATH . 'classes/Language.php';
require_once WPRK_PATH . 'classes/Ticket.php';

