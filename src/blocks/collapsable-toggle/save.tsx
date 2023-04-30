import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { ARROW_CLASS, CLASS_ID_GROUP_PREFIX, CLASS_ID_PREFIX, CLASS_ID_TOGGLE } from "./constants";
import { CollapsableToggleAttributes } from "./types";

export default function (props: { attributes: CollapsableToggleAttributes }) {
    var attributes = props.attributes;
    let classNames = attributes.className || '';
    if (attributes.id) {
        classNames += ' ' + CLASS_ID_TOGGLE;
        classNames += ' ' + CLASS_ID_PREFIX + attributes.id;
    }
    if (attributes.group) {
        classNames += ' ' + CLASS_ID_GROUP_PREFIX + attributes.group;
    }
    if (attributes.showToggle) {
        classNames += ' ' + ARROW_CLASS;
    }
    return <div {...useBlockProps.save({ className: classNames })}>
        {attributes.showToggle && <div className="gh-collapsable-arrow">
            <span style={{ backgroundColor: attributes.toggleColor }}></span>
            <span style={{ backgroundColor: attributes.toggleColor }}></span>
        </div>}
        <InnerBlocks.Content />
    </div>;
}