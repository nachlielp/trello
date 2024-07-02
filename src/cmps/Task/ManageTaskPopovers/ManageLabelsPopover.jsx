import { Popover, Input } from "antd"
import { useState, useEffect } from "react";
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader";

export function ManageLabelsPopover({ anchorEl, editTask, task }) {
    const [isOpen, setIsOpen] = useState(false);


    function onClose() {
        setIsOpen(false);
    }

    return (
        <Popover
            className="manage-labels-popover"
            trigger="click"
            placement="bottomLeft"
            open={isOpen}
            close={() => { }}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="manage-labels-content">
                    <ManageTaskPopoverHeader title="Add members" close={onClose} />

                </section>
            }
        >
            {anchorEl}
        </Popover>
    );
}