import { Popover, Button } from "antd";
import { useState } from "react";
import { ManageTaskPopoverHeader } from "../../Task/ManageTaskPopovers/ManageTaskPopoverHeader";

export function ActionPopover({ closeBoard, leaveBoard, anchorEl, action }) {
  const [isOpen, setIsOpen] = useState(false);

  const [backToList, setBackToList] = useState(null);

  function onClose(e) {
    e.stopPropagation();
    setIsOpen(false);
  }

  function onNextPage(_) {
    setBackToList(() => onBackToList);
  }

  function onBackToList() {
    setBackToList(null);
  }

  function onCloseBoard(e) {
    e.stopPropagation();
    closeBoard();
    setIsOpen(false);
  }

  function onLeaveBoard(e) {
    e.stopPropagation();
    leaveBoard();
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
          <ManageTaskPopoverHeader
            title={action === "Close board" ? "Close board" : "Leave board?"}
            close={onClose}
            back={backToList}
          />

          {action === "Close board" && (
            <section className="close-board-popover-body">
              <p className="body-text">
                You can find and reopen closed boards at the bottom of your
                boards page.
              </p>
              <Button className="close-btn" size="small" onClick={onCloseBoard}>
                Close
              </Button>
            </section>
          )}
          {action === "Leave board?" && (
            <section className="close-board-popover-body">
              <p className="body-text">
                You will be removed from all cards on this board.
              </p>
              <Button className="close-btn" size="small" onClick={onLeaveBoard}>
                Leave
              </Button>
            </section>
          )}
        </section>
      }
    >
      {anchorEl}
    </Popover>
  );
}
