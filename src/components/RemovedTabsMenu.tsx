import DockLayout, { DockContext, TabData } from "rc-dock";
import React, { createElement, useEffect, useRef, useState } from "react";
import RemovedTabsList from "./RemovedTabsList";
import Popper, { PopoverRef } from "./Popper";
import { eventOutsideTarget } from "src/utils/eventOutsideTarget";
import { eventInsideTarget } from "src/utils/eventInsideTarget";
import SettingsIcon from "./icons/SettingsIcon";

interface Props {
    allTabs: TabData[];
    dockLayout: DockLayout | null;
    dockContext: DockContext;
    tabId: string;
    deletedTabsTitle: string;
    deletedTabsEmpty: string;
}

const RemovedTabsMenu = ({ allTabs, dockLayout, dockContext, tabId, deletedTabsEmpty, deletedTabsTitle }: Props) => {
    const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
    const [menuVisible, _setMenuVisible] = useState(false);
    const isVisibleRef = useRef(false);
    const popover = useRef<PopoverRef>();

    const setMenuVisible = (visible: boolean) => {
        isVisibleRef.current = visible;
        _setMenuVisible(visible);
    };

    const showMenu = () => {
        popover?.current?.update();
        setMenuVisible(true);
    };

    const hideMenu = () => {
        setMenuVisible(false);
    };

    const renderRemovedTabsList = () => {
        return (
            <RemovedTabsList
                allTabs={allTabs}
                dockLayout={dockLayout}
                dockContext={dockContext}
                tabId={tabId}
                deletedTabsEmpty={deletedTabsEmpty}
                deletedTabsTitle={deletedTabsTitle}
            />
        );
    };

    const registerOutsideHover = (event: MouseEvent | TouchEvent) => {
        const targetOutside = eventOutsideTarget(event, popover.current, triggerElement);

        if (targetOutside) {
            hideMenu();
        }
    };

    const registerInsideHover = (event: MouseEvent | TouchEvent) => {
        const targetInside = eventInsideTarget(event, popover.current, triggerElement);

        if (targetInside) {
            showMenu();
        }
    };

    useEffect(() => {
        if (triggerElement) {
            document.addEventListener("mouseover", registerInsideHover);
            document.addEventListener("touchstart", registerInsideHover);
            document.addEventListener("mouseover", registerOutsideHover);
            document.addEventListener("touchstart", registerOutsideHover);
        }

        return () => {
            document.removeEventListener("mouseover", registerInsideHover);
            document.removeEventListener("touchstart", registerInsideHover);
            document.removeEventListener("mouseover", registerOutsideHover);
            document.removeEventListener("touchstart", registerOutsideHover);
        };
    }, [triggerElement]);

    return (
        <React.Fragment>
            <div ref={setTriggerElement} className="more-button-container">
                <button className="more-button">
                    <SettingsIcon />
                </button>
            </div>
            {menuVisible && (
                <Popper
                    ref={popover}
                    visible={menuVisible}
                    trigger={triggerElement}
                    content={renderRemovedTabsList()}
                />
            )}
        </React.Fragment>
    );
};

export default RemovedTabsMenu;
