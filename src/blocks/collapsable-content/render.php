<?php
$id = $attributes['id'];
if ( ! empty( $attributes['group'] ) ) {
  $id = $attributes['group'] . $attributes['id'];
}
$context = array( 'id' => $attributes['id'], 'group' => $attributes['group'] );
wp_interactivity_state( 'interactivity-api-collapsable-toggle__store', array(
  $id => array( 
    'isOpen' => $attributes['showOnToggle'],
  )
));
 
?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( array( 'class' => 'gh-collapsable-content' ) ) ); ?>
        data-wp-interactive='interactivity-api-collapsable-toggle__store'
        data-wp-bind--aria-expanded="state.isOpen"
        data-wp-class--gh-collapsable-shown="state.isOpen"
        <?php echo wp_interactivity_data_wp_context( $context ); ?>
    >
    <?php
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo $content;
		?>
</div>