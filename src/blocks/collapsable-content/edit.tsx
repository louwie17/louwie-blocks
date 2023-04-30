import { useState, useEffect } from '@wordpress/element';
import { CollapsableContentAttributes } from "./types";
import { CLASS_ID_CONTENT, CLASS_ID_GROUP_PREFIX, CLASS_ID_PREFIX } from "./constants";
import { useSelect } from "@wordpress/data";
import { BlockControls, InnerBlocks, InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { TextControl, ToolbarButton, ToolbarGroup } from "@wordpress/components";

export default function (props: { attributes: CollapsableContentAttributes, setAttributes: (attr: CollapsableContentAttributes) => void }) {
    const [showContent, setShowContent] = useState(false);
    const { activeId } = useSelect((select) => {
        const collapsable: { getActiveId: () => string } = select('louwie/collapsable');
        return {
            activeId: collapsable.getActiveId()
        };
    }, []);
    var attributes = props.attributes;
    useEffect(() => {
        if (activeId === props.attributes.id) {
            setShowContent(true);
        } else {
            setShowContent(false);
        }
    }, [activeId, props.attributes.id]);
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
            </InspectorControls>
        </BlockControls>
        <div {...useBlockProps({ className: classNames })}>
            {showContent ? <InnerBlocks /> : <p>Collapsable content <span className="gh-collapsable-content-info">{`( id: ${attributes.id}, group: ${attributes.group} )`}</span></p>}
        </div>
    </>;
}