import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { CollapsableToggleAttributes } from "./types";

export default function (props: { attributes: CollapsableToggleAttributes }) {
    var attributes = props.attributes;

    return <div {...useBlockProps.save()}
        data-wp-interactive='{ "namespace": "interactivity-api-collapsable-toggle__store" }'
        data-wp-context={'{ "id": "' + attributes.id + '", "group": "' + attributes.group + '"}'}
        data-wp-on--click="actions.toggle"
        data-wp-bind--aria-expanded="state.isOpen"
        data-wp-class--gh-collapsable-shown="state.isOpen"
    >
        {attributes.showToggle && <div className="gh-collapsable-arrow">
            <span style={{ backgroundColor: attributes.toggleColor }}></span>
            <span style={{ backgroundColor: attributes.toggleColor }}></span>
        </div>}
        <InnerBlocks.Content />
    </div>;
}