import { Dashicon } from "@wordpress/components";
import { alignmentMap } from "./shared";
import { DashiconAttributes } from "./types";

export default function save(props: { attributes: DashiconAttributes; className: string }) {
    var attributes = props.attributes;
    var blockStyle = {
        margin: '0px',
        'justify-content': alignmentMap[attributes.alignment]
    };

    var arrowStyles = {
        color: props.attributes.arrowColor,
    };
    return <div style={{ ...blockStyle, ...arrowStyles }} className={props.className}>
        <Dashicon icon="arrow-down-alt" size={attributes.size || 20} />
    </div>;
}