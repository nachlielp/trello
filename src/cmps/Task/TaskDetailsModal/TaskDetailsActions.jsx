import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import clockIcon from "/img/board-index/headerImgs/filterBtn-imgs/clockIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";
import moveIcon from "/img/taskActionBtns/moveIcon.svg";

import { SvgButton } from "../../CustomCpms/SvgButton";

import { useNavigate } from "react-router-dom";
import { MoveCardPopover } from "../ManageTaskPopovers/MoveCardPopover";

export function TaskDetailsActions({ task, editTask, onClose }) {
  const navigate = useNavigate();

  function onArchiveTask() {
    editTask({ ...task, closed: true });
  }
  // /////////////////
  const actions = [
    { svg: defaultProfile, text: "Move" },
    {
      popover: (
        <MoveCardPopover
          taskId={task.id}
          onCloseTask={onClose}
          anchorEl={
            <SvgButton
              src={moveIcon}
              label="Move"
              className="floating-button"
            />
          }
        />
      ),
    },
    { svg: labelIcon, text: "Copy" },
    { svg: checkListIcon, text: "Make template" },
    {
      popover: (
        <SvgButton src={clockIcon} label="Archive" onClick={onArchiveTask} />
      ),
    },
    { svg: "/img/taskBadges/file.svg", text: "Share" },
  ];
  return (
    <section>
      <p className="sub-title">Actions</p>
      {actions.map((btn, index) => (
        <div key={index}>{btn.popover}</div>
      ))}
    </section>
  );
}
