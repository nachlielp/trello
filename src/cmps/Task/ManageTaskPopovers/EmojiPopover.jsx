import Popup from "@atlaskit/popup";

import { useState } from "react";
import { utilService } from "../../../services/util.service";

export function EmojiPopover({ anchorEl, onAddEmojy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [backToList, setBackToList] = useState(null);

  function onClose() {
    setIsOpen(false);
  }

  const content = (
    <section className="emojy-popover">
      {utilService.getEmojis().map((e) => (
        <button className="btn" key={e} onClick={() => onAddEmojy(e)}>
          {e}
        </button>
      ))}
    </section>
  );
  const onTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const trigger = (triggerProps) => {
    return (
      <label
        {...triggerProps}
        appearance="primary"
        isSelected={isOpen}
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
