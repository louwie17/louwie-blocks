import { AlignmentToolbar, BlockControls, InspectorControls, PanelColorSettings, useBlockProps, withColors } from "@wordpress/block-editor";
import { Dashicon, __experimentalNumberControl as NumberControl, SelectControl } from "@wordpress/components";


import { alignmentMap, iconKeys } from "./shared";
import { DashiconAttributes, IconKey } from "./types";

type Props = {
    className: string;
    attributes: DashiconAttributes,
    setAttributes: (attr: DashiconAttributes) => void
}

export default withColors('iconColor')((props: Props) => {
    var attributes = props.attributes;

    var iconStyles = {
        color: attributes.iconColor,
    };

    var blockStyle = {
        display: 'flex',
        margin: '0px',
        'justify-content': alignmentMap[attributes.alignment]
    };

    return <>
        <BlockControls key="controls" controls={[]}>
            <AlignmentToolbar
                value={attributes.alignment}
                onChange={(align: 'center' | 'right' | 'left') => props.setAttributes({ ...attributes, alignment: align })} />
        </BlockControls>
        <InspectorControls>
            <SelectControl
                label='Icon'
                value={attributes.iconKey}
                options={iconKeys.map(icon => ({ label: icon, value: icon }))}
                onChange={(selected: IconKey) => props.setAttributes({ ...attributes, iconKey: selected })}
            />
            <NumberControl
                isShiftStepEnabled={true}
                onChange={(value: string) => {
                    props.setAttributes({ ...attributes, size: parseInt(value, 10) })
                }}
                shiftStep={10}
                value={attributes.size || 20}
            />
            <PanelColorSettings
                title='Icon Color Options'
                colorSettings={[
                    {
                        value: attributes.iconColor,
                        label: 'Icon Color',
                        onChange: (color: string) => props.setAttributes({ ...attributes, iconColor: color }),
                    }
                ]}
            />
        </InspectorControls>
        <div {...useBlockProps({ style: { ...blockStyle, ...iconStyles }, className: props.className })}>
            <Dashicon icon={attributes.iconKey || iconKeys[0]} size={attributes.size || 20} />
        </div>
    </>;
})