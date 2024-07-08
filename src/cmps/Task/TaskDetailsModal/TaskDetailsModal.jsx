import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MoveCardPopover } from "../ManageTaskPopovers/MoveCardPopover";
import { TaskDetailsAddToCard } from "./TaskDetailsAddToCard";
import { TaskDetailsActions } from "./TaskDetailsActions";
import { SvgButton } from "../../CustomCpms/SvgButton";
import { TaskDetailsMembers } from "./TaskDetailsMembers";
import { ManageCoverPopover } from "../ManageTaskPopovers/ManageCoverPopover";
import coverIcon from "/img/board-index/detailsImgs/coverIcon.svg";
import { ReactSVG } from "react-svg";
import detailsIcon from "/img/board-index/detailsImgs/detailsIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import { utilService } from "../../../services/util.service";
import { NameInput } from "../../CustomCpms/NameInput";
import TextArea from "antd/es/input/TextArea";

export function TaskDetailsModal({ taskId, editTask, editLabel, onCloseTask }) {
  const group = useSelector((state) =>
    state.boardModule.board.groups?.find((g) =>
      g.tasks?.find((t) => t.id === taskId)
    )
  );
  const task = useSelector((state) =>
    state.boardModule.board.groups
      ?.find((g) => g.tasks?.find((t) => t.id === taskId))
      ?.tasks.find((t) => t.id === taskId)
  );
  const user = useSelector((state) => state.userModule.user);
  const navigate = useNavigate();

  const isMember = task?.idMembers?.includes(user?.id);
  const hasMembers = task?.idMembers?.length > 0;
  const isImgCover = task?.cover?.idUploadedBackground;
  const isColorCover = task?.cover?.color;

  function onJoin() {
    editTask({
      ...task,
      idMembers: [...task.idMembers, user.id],
    });
  }

  function onClose() {
    onCloseTask();
    navigate(`/b/${task.idBoard}`, { replace: true });
  }

  function onRenameTask(name) {
    editTask({ ...task, name });
  }

  return (
    <Modal
      open
      onCancel={onClose}
      loading={group == undefined}
      footer=""
      className="task-details"
      title={
        isColorCover && (
          <div
            className={`details-header-color-cover`}
            style={{
              backgroundColor: utilService.getColorHashByName(task.cover.color)
                .bgColor,
            }}
          >
            <ManageCoverPopover
              anchorEl={
                <SvgButton
                  src={coverIcon}
                  className="cover-btn"
                  label="Cover"
                />
              }
              editTask={editTask}
              task={task}
            />
          </div>
        )
      }
    >
      {!!isImgCover && (
        <div
          className={`details-header-img-cover ${
            task?.cover?.brightness === "dark" ? "dark" : "light"
          }`}
          style={{
            backgroundColor: task?.cover?.bg,
          }}
        >
          {!!task?.cover?.scaled?.length > 0 && (
            <img src={task?.cover?.scaled[1].url} alt="task cover" />
          )}
          <div className={`details-header-cover-actions-wrapper`}>
            <ManageCoverPopover
              anchorEl={
                <SvgButton
                  src={coverIcon}
                  className="cover-btn"
                  label="Cover"
                />
              }
              editTask={editTask}
              task={task}
            />
          </div>
        </div>
      )}

      {task && (
        <div className="details-header">
          <ReactSVG src={detailsIcon} className="icon" wrapper="span" />
          <span className="info">
            <NameInput
              className="task-name"
              value={task.name}
              expandInputWidth={false}
              onSubmit={onRenameTask}
              autoSelect={false}
              maxRows={20}
            />
            {/* <TextArea autoSize={{ minRows: 1, maxRows: 20 }} /> */}
            <span className="task-group">
              in list{" "}
              <MoveCardPopover
                taskId={taskId}
                anchorEl={<a className="group-link">{group?.name}</a>}
                onCloseTask={onCloseTask}
              />
            </span>
          </span>
        </div>
      )}
      <div className="details-body">
        <div className="details-body__left">
          {/* Additional content here */}
          {/* {utilService.makeLorem(1000)} */}
          <section className="subsection">
            {hasMembers && (
              <TaskDetailsMembers currentTask={task} editTask={editTask} />
            )}
            {/* <div className="labels">
              <p>Labels</p>
            </div> */}
          </section>
        </div>
        <div className="details-body__right">
          {!isMember && (
            <section>
              <p>Suggested</p>
              <SvgButton src={defaultProfile} label={"Join"} onClick={onJoin} />
            </section>
          )}
          <TaskDetailsAddToCard
            task={task}
            editTask={editTask}
            editLabel={editLabel}
          />
          <TaskDetailsActions
            task={task}
            editTask={editTask}
            onClose={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}
