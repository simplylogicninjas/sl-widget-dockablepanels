import DockLayout, { DockContext, TabData } from "rc-dock";
import { createElement } from "react";
import PlusIcon from "./icons/PlusIcon";

interface Props {
    tabId: string;
    allTabs: TabData[];
    dockLayout: DockLayout | null;
    dockContext: DockContext;
    deletedTabsTitle: string;
    deletedTabsEmpty: string;
}

const findTab = (id: string, dockLayout: DockLayout | null) => {
    return dockLayout && dockLayout.find(id);
};

const getRemovedTabs = (allTabs: TabData[], dockLayout: DockLayout | null) => {
    return allTabs.filter(it => {
        return !(it.id && findTab(it.id, dockLayout));
    });
};

const RemovedTabsList = ({ allTabs, dockLayout, dockContext, tabId, deletedTabsEmpty, deletedTabsTitle }: Props) => {
    const restoreTab = (dockContext: DockContext, targetTabId: string, tab: TabData) => {
        dockContext.dockMove(tab, targetTabId, "middle");
    };

    const renderItems = () => {
        const removedTabs = getRemovedTabs(allTabs, dockLayout);

        if (removedTabs.length === 0) {
            return <li className="removed-tabs-list__empty">{deletedTabsEmpty}</li>;
        }

        return removedTabs.map(it => {
            return (
                <li key={it.id}>
                    <button className="removed-tabs-list__button" onClick={() => restoreTab(dockContext, tabId, it)}>
                        <span>{it.title}</span>
                        <PlusIcon />
                    </button>
                </li>
            );
        });
    };

    return (
        <div className="removed-tabs-list">
            <span className="removed-tabs-list__title">{deletedTabsTitle}</span>
            <ul className="removed-tabs-list__items">{renderItems()}</ul>
        </div>
    );
};

export default RemovedTabsList;
