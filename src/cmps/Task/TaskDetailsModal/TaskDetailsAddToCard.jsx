import defaultProfile from "/img/defaultProfile.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";
import { useState, useEffect } from "react";
import coverIcon from "/img/board-index/detailsImgs/coverIcon.svg";
import fieldsIcon from "/img/board-index/detailsImgs/fieldsIcon.svg";
import file from "../../../../src/assets/svgs/file.svg";
import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import clockIcon from "/img/board-index/headerImgs/filterBtn-imgs/clockIcon.svg";
// import userIcon from "/img/board-index/headerImgs/filterBtn-imgs/userIcon.svg";

import { SvgButton } from "../../CustomCpms/SvgButton";
import { ManageMembersPopover } from "../ManageTaskPopovers/ManageMembersPopover";
import { ManageLabelsPopover } from "../ManageTaskPopovers/ManageLabelsPopover";
import { ManageCoverPopover } from "../ManageTaskPopovers/ManageCoverPopover";

export function TaskDetailsAddToCard({ task, editTask, editLabel }) {
  const [isCover, setIsCover] = useState(false);
  useEffect(() => {
    setIsCover(task?.cover?.color || task?.cover?.idUploadedBackground);
  }, [task?.cover?.color, task?.cover?.idUploadedBackground]);


  const addToCard = [
    {
      popover:
        <ManageMembersPopover
          anchorEl={
            <SvgButton
              src={defaultProfile}
              className="floating-button"
              label="Change members"
            />
          }
          editTask={editTask}
          task={task}
        />
    },
    {
      popover:
        <ManageLabelsPopover
          anchorEl={
            <SvgButton
              src={labelIcon}
              className="floating-button"
              label="Edit labels"
            />
          }
          taskLabels={task?.labels}
          editTask={editTask}
          task={task}
          editLabel={editLabel}
        />
    },
    { svg: checkListIcon, text: "Checklist" },
    { svg: clockIcon, text: "Dates" },
    { svg: file, text: "Attachment" },
    {
      popover: !isCover ? (
        <ManageCoverPopover
          anchorEl={
            <SvgButton src={coverIcon} className="floating-button" label="Change cover" />
          }
          editTask={editTask}
          task={task}
        />
      ) : (
        <></>
      )
    },
    { svg: fieldsIcon, text: "Custom Fields" },
  ];
  return (
    <section className="tittle">
      <p>Add to card</p>
      {addToCard.map((btn, index) => (
        <div key={index}>
          {btn.popover}
        </div>
      ))}
    </section>
  );
}
