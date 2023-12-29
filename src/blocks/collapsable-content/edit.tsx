import { useState, useEffect } from '@wordpress/element';
import { CollapsableContentAttributes } from "./types";
import { CLASS_ID_CONTENT, CLASS_ID_GROUP_PREFIX, CLASS_ID_PREFIX } from "./constants";
import { useSelect } from "@wordpress/data";
import { BlockControls, InnerBlocks, InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { TextControl, ToggleControl, ToolbarButton, ToolbarGroup } from "@wordpress/components";

export default function (props: { attributes: CollapsableContentAttributes, setAttributes: (attr: CollapsableContentAttributes) => void }) {
    const attributes = props.attributes;
    const [showContent, setShowContent] = useState(attributes.showOnToggle ? false : true);
    const { activeId } = useSelect((select) => {
        const collapsable: { getActiveId: () => string } = select('louwie/collapsable');
        return {
            activeId: collapsable.getActiveId()
        };
    }, []);

    useEffect(() => {
        if (activeId === attributes.id) {
            setShowContent(attributes.showOnToggle ? true : false);
        } else {
            setShowContent(attributes.showOnToggle ? false : true);
        }
    }, [activeId, props.attributes.id, attributes.showOnToggle]);
    let classNames = attributes.className || '';
    if (attributes.id) {
        classNames += ' ' + CLASS_ID_CONTENT;
        classNames += ' ' + CLASS_ID_PREFIX + attributes.id.replace(/[^A-Z0-9]+/ig, "-");
    }
    if (attributes.group) {
        classNames += ' ' + CLASS_ID_GROUP_PREFIX + attributes.group.replace(/[^A-Z0-9]+/ig, "-");
    }

    return <>
        <BlockControls key="controls" controls={[]}>
            <ToolbarGroup>
                <ToolbarButton
                    placeholder=''
                    disabled={!attributes.id}
                    label={showContent ? 'Hide content' : 'Show content'}
                    showTooltip={true}
                    icon={showContent ? 'hidden' : 'visibility'}
                    onClick={() => setShowContent(!showContent)}
                />
            </ToolbarGroup>
            <InspectorControls>
                <TextControl
                    label="Id"
                    onChange={(value) => props.setAttributes({ ...attributes, id: value.replace(/[^A-Z0-9]+/ig, "-") })}
                    value={attributes.id || ''}
                />
                <TextControl
                    label="Group Id"
                    onChange={(value) => props.setAttributes({ ...attributes, group: value.replace(/[^A-Z0-9]+/ig, "-") })}
                    value={attributes.group || ''}
                />
                <ToggleControl
                    label="Show on toggle"
                    help={attributes.showOnToggle ? "Yes" : "No"}
                    checked={attributes.showOnToggle}
                    onChange={() => props.setAttributes({ ...attributes, showOnToggle: !attributes.showOnToggle })}
                />
            </InspectorControls>
        </BlockControls>
        <div {...useBlockProps({ className: classNames, style: { display: 'inherit' } })}>
            {showContent ? <InnerBlocks /> : <p><i>Collapsable content</i> <span className="gh-collapsable-content-info">{`( id: ${attributes.id}, group: ${attributes.group} )`}</span></p>}
        </div>
    </>;
}