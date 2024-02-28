import { ReactElement, createElement, useState, useEffect, useRef } from "react";
import { ValueStatus } from "mendix";

import { PanelsType, SLDockablePanelsContainerProps } from "../typings/SLDockablePanelsProps";

import { CustomTabData, DockablePanels } from "./components/DockablePanels";

import "rc-dock/dist/rc-dock.css";
import "./ui/SLDockablePanels.css";

import classNames from "classnames";

const getBehavior = (
    editable: boolean,
    dockable: boolean,
    floatable: boolean,
    sortable: boolean,
    closable: boolean
) => {
    return editable
        ? {
              dockable,
              floatable,
              sortable,
              closable
          }
        : {
              dockable: false,
              floatable: false,
              sortable: false,
              closable: false
          };
};

export function SLDockablePanels(props: SLDockablePanelsContainerProps): ReactElement {
    const {
        name,
        editable,
        dockable,
        floatable,
        sortable,
        closable,
        style,
        panels,
        savedLayout,
        deletedTabsEmpty,
        deletedTabsTitle
    } = props;

    const panelsRef = useRef<PanelsType[]>([]);
    const layoutRef = useRef<string>();

    const [layout, setLayout] = useState<string>();

    const [behaviour, setBehaviour] = useState(
        getBehavior(!!editable.value, !!dockable.value, !!floatable.value, !!sortable.value, !!closable.value)
    );
    const [tabs, setTabs] = useState<CustomTabData[]>([]);
    const onLayoutChange = (layout: string) => {
        if (savedLayout && layoutRef.current !== layout) {
            savedLayout.setValue(layout);
        }
    };

    const initDockablePanels = () => {
        panelsRef.current = panels;

        const tabs = panels
            .map(panel => {
                const panelNameValue = panel.name.value ? panel.name.value : "Panel";
                const panelName = `${name.toLowerCase()}_${panelNameValue.toLowerCase().replace(" ", "_")}`;
                // const group = `${!behaviour.sortable ? panelName : "panel"}`;

                return {
                    id: `${panelName}-tab`,
                    title: panelNameValue,
                    content: panel.content as ReactElement,
                    closable: behaviour.closable,
                    group: "tab",
                    cached: true,
                    visible: !!panel.visible.value
                };
            })
            .filter(it => it.visible);

        setTabs([...tabs]);
    };

    const getClassNames = () => {
        return classNames({
            [props.class]: true,
            "dockable-panel-container": true
        });
    };

    useEffect(() => {
        initDockablePanels();
    }, [JSON.stringify(panels) !== JSON.stringify(panelsRef.current)]);

    useEffect(() => {
        setBehaviour(
            getBehavior(!!editable.value, !!dockable.value, !!floatable.value, !!sortable.value, !!closable.value)
        );
    }, [editable.value, dockable.value, floatable.value, sortable.value, closable.value]);

    useEffect(() => {
        if (savedLayout?.status === ValueStatus.Available) {
            setLayout(savedLayout.value);
        }
    }, [savedLayout?.status, savedLayout?.value]);

    return (
        <div className={getClassNames()} style={style}>
            <DockablePanels
                name={name}
                dockable={behaviour.dockable}
                floatable={behaviour.floatable}
                sortable={behaviour.sortable}
                closable={behaviour.closable}
                tabs={tabs}
                layout={layout}
                onLayoutChange={layout => onLayoutChange(layout)}
                deletedTabsEmpty={deletedTabsEmpty.value ? deletedTabsEmpty.value : "No removed tabs"}
                deletedTabsTitle={deletedTabsTitle.value ? deletedTabsTitle.value : "Removed tabs"}
            />
        </div>
    );
}
