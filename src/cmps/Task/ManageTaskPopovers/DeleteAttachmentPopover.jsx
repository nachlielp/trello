import React, { useState } from "react";
import Popup from "@atlaskit/popup";
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

  const onTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const trigger = (triggerProps) => {
    return (
      <label
        {...triggerProps}
        appearance="primary"
        // isSelected={isOpen}
        onClick={onTriggerClick}
      >
        {anchorEl}
      </label>
    );
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      fallbackPlacements={["top-start", "auto"]}
      content={() => content}
      trigger={trigger}
      zIndex={10000}
    />
  );
}
