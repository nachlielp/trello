import { Popover, Input } from "antd"
import { useState, useEffect } from "react";
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader";

export function TNAME({ anchorEl, editTask, task }) {
    const [isOpen, setIsOpen] = useState(false);
    const [backToList, setBackToList] = useState(null);

    const cardTitle = "ADD TITLE";

    function onClose() {
        setIsOpen(false);
    }

    function onNextPage(_) {
        //
        setBackToList(() => onBackToList);
    }

    function onBackToList() {
        //
        setBackToList(null);
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
                    <ManageTaskPopoverHeader title="cardTitle" close={onClose} back={backToList} />
                    {/* ADD BODY */}
                </section>
            }
        >
            {anchorEl}
        </Popover>
    );
}