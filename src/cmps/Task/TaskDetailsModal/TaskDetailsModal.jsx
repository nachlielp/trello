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
import { TaskDetailsLabels } from "./TaskDetailsLabels";
import { TaskDetailsMarkdown } from "./TaskDetailsMarkdown";
import { NameInput } from "../../CustomCpms/NameInput";
import { TaskDetailsCheckList } from "./TaskDetailsCheckList";

export function TaskDetailsModal({
  taskId,
  editTask,
  labelActions,
  onCloseTask,
  addTask,
  board,
  editBoard,
}) {
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

  function onClose(e) {
    if (e.key === "Escape") return;
    onCloseTask();
    navigate(`/b/${task.idBoard}`, { replace: true });
  }

  function onRenameTask(name) {
    editTask({ ...task, name });
  }

  if (!task) {
    return <></>;
  }

  const colorCoverHeader = (
    <section
      className={`details-header-color-cover`}
      style={{
        backgroundColor: utilService.getColorHashByName(task.cover.color)
          ?.bgColor,
      }}
    >
      <ManageCoverPopover
        anchorEl={
          <SvgButton src={coverIcon} className="cover-btn" label="Cover" />
        }
        editTask={editTask}
        task={task}
      />
    </section>
  );

  const imgCoverHeader = (
    <section
      className={`details-header-img-cover ${
        task?.cover?.brightness === "dark" ? "dark" : "light"
      }`}
      style={{
        backgroundColor: task?.cover?.bg,
      }}
    >
      {!!task?.cover?.scaled?.length > 0 && (
        <img src={task?.cover?.scaled[2].url} alt="task cover" />
      )}
      <article className={`details-header-cover-actions-wrapper`}>
        <ManageCoverPopover
          anchorEl={
            <SvgButton src={coverIcon} className="cover-btn" label="Cover" />
          }
          editTask={editTask}
          task={task}
        />
      </article>
    </section>
  );

  // checkList functions
  function changeCheckList(checkListId, changes) {
    const newTask = {
      ...task,
      checkLists: task.checkLists.map((c) =>
        c.id === checkListId ? { ...c, ...changes } : c
      ),
    };
    editTask(newTask);
  }
  
  function changeItem(checkListId, itemId, changes) {
    const newTask = {
      ...task,
      checkLists: task.checkLists.map((c) =>
        c.id === checkListId
          ? {
              ...c,
              checkItems: c.checkItems.map((i) =>
                i.id === itemId ? { ...i, ...changes } : i
              ),
            }
          : c
      ),
    };
    editTask(newTask);
  }

  async function deleteList(checkListId) {
    const newTask = {
      ...task,
      checkLists: task.checkLists.filter((c) => c.id !== checkListId),
    };

    if (!newTask.checkLists.length) {
      const newCheckListTaskIds = board.checkListTaskIds.filter(
        (i) => i !== task.id
      );

      await editBoard({ checkListTaskIds: newCheckListTaskIds });
    }
    await editTask(newTask);
  }

  function deleteItem(listId, itemId) {
    const newTask = {
      ...task,
      checkLists: task.checkLists.map((c) =>
        c.id === listId
          ? {
              ...c,
              checkItems: c.checkItems.filter((i) => i.id !== itemId),
            }
          : c
      ),
    };
    editTask(newTask);
  }

  async function createAsTask(name) {
    let maxPos = group.tasks.reduce(
      (max, item) => (item.pos > max ? item.pos : max),
      0
    );
    maxPos;
    const newTask = {
      name,
      pos: maxPos + 1000,
      groupId: task.idGroup,
    };

    await addTask(newTask);
  }

  return (
    <Modal
      open
      onCancel={onClose}
      loading={group == undefined}
      footer=""
      className="task-details"
    >
      {isColorCover && colorCoverHeader}
      {!!isImgCover && imgCoverHeader}
      <article className="details-header">
        <ReactSVG src={detailsIcon} className="icon" wrapper="span" />
        <span className="info">
          <NameInput
            className="task-name"
            value={task.name}
            maxRows={5}
            expandInputWidth={false}
            maxLength={null}
            onSubmit={onRenameTask}
          />
          <span className="task-group">
            in list{" "}
            <MoveCardPopover
              taskId={taskId}
              anchorEl={<a className="group-link">{group?.name}</a>}
              onCloseTask={onCloseTask}
            />
          </span>
        </span>
      </article>

      <main className="details-body">
        <section className="details-body__left">
          <article className="subsection">
            {hasMembers && (
              <TaskDetailsMembers currentTask={task} editTask={editTask} />
            )}
            {task.labels.length > 0 && <TaskDetailsLabels task={task} editTask={editTask} editLabel={editLabel} />}

          </article>
          <TaskDetailsMarkdown editTask={editTask} task={task} />
          {task.checkLists.length > 0 &&
            task.checkLists
              .sort((a, b) => a.pos - b.pos)
              .map((checkList) => (
                <TaskDetailsCheckList
                  checkList={checkList}
                  key={checkList.id}
                  changeCheckList={changeCheckList}
                  changeItem={changeItem}
                  deleteList={deleteList}
                  deleteItem={deleteItem}
                  createAsTask={createAsTask}
                />
              ))}
        </section>
        <section className="details-body__right">
          {!isMember && (
            <article className="suggestions">
              <p className="sub-title">Suggested</p>
              <SvgButton src={defaultProfile} label={"Join"} onClick={onJoin} />
            </article>
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
        </section>
      </main>
    </Modal>
  );
}
