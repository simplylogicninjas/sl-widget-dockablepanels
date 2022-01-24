import classNames from "classnames";
import React, { createElement, ReactNode, useEffect, useState, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";

interface Props {
    visible: boolean;
    trigger: HTMLElement | null;
    content: ReactNode;
}

export interface PopoverRef {
    update: () => void;
    getMenuElement: () => HTMLElement | null;
}

const Popper = React.forwardRef<PopoverRef | undefined, Props>(({ visible, trigger, content }: Props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
    const { styles, attributes, update } = usePopper(trigger, menuElement, {
        placement: "bottom-end"
    });

    useImperativeHandle(ref, () => ({
        update: () => {
            update?.();
        },
        getMenuElement: () => menuElement
    }));

    const getMenuClassNames = () => {
        return classNames({
            "removed-tabs-menu": true,
            "is-visible": isVisible,
            "is-hidden": !isVisible
        });
    };

    const renderMenu = () => {
        return (
            <div
                ref={setMenuElement}
                role="menu"
                className={getMenuClassNames()}
                style={styles.popper}
                {...attributes.popper}
            >
                <div className={"removed-tabs-menu__content"}>{content}</div>
            </div>
        );
    };

    useEffect(() => {
        let timeoutId: any;
        if (visible) {
            timeoutId = setTimeout(() => setIsVisible(true), 50);
        } else {
            setIsVisible(false);
        }

        return () => clearTimeout(timeoutId);
    }, [visible]);

    return ReactDOM.createPortal(renderMenu(), document.body);
});

export default Popper;
