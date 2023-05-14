import { iconKeys } from "./shared";

export type IconKey = typeof iconKeys[number];

export type DashiconAttributes = {
    size: number;
    iconColor: string;
    alignment: 'center' | 'right' | 'left',
    iconKey?: IconKey;
}
