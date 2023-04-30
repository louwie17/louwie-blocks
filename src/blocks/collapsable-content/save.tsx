import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { CLASS_ID_CONTENT, CLASS_ID_GROUP_PREFIX, CLASS_ID_PREFIX } from "./constants";
import { CollapsableContentAttributes } from "./types";

export default function (props: { attributes: CollapsableContentAttributes }) {
    var attributes = props.attributes;
    let classNames = attributes.className || '';
    if (attributes.id) {
        classNames += ' ' + CLASS_ID_CONTENT;
        classNames += ' ' + CLASS_ID_PREFIX + attributes.id;
    }
    if (attributes.group) {
        classNames += ' ' + CLASS_ID_GROUP_PREFIX + attributes.group;
    }
    return <div {...useBlockProps.save({ className: classNames })}>
        <InnerBlocks.Content />
    </div>;
}