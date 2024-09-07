import { Popover, Button } from "antd"
import { useState } from "react"
import { ManageTaskPopoverHeader } from "../../Task/ManageTaskPopovers/ManageTaskPopoverHeader"

export function ActionPopover({
    deleteBoard,
    leaveBoard,
    anchorEl,
    action,
    deleteTask,
    position = null,
}) {
    const [isOpen, setIsOpen] = useState(false)

    const [backToList, setBackToList] = useState(null)

    function onClose(e) {
        e.stopPropagation()
        setIsOpen(false)
    }

    function onBackToList() {
        setBackToList(null)
    }

    function onDeleteBoard(e) {
        e.stopPropagation()
        deleteBoard()
        setIsOpen(false)
    }
    function onDeleteTask(e) {
        e.stopPropagation()
        deleteTask()
        setIsOpen(false)
    }

    function onLeaveBoard(e) {
        e.stopPropagation()
        leaveBoard()
        setIsOpen(false)
    }
    return (
        <Popover
            className="close-board-popover"
            trigger="click"
            placement={position ? position : "bottomRight"}
            close={onClose}
            open={isOpen}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="close-board-popover-content">
                    <ManageTaskPopoverHeader
                        title={action}
                        close={onClose}
                        back={backToList}
                    />

                    {action === "Delete board?" && (
                        <section className="close-board-popover-body">
                            <p className="body-text">
                                You can find and reopen closed boards at the
                                bottom of your boards page.
                            </p>
                            <Button
                                className="close-btn"
                                size="small"
                                onClick={onDeleteBoard}
                            >
                                Delete
                            </Button>
                        </section>
                    )}
                    {action === "Leave board?" && (
                        <section className="close-board-popover-body">
                            <p className="body-text">
                                You will be removed from all cards on this
                                board.
                            </p>
                            <Button
                                className="close-btn"
                                size="small"
                                onClick={onLeaveBoard}
                            >
                                Leave
                            </Button>
                        </section>
                    )}
                    {action === "Delete card?" && (
                        <section className="close-board-popover-body">
                            <p className="body-text">
                                You won’t be able to re-open the card. There is
                                no undo.
                            </p>
                            <Button
                                className="close-btn"
                                size="small"
                                onClick={onDeleteTask}
                            >
                                Delete
                            </Button>
                        </section>
                    )}
                </section>
            }
        >
            {anchorEl}
        </Popover>
    )
}
