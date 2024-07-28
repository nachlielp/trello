import { Popover } from "antd";

import { useState } from "react";
import { utilService } from "../../../services/util.service";

export function EmojiPopover({ anchorEl, onAddEmojy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [backToList, setBackToList] = useState(null);

  function onClose() {
    setIsOpen(false);
  }

  return (
    <Popover
      trigger="click"
      placement="topLeft"
      open={isOpen}
      close={onClose}
      onOpenChange={setIsOpen}
      arrow={false}
      content={
        <section className="emojy-popover">
          {utilService.getEmojis().map((e) => (
            <button className="btn" key={e} onClick={() => onAddEmojy(e)}>
              {e}
            </button>
          ))}
        </section>
      }
    >
      {anchorEl}
    </Popover>
  );
}
