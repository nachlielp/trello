import React, { useState } from "react";
import { Popover, Button } from "antd";
import { ManageTaskPopoverHeader } from "./ManageTaskPopoverHeader";

export function DeleteAttachmentPopover({
  anchorEl,
  popoverTitle,
  onDelete,
  onClose,
  isDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  const content = (
    <div
      className="delete-attachment-popover"
      onClick={(e) => e.stopPropagation()}
    >
      <ManageTaskPopoverHeader
        title={popoverTitle}
        close={() => setIsOpen(false)}
      />
      <section className="delete-label-page">
        <p>
          {isDelete
            ? "Deleting an attachment is permanent. There is no undo."
            : "Remove this attachment? There is no undo."}
        </p>
        <button className="delete-attachment-button" onClick={handleDelete}>
          Delete
        </button>
      </section>
    </div>
  );

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      open={isOpen}
      onOpenChange={handleOpenChange}
      placement="right"
    >
      {anchorEl}
    </Popover>
  );
}
