import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";

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
          task={task}
          onCloseTask={onClose}
          anchorEl={
            <button className="details-anchor-btn">
              <label className="trello-icon icon-move " />
              <label className="btn-label">Move</label>
            </button>
          }
        />
      ),
    },
    { svg: labelIcon, text: "Copy" },
    { svg: checkListIcon, text: "Make template" },
    {
      popover: (
        <button className="details-anchor-btn" onClick={onArchiveTask}>
          <label className="trello-icon icon-archive " />
          <label className="btn-label">Archive</label>
        </button>
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
