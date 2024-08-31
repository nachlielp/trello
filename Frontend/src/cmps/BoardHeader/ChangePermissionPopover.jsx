import Popup from "@atlaskit/popup";
import { useState } from "react";

export function ChangePermissionPopover({
  anchorEl,
  onChange,
  memberId = "",
  myOptions,
  currenOption = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const trigger = (triggerProps) => {
    return (
      <button
        className="permission-button"
        {...triggerProps}
        // appearance="primary"
        // isSelected={isOpen}
        onClick={onTriggerClick}
      >
        {anchorEl}
      </button>
    );
  };

  function onChangeState(option, id) {
    if (onChange) {
      onChange({ option, id });
    }
    setIsOpen(false);
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-end"
      fallbackPlacements={["top-end", "auto"]}
      content={() => (
        <section className="permission-select">
          {myOptions && (
            <span className="warning">
              Changing your role will remove admin privileges and can only be
              undone by another admin.
            </span>
          )}
          <div
            className={`option ${currenOption === "admin" ? "current" : ""}`}
            onClick={() => onChangeState("admin", memberId)}
          >
            Admin
          </div>
          <div
            className={`option ${currenOption === "member" ? "current" : ""}`}
            onClick={() => onChangeState("member", memberId)}
          >
            Member
          </div>
          <div
            className={`option `}
            onClick={() => onChangeState("kick", memberId)}
          >
            {myOptions ? "Leave" : "Remove from"} board
          </div>
        </section>
      )}
      trigger={trigger}
      zIndex={10000}
    />
  );
}
