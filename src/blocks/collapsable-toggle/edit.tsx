import { CollapsableToggleAttributes } from "./types";
import { ARROW_CLASS, CLASS_ID_GROUP_PREFIX, CLASS_ID_PREFIX, CLASS_ID_TOGGLE } from "./constants";
import { useDispatch, useSelect } from "@wordpress/data";
import { BlockControls, InnerBlocks, InspectorControls, PanelColorSettings, useBlockProps } from "@wordpress/block-editor";
import { useEntityProp } from '@wordpress/core-data';
import { TextControl, ToggleControl, ToolbarButton, ToolbarGroup } from "@wordpress/components";

export default function (props: { attributes: CollapsableToggleAttributes, setAttributes: (attr: CollapsableToggleAttributes) => void, clientId: string }) {
    const { setActiveId } = useDispatch('louwie/collapsable');
    const { activeId } = useSelect((select) => {
        const collapsable: { getActiveId: () => string } = select('louwie/collapsable');
        return {
            activeId: collapsable.getActiveId()
        };
    }, []);
    const postType = useSelect(
        (select) => select('core/editor').getCurrentPostType(),
        []
    );
    const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

    function setId(id: string) {
        const parsedId = id.replace(/[^A-Z0-9]+/ig, "-");
        const newIds = [...(meta?.louwie_collapsable_ids || []).filter(data => data.clientId !== props.clientId || !data.clientId)];
        props.setAttributes({ ...attributes, id: parsedId });
        setMeta({ ...(meta || {}), louwie_collapsable_ids: [...newIds, { clientId: props.clientId, id: parsedId }] });
    }
    var attributes = props.attributes;
    let classNames = attributes.className || '';
    if (attributes.id) {
        classNames += ' ' + CLASS_ID_TOGGLE;
        classNames += ' ' + CLASS_ID_PREFIX + attributes.id.replace(/[^A-Z0-9]+/ig, "-");
    }
    if (attributes.group) {
        classNames += ' ' + CLASS_ID_GROUP_PREFIX + attributes.group.replace(/[^A-Z0-9]+/ig, "-");
    }
    if (attributes.showToggle) {
        classNames += ' ' + ARROW_CLASS;
    }
    if (activeId === attributes.id) {
        classNames += ' ' + 'gh-collapsable-shown';
    }
    return <>
        <BlockControls key="controls" controls={[]}>
            <ToolbarGroup>
                <ToolbarButton
                    placeholder=""
                    disabled={!attributes.id}
                    label={activeId ? 'Hide content' : 'Show content'}
                    showTooltip={true}
                    icon={activeId ? 'hidden' : 'visibility'}
                    onClick={() => setActiveId(activeId ? '' : attributes.id)}
                />
            </ToolbarGroup>
            <InspectorControls>
                <TextControl
                    label="Id"
                    onChange={setId}
                    value={attributes.id || ''}
                />
                <TextControl
                    label="Group Id"
                    onChange={(value) => props.setAttributes({ ...attributes, group: value.replace(/[^A-Z0-9]+/ig, "-") })}
                    value={attributes.group || ''}
                />
                <ToggleControl
                    label="Show toggle"
                    help={attributes.showToggle ? "Yes" : "No"}
                    checked={attributes.showToggle}
                    onChange={() => props.setAttributes({ ...attributes, showToggle: !attributes.showToggle })}
                    value={attributes.group || ''}
                />
                {attributes.showToggle && <PanelColorSettings title='Toggle Color' colorSettings={[{
                    value: attributes.toggleColor,
                    label: 'Toggle Color',
                    onChange: (color: string) => props.setAttributes({ ...attributes, toggleColor: color }),
                }]} />}
            </InspectorControls>
        </BlockControls>
        <div {...useBlockProps({ className: classNames })}>
            {attributes.showToggle && <div className="gh-collapsable-arrow">
                <span style={{ backgroundColor: attributes.toggleColor }}></span>
                <span style={{ backgroundColor: attributes.toggleColor }}></span>
            </div>}
            <InnerBlocks />
        </div>
    </>;
}