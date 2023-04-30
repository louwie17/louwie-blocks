import { AlignmentToolbar, BlockControls, InspectorControls, PanelColorSettings, useBlockProps, withColors } from "@wordpress/block-editor";
import { Dashicon, __experimentalNumberControl as NumberControl } from "@wordpress/components";


import { alignmentMap } from "./shared";
import { DashiconAttributes } from "./types";

type Props = {
    className: string;
    attributes: DashiconAttributes,
    setAttributes: (attr: DashiconAttributes) => void
}

export default withColors('arrowColor')((props: Props) => {
    var attributes = props.attributes;

    var arrowStyles = {
        color: attributes.arrowColor,
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
            <NumberControl
                isShiftStepEnabled={true}
                onChange={(value: string) => {
                    props.setAttributes({ ...attributes, size: parseInt(value, 10) })
                }}
                shiftStep={10}
                value={attributes.size || 20}
            />
            <PanelColorSettings
                title='Arrow Color Options'
                colorSettings={[
                    {
                        value: attributes.arrowColor,
                        label: 'Arrow Color',
                        onChange: (color: string) => props.setAttributes({ ...attributes, arrowColor: color }),
                    }
                ]}
            />
        </InspectorControls>
        <div {...useBlockProps({ style: { ...blockStyle, ...arrowStyles }, className: props.className })}>
            <Dashicon icon='arrow-down-alt' size={attributes.size || 20} />
        </div>
    </>;
})