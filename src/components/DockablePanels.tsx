import DockLayout, { DockContext, LayoutBase, LayoutData, TabData, TabGroup } from "rc-dock";
import React, { useEffect, useRef, createElement, useState } from "react";
import RemovedTabsMenu from "./RemovedTabsMenu";

interface Props {
    name: string;
    dockable: boolean;
    floatable: boolean;
    sortable: boolean;
    closable: boolean;
    tabs: TabData[];
    layout?: string;
    deletedTabsTitle: string;
    deletedTabsEmpty: string;
    onLayoutChange?: (layout: string) => void;
}

export function DockablePanels({
    dockable,
    floatable,
    sortable,
    closable,
    tabs,
    layout,
    deletedTabsTitle,
    deletedTabsEmpty,
    onLayoutChange
}: Props) {
    const dockLayoutRef = useRef<DockLayout | null>(null);
    const [layoutData, setLayoutData] = useState<LayoutData>();
    const [groups, setGroups] = useState<{ [key: string]: TabGroup }>();
    const [_, setSavedLayout] = useState<LayoutBase>();
    const allTabs = useRef<TabData[]>([]);

    const initLayout = () => {
        allTabs.current = tabs;

        const layoutTabs: TabData[] = tabs.map(tab => {
            return {
                ...tab
            };
        });

        setLayoutData({
            dockbox: {
                mode: "horizontal",
                children: [
                    {
                        id: "panel",
                        tabs: layoutTabs,
                        panelLock: {
                            panelStyle: "default",
                            panelExtra: panel =>
                                closable ? (
                                    <RemovedTabsMenu
                                        allTabs={allTabs.current}
                                        dockLayout={dockLayoutRef.current}
                                        tabId={panel.id ?? "panel"}
                                        dockContext={dockLayoutRef.current as DockContext}
                                        deletedTabsEmpty={deletedTabsEmpty}
                                        deletedTabsTitle={deletedTabsTitle}
                                    />
                                ) : (
                                    <React.Fragment />
                                )
                        }
                    }
                ]
            }
        });

        const defaulTabGroup: TabGroup = {
            floatable,
            disableDock: !dockable,
            panelExtra: (tabData, dockContext) =>
                closable ? (
                    <RemovedTabsMenu
                        allTabs={allTabs.current}
                        dockLayout={dockLayoutRef.current}
                        tabId={tabData.id ?? ""}
                        dockContext={dockContext}
                        deletedTabsEmpty={deletedTabsEmpty}
                        deletedTabsTitle={deletedTabsTitle}
                    />
                ) : (
                    <React.Fragment />
                )
        };

        const groups: { [group: string]: TabGroup } = {};

        layoutTabs.forEach(tab => {
            if (!sortable && tab.group) {
                groups[tab.group] = defaulTabGroup;
            }
        });

        setGroups({
            panel: defaulTabGroup,
            ...groups
        });
    };

    const saveLayout = (layout: LayoutBase) => {
        setSavedLayout({ ...layout });

        if (onLayoutChange) {
            onLayoutChange(JSON.stringify(layout));
        }
    };

    const loadLayout = (layout: string) => {
        dockLayoutRef.current?.loadLayout(JSON.parse(layout));
    };

    useEffect(() => {
        if (!layoutData && tabs.length) {
            initLayout();
        }
    }, [tabs, layoutData]);

    useEffect(() => {
        if (dockLayoutRef.current && layoutData && layout) {
            loadLayout(layout);
        }
    }, [layout]);

    return layoutData && groups ? (
        <DockLayout
            ref={dockLayoutRef}
            style={{
                width: "100%",
                height: "100%"
            }}
            defaultLayout={layoutData}
            groups={groups}
            onLayoutChange={newLayout => saveLayout(newLayout)}
        />
    ) : (
        <React.Fragment />
    );
}
