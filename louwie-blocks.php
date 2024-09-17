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
function louwie_blocks_create_block_block_init() {
	register_block_type( __DIR__ . '/build/blocks/dashicon' );
	register_block_type( __DIR__ . '/build/blocks/collapsable-content' );
	register_block_type( __DIR__ . '/build/blocks/collapsable-toggle' );

	foreach ( array( 'post', 'page' ) as $post_type ) {
		register_post_meta($post_type, 'louwie_collapsable_ids', [
			'show_in_rest' => true,
			'single' => true,
			'type' => 'array',
			'revisions_enabled' => true,
			'show_in_rest' => array(
				'schema' => array(
					'type'  => 'array',
					'items' => array(
						'type' => 'object',
						'properties'           => array(
							'id' => array(
								'description'  => esc_html__( 'Unique identifier for the object.', 'my-textdomain' ),
								'type'         => 'string',
								'context'      => array( 'view', 'edit', 'embed' ),
								'readonly'     => true,
							),
							'clientId' => array(
								'description'  => esc_html__( 'Unique block id.', 'my-textdomain' ),
								'type'         => 'string',
								'context'      => array( 'view', 'edit', 'embed' ),
								'readonly'     => true,
							),
						),
					),
				),
			),
		]);
		register_post_meta($post_type, 'louwie_collapsable_groups', [
			'show_in_rest' => true,
			'single' => false,
			'type' => 'array',
			'revisions_enabled' => true,
		]);
	}
}
add_action( 'init', 'louwie_blocks_create_block_block_init' );

function louwie_blocks_enqueue_editor_assets() {
    wp_enqueue_script(
        'custom-blocks-script',
        plugin_dir_url( __FILE__ ) . '/build/index.js'
    );
}
add_action( 'enqueue_block_editor_assets', 'louwie_blocks_enqueue_editor_assets' );

add_filter( 'render_block', function( $block_content, $block ) {
	// Make sure we have the blockName.
	if ( empty( $block['blockName'] ) ) {
		return $block_content;
	}

	// If this is a dashicon block, enqueue the dashicons script.
	if ( 'louwie-blocks/dashicon' === $block['blockName'] ) {
        wp_enqueue_style('dashicons');
	}

	// Return the block content.
	return $block_content;
}, 10, 2 );