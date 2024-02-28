import classNames from "classnames";
import DockLayout, { DockContext, DropDirection, LayoutBase, LayoutData, TabBase, TabData, TabGroup } from "rc-dock";
import React, { useEffect, useRef, createElement, useState } from "react";
import { isPanelData } from "src/utils/dockable";
import { getCircularReplacer } from "src/utils/json";
import RemovedTabsMenu from "./RemovedTabsMenu";

export interface CustomTabData extends TabData {
    visible: boolean;
}

interface Props {
    name: string;
    dockable: boolean;
    floatable: boolean;
    sortable: boolean;
    closable: boolean;
    tabs: CustomTabData[];
    layout?: string;
    deletedTabsTitle: string;
    deletedTabsEmpty: string;
    onLayoutChange?: (layout: string) => void;
}

type Group = { [key: string]: TabGroup };

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
    const initRef = useRef(false);
    const [layoutData, setLayoutData] = useState<LayoutData>();
    const [groups, setGroups] = useState<Group>();
    const [_, setSavedLayout] = useState<LayoutBase>();
    const allTabs = useRef<CustomTabData[]>([]);

    const loadTab = (tab: TabBase) => {
        const { id } = tab;
        const tabData = allTabs.current.find(it => it.id === id);

        return { ...tabData!, closable };
    };

    const initLayout = () => {
        allTabs.current = tabs;

        const layoutTabs: TabData[] = tabs
            .filter(it => it.visible)
            .map(tab => {
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

        const groups: Group = {};

        layoutTabs.forEach(tab => {
            if (!sortable && tab.group) {
                groups[tab.group] = defaulTabGroup;
            }
        });

        setGroups({
            panel: defaulTabGroup,
            ...groups
        });

        initRef.current = true;
    };

    const saveLayout = (layout: LayoutBase, direction: DropDirection | undefined) => {
        if (direction !== "active") {
            if (!sortable && !dockable && !closable && !floatable) {
                return;
            }
        }

        setLayoutData({ ...layout } as LayoutData);
        setSavedLayout({ ...layout });

        if (onLayoutChange) {
            onLayoutChange(JSON.stringify(layout));
        }
    };

    const loadLayout = (layout: string) => {
        setLayoutData({ ...JSON.parse(layout) });
    };

    const updateLayoutBehaviour = (dock: DockLayout, groups: Group) => {
        const layoutData = dock.getLayout();

        layoutData.dockbox.children.forEach(child => {
            if (isPanelData(child)) {
                child.tabs = child.tabs.map(it => {
                    return {
                        ...it,
                        closable
                    };
                });
            }
        });

        Object.keys(groups).forEach(key => {
            const group = groups[key];

            group.disableDock = !dockable;
            group.floatable = floatable;
            group.panelExtra = (tabData, dockContext) =>
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
                );
        });

        setGroups({ ...groups });
        setLayoutData({ ...layoutData });
    };

    useEffect(() => {
        if (tabs.length && !initRef.current) {
            initLayout();
        }
    }, [JSON.stringify(allTabs.current, getCircularReplacer()) !== JSON.stringify(tabs, getCircularReplacer())]);

    useEffect(() => {
        if (dockLayoutRef.current && layoutData && layout) {
            loadLayout(layout);
        }
    }, [layout]);

    useEffect(() => {
        if (dockLayoutRef.current && groups) {
            updateLayoutBehaviour(dockLayoutRef.current, groups);
        }
    }, [dockable, floatable, sortable, closable]);

    useEffect(() => {
        return () => {
            if (dockLayoutRef.current) {
                dockLayoutRef.current = null;
            }
        };
    }, []);

    return layoutData && groups ? (
        <div
            className={classNames({
                "dock-layout-container": true,
                notSortable: !sortable,
                notClosable: !closable,
                notResizable: !dockable
            })}
        >
            <DockLayout
                ref={dockLayoutRef}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                layout={{ ...layoutData }}
                loadTab={loadTab}
                groups={groups}
                onLayoutChange={(newLayout, _, direction) => saveLayout(newLayout, direction)}
            />
        </div>
    ) : (
        <React.Fragment />
    );
}
