import file from "../../../../src/assets/svgs/file.svg";
import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import clockIcon from "/img/board-index/headerImgs/filterBtn-imgs/clockIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";

import { SvgButton } from "../../CustomCpms/SvgButton";

import { useNavigate } from "react-router-dom";

export function TaskDetailsActions({ task, editTask }) {
  const navigate = useNavigate();

  function onArchiveTask() {
    editTask({ ...task, closed: true });
  }

  const actions = [
    { svg: defaultProfile, text: "Move" },
    { svg: labelIcon, text: "Copy" },
    { svg: checkListIcon, text: "Make template" },
    { popover: <SvgButton src={clockIcon} className="floating-button" label="Archive" onClick={onArchiveTask} /> },
    { svg: file, text: "Share" },
  ];
  return (
    <section>
      <p>Actions</p>
      {actions.map((btn, index) => (
        <div key={index}>
          {btn.popover}
        </div>
      ))}
    </section>
  );
}
