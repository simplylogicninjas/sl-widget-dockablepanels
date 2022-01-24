/**
 * This file was generated from SLDockablePanels.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, EditableValue } from "mendix";

export interface PanelsType {
    name: DynamicValue<string>;
    content?: ReactNode;
}

export interface PanelsPreviewType {
    name: string;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}

export interface SLDockablePanelsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    panels: PanelsType[];
    editable: DynamicValue<boolean>;
    dockable: DynamicValue<boolean>;
    floatable: DynamicValue<boolean>;
    sortable: DynamicValue<boolean>;
    closable: DynamicValue<boolean>;
    savedLayout?: EditableValue<string>;
    deletedTabsTitle: DynamicValue<string>;
    deletedTabsEmpty: DynamicValue<string>;
}

export interface SLDockablePanelsPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    panels: PanelsPreviewType[];
    editable: string;
    dockable: string;
    floatable: string;
    sortable: string;
    closable: string;
    savedLayout: string;
    onLayoutSavedAction: {} | null;
    deletedTabsTitle: string;
    deletedTabsEmpty: string;
}
