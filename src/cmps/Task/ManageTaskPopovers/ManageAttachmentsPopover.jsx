import { Popover, Calendar, Card, Input, Checkbox } from "antd";
import { ManageTaskPopoverHeader } from "./ManageTaskPopoverHeader";
import dayjs from "dayjs";
import { useState, useRef, useEffect } from "react";
import { SvgButton } from "../../CustomCpms/SvgButton";
import { CustomSelect } from "../../CustomCpms/CustomSelect";
import { utilService } from "../../../services/util.service";
import { useSelector } from "react-redux";

export function ManageAttachmentsPopover({
  anchorEl,
  task,
  editTask,
  editBoard,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger="click"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      content={
        // <ManageDatesPopoverContent
        //   editBoard={editBoard}
        //   task={task}
        //   editTask={editTask}
        //   onClose={onClose}
        // />
        <ManageAttachmentsPopoverContent
          task={task}
          editTask={editTask}
          onClose={onClose}
        />
      }
      placement="right"
    >
      {anchorEl}
    </Popover>
  );
}

function ManageAttachmentsPopoverContent({ task, editTask, onClose }) {
  return <div>ManageAttachmentsPopoverContent</div>;
}
