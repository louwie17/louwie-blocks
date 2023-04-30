<?php
/**
 * Plugin Name:       Louwie Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       louwie-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_louwie_blocks_block_init() {
	register_block_type( __DIR__ . '/build/blocks/dashicon' );
	register_block_type( __DIR__ . '/build/blocks/collapsable-content' );
	register_block_type( __DIR__ . '/build/blocks/collapsable-toggle' );
}
add_action( 'init', 'create_block_louwie_blocks_block_init' );

function louwie_blocks_enqueue_editor_assets() {
    wp_enqueue_script(
        'custom-blocks-script',
        plugin_dir_url( __FILE__ ) . '/build/index.js'
    );
}
add_action( 'enqueue_block_editor_assets', 'louwie_blocks_enqueue_editor_assets' );