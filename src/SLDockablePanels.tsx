import { ReactElement, createElement, useState, useEffect } from "react";

import { SLDockablePanelsContainerProps } from "../typings/SLDockablePanelsProps";

import { DockablePanels } from "./components/DockablePanels";

import "rc-dock/dist/rc-dock.css";
import "./ui/SLDockablePanels.css";

import { TabData } from "rc-dock";
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

    const [behaviour, setBehaviour] = useState(
        getBehavior(!!editable.value, !!dockable.value, !!floatable.value, !!sortable.value, !!closable.value)
    );
    const [tabs, setTabs] = useState<TabData[]>([]);
    const onLayoutChange = (layout: string) => {
        if (savedLayout) {
            savedLayout.setValue(layout);
        }
    };

    const initDockablePanels = () => {
        setTabs(
            panels.map(panel => {
                const panelNameValue = panel.name.value ? panel.name.value : "Panel";
                const panelName = `${name.toLowerCase()}_${panelNameValue.toLowerCase().replace(" ", "_")}`;
                const group = `${!behaviour.sortable ? panelName : "panel"}`;

                return {
                    id: `${panelName}-tab`,
                    title: panelNameValue,
                    content: panel.content as ReactElement,
                    closable: behaviour.closable,
                    group
                };
            })
        );
    };

    const getClassNames = () => {
        return classNames({
            [props.class]: true,
            "dockable-panel-container": true
        });
    };

    useEffect(() => {
        initDockablePanels();
    }, []);

    useEffect(() => {
        setBehaviour(
            getBehavior(!!editable.value, !!dockable.value, !!floatable.value, !!sortable.value, !!closable.value)
        );
    }, [editable, dockable, floatable, sortable, closable]);

    console.log(behaviour);

    return (
        <div className={getClassNames()} style={style}>
            <DockablePanels
                name={name}
                dockable={behaviour.dockable}
                floatable={behaviour.floatable}
                sortable={behaviour.sortable}
                closable={behaviour.closable}
                tabs={tabs}
                layout={savedLayout?.value}
                onLayoutChange={layout => onLayoutChange(layout)}
                deletedTabsEmpty={deletedTabsEmpty.value ? deletedTabsEmpty.value : "No removed tabs"}
                deletedTabsTitle={deletedTabsTitle.value ? deletedTabsTitle.value : "Removed tabs"}
            />
        </div>
    );
}
