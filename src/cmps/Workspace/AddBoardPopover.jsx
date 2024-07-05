import { Popover, Input } from "antd"
import { useState, useEffect, useRef } from "react";
import { SvgButton } from "../CustomCpms/SvgButton";
import { ManageTaskPopoverHeader } from "../Task/ManageTaskPopovers/ManageTaskPopoverHeader";
import { Select } from "antd";
import { utilService } from "../../services/util.service";

const options = [
    { label: "Private", value: "private" },
    { label: "Workspace", value: "workspace" },
    { label: "Public", value: "public" },
];

export function AddBoardPopover({ onAddBoard }) {
    const [isOpen, setIsOpen] = useState(false);
    const [boardName, setBoardName] = useState("");
    const [focused, setFocused] = useState(false);


    function onClose() {
        setBoardName("");
        setIsOpen(false);
    }

    function handleFocus() {
        console.log("focus");
        setFocused(true);
    }

    function onCreateBoard() {
        if (boardName === "") {
            return;
        }
        const newBoard = utilService.createNewBoard({ name: boardName });
        onAddBoard(newBoard);

        onClose();
    }

    return (
        <Popover
            className="manage-labels-popover"
            trigger="click"
            placement="bottomRight"
            open={isOpen}
            close={onClose}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="add-board-popover-content">
                    <ManageTaskPopoverHeader title="Create board" close={onClose} />
                    <hr className="header-hr" />
                    <p className="title">Board title*</p>
                    <Input className="board-name-input" onFocus={handleFocus} onChange={(e) => setBoardName(e.target.value)} />
                    {focused && boardName === "" &&
                        <p className="add-board-popover-desc">
                            <span>👋</span>
                            <span> Board title is required</span>
                        </p>}
                    <p className="title">Visibility</p>
                    <Select className="board-visibility-select" options={options} defaultValue="workspace" />
                    <button className="add-board-btn" onClick={onCreateBoard}>Create</button>
                </section>
            }
        >
            <SvgButton className="board-add-btn" src="/img/workspace/pluseIcon.svg" />
        </Popover>
    );
}