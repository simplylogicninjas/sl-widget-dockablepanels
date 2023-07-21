import { BoxData, PanelData } from "rc-dock";

export const isPanelData = (data: BoxData | PanelData): data is PanelData => {
    return ((data) as PanelData).tabs ? true : false;
}

export const isBoxData = (data: BoxData | PanelData): data is BoxData => {
    return ((data) as BoxData).mode ? true : false;
}