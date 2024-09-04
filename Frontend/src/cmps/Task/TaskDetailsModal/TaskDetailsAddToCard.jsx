import { useState, useEffect } from "react";
import fieldsIcon from "/img/board-index/detailsImgs/fieldsIcon.svg";
import { ManageDatesPopover } from "../ManageTaskPopovers/ManageDatesPopover";
import { ManageAttachmentsPopover } from "../ManageTaskPopovers/ManageAttachmentsPopover";
import { ManageMembersPopover } from "../ManageTaskPopovers/ManageMembersPopover";
import { ManageLabelsPopover } from "../ManageTaskPopovers/ManageLabelsPopover";
import { ManageCoverPopover } from "../ManageTaskPopovers/ManageCoverPopover";
import { AddChecklistPopover } from "../ManageTaskPopovers/AddChecklistPopover";

export function TaskDetailsAddToCard({
  task,
  editTask,
  labelActions,
  editBoard,
}) {
  const [isCover, setIsCover] = useState(false);
  useEffect(() => {
    setIsCover(task?.cover?.color || task?.cover?.idUploadedBackground);
  }, [task?.cover?.color, task?.cover?.idUploadedBackground]);

  const addToCard = [
    {
      popover: (
        <ManageMembersPopover
          anchorEl={
            <button className="details-anchor-btn">
              <label className="pyello-icon icon-member " />
              <label className="btn-label">Members</label>
            </button>
          }
          editTask={editTask}
          task={task}
        />
      ),
    },
    {
      popover: (
        <ManageLabelsPopover
          anchorEl={
            <button className="details-anchor-btn">
              <label className="pyello-icon icon-label " />
              <label className="btn-label">Labels</label>
            </button>
          }
          taskLabels={task?.labels}
          editTask={editTask}
          task={task}
          labelActions={labelActions}
        />
      ),
    },
    {
      popover: (
        <AddChecklistPopover
          anchorEl={
            <label className="details-anchor-btn">
              <label className="pyello-icon icon-checklist " />
              <label className="btn-label">Checklists</label>
            </label>
          }
          editBoard={editBoard}
          task={task}
          editTask={editTask}
        />
      ),
    },
    {
      popover: (
        <ManageDatesPopover
          editBoard={editBoard}
          task={task}
          editTask={editTask}
          anchorEl={
            // <SvgButton
            //   src={clockIcon}
            //   className="floating-button"
            //   label="Dates"
            // />
            <button className="details-anchor-btn">
              <label className="pyello-icon icon-clock " />
              <label className="btn-label">Dates</label>
            </button>
          }
        />
      ),
    },
    {
      popover: (
        <ManageAttachmentsPopover
          task={task}
          editTask={editTask}
          editBoard={editBoard}
          anchorEl={
            <button className="details-anchor-btn">
              <label className="pyello-icon icon-attachment " />
              <label className="btn-label">Attachments</label>
            </button>
          }
        />
      ),
    },
    {
      popover: !isCover ? (
        <ManageCoverPopover
          anchorEl={
            <button className="details-anchor-btn" style={{ width: "100%" }}>
              <label className="pyello-icon icon-card-cover " />
              <label className="btn-label">Cover</label>
            </button>
          }
          editTask={editTask}
          task={task}
          isFullWidth={true}
        />
      ) : (
        <></>
      ),
    },
    { svg: fieldsIcon, text: "Custom Fields" },
  ];
  return (
    <section className="tittle">
      <p className="sub-title">Add to card</p>
      {addToCard.map((btn, index) => (
        <div key={index}>{btn.popover}</div>
      ))}
    </section>
  );
}
