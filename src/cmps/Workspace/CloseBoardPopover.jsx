import { Popover, Input, Button } from "antd"
import { useState, useEffect } from "react";
import { ManageTaskPopoverHeader } from "../Task/ManageTaskPopovers/ManageTaskPopoverHeader";
import { EllipsisOutlined } from "@ant-design/icons";
import { ReactSVG } from "react-svg";

export function CloseBoardPopover({ boardName, boardId, onSelectBoardOptions, closeBoard, leaveBoard }) {
    const [isOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [backToList, setBackToList] = useState(null);

    const cardTitle = "ADD TITLE";

    function onClose(e) {
        e.stopPropagation();
        setIsOpen(false);
        setAction(null);
    }

    function onNextPage(_) {
        setBackToList(() => onBackToList);
    }

    function onBackToList() {
        setAction(null);
        setBackToList(null);
    }

    function onOpenPopover(e) {
        e.stopPropagation();
        setIsOpen(true);
        onSelectBoardOptions(boardId);
    }

    function onCloseBoard() {
        closeBoard(boardId);
        setIsOpen(false);
    }

    function onLeaveBoard() {
        leaveBoard(boardId);
        setIsOpen(false);
    }
    return (
        <Popover
            className="close-board-popover"
            trigger="click"
            placement="bottomRight"
            close={onClose}
            open={isOpen}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="close-board-popover-content">
                    <ManageTaskPopoverHeader title={action === "Close board" ? "Close board" : boardName} close={onClose} back={backToList} />

                    {
                        action === null && (
                            <section className="popover-body">
                                <article className="archive-option" onClick={(e) => {
                                    e.stopPropagation();
                                    setAction("Close board");
                                    onSelectBoardOptions(boardId);
                                    onNextPage();
                                }}>
                                    <p>Close board</p> <ReactSVG src="/img/workspace/more.svg" />
                                </article>
                                <article className="archive-option" onClick={(e) => {
                                    e.stopPropagation();
                                    setAction("Leave board?");
                                    onSelectBoardOptions(boardId);
                                    onNextPage();
                                }}>
                                    <p>Leave board</p> <ReactSVG src="/img/workspace/more.svg" />
                                </article>
                            </section>
                        )
                    }
                    {
                        action === "Close board" && (
                            <section className="close-board-popover-body">
                                <p className="body-text">You can find and reopen closed boards at the bottom of your boards page.</p>
                                <Button className="close-btn" size="small" onClick={onCloseBoard}>
                                    Close
                                </Button>
                            </section>
                        )
                    }
                    {
                        action === "Leave board?" && (
                            <section className="close-board-popover-body">
                                <p className="body-text">You will be removed from all cards on this board.</p>
                                <Button className="close-btn" size="small" onClick={onLeaveBoard}>
                                    Leave
                                </Button>
                            </section>
                        )
                    }
                </section>
            }
        >
            <Button className="more-btn" size="small" onClick={onOpenPopover} >
                <EllipsisOutlined />
            </Button>
        </Popover>
    );
}