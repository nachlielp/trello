import { Popover, Input } from "antd"
import { useState, useEffect } from "react";
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader";

export function TNAME({ anchorEl, editTask, task }) {
    const [isOpen, setIsOpen] = useState(false);

    const cardTitle = "ADD TITLE";

    function onClose() {
        setIsOpen(false);
    }

    return (
        <Popover
            className="manage-labels-popover"
            trigger="click"
            placement="bottomRight"
            open={isOpen}
            close={() => { }}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="manage-labels-content">
                    <ManageTaskPopoverHeader title={cardTitle} close={onClose} />
                    {/* ADD BODY */}
                </section>
            }
        >
            {anchorEl}
        </Popover>
    );
}