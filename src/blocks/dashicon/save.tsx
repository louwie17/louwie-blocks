import { Dashicon } from "@wordpress/components";
import { alignmentMap, iconKeys } from "./shared";
import { DashiconAttributes } from "./types";

export default function save(props: { attributes: DashiconAttributes; className: string }) {
    var attributes = props.attributes;
    var blockStyle = {
        margin: '0px',
        'justify-content': alignmentMap[attributes.alignment]
    };

    var iconStyles = {
        color: props.attributes.iconColor,
    };
    return <div style={{ ...blockStyle, ...iconStyles }} className={props.className}>
        <Dashicon icon={attributes.iconKey || iconKeys[0]} size={attributes.size || 20} />
    </div>;
}