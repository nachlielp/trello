import { Modal } from "antd";
import { useState } from "react";
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
import { utilService } from "../../../services/util.service";
import { TaskDetailsLabels } from "./TaskDetailsLabels";
import { TaskDetailsMarkdown } from "./TaskDetailsMarkdown";
import { NameInput } from "../../CustomCpms/NameInput";
import { TaskDetailsCheckList } from "./TaskDetailsCheckList";
import { TaskDetailsDates } from "./TaskDetailsDates";
import { updateBoard } from "../../../store/board.actions";
import { TaskDetailsAttachment } from "./TaskDetailsAttachment";
import { ManageAttachmentsPopover } from "../ManageTaskPopovers/ManageAttachmentsPopover";

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
  const [openedInputId, setOpenedInputId] = useState(null);

  const user = useSelector((state) => state.userModule.user);
  const navigate = useNavigate();

  const isMember = task?.idMembers?.includes(user?.id);
  const hasMembers = task?.idMembers?.length > 0;
  const isImgCover = task?.cover?.idUploadedBackground;
  const isColorCover = task?.cover?.color;

  function onJoin() {
    const newActivity = utilService.createActivity(
      {
        type: "joinTask",
        targetId: task.id,
        targetName: task.name,
      },
      user
    );

    updateBoard({
      ...board,
      activities: [...board?.activities, newActivity],
    });
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
      className={`details-header-img-cover ${task?.cover?.brightness}`}
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
            <SvgButton
              src={coverIcon}
              className={`cover-btn ${task?.cover?.brightness}`}
              label="Cover"
            />
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

  async function deleteList(checkList) {
    const newActivity = utilService.createActivity(
      {
        type: "removeCheckList",
        targetId: task.id,
        targetName: task.name,
        checklistName: checkList.name,
      },
      user
    );
    const newTask = {
      ...task,
      checkLists: task.checkLists.filter((c) => c.id !== checkList.id),
    };

    if (!newTask.checkLists.length) {
      const newCheckListTaskIds = board.checkListTaskIds.filter(
        (i) => i !== task.id
      );

      await editBoard({
        ...board,
        checkListTaskIds: newCheckListTaskIds,
        activities: [...board?.activities, newActivity],
      });
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
      idBoard: task.idBoard,
    };

    await addTask(newTask, user, group);
  }
  function onSetOpenId(id) {
    setOpenedInputId(id);
  }

  return (
    <Modal
      open
      onCancel={onClose}
      loading={group == undefined}
      footer=""
      className={`task-details ${task?.cover?.brightness}`}
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
              task={task}
              anchorEl={<a className="group-link">{group?.name}</a>}
              onCloseTask={onCloseTask}
            />
          </span>
        </span>
      </article>

      <main className="details-body">
        <section className="details-body__left">
          <article className="subsection wrap-section">
            {hasMembers && (
              <TaskDetailsMembers currentTask={task} editTask={editTask} />
            )}
            {task?.idLabels?.length > 0 && (
              <TaskDetailsLabels
                task={task}
                editTask={editTask}
                labelActions={labelActions}
              />
            )}
            {(task.start || task.due) && (
              <TaskDetailsDates
                task={task}
                editTask={editTask}
                editBoard={editBoard}
              />
            )}
          </article>
          <TaskDetailsMarkdown editTask={editTask} task={task} />
          {task?.checkLists?.length > 0 &&
            task?.checkLists
              ?.sort((a, b) => a.pos - b.pos)
              .map((checkList) => (
                <TaskDetailsCheckList
                  task={task}
                  checkList={checkList}
                  key={checkList.id}
                  changeCheckList={changeCheckList}
                  changeItem={changeItem}
                  deleteList={deleteList}
                  deleteItem={deleteItem}
                  createAsTask={createAsTask}
                  openedInputId={openedInputId}
                  setOpenedInputId={onSetOpenId}
                  editBoard={editBoard}
                />
              ))}
          {task?.attachments?.length > 0 && (
            <section className="attachments-section">
              <header className="task-details-section-header">
                <ReactSVG
                  src="/img/taskBadges/file.svg"
                  wrapper="span"
                  className="section-icon"
                />
                <h3 className="section-title">Attachments</h3>
                <ManageAttachmentsPopover
                  task={task}
                  editTask={editTask}
                  anchorEl={<button className="add-attachment-btn">Add</button>}
                  editBoard={editBoard}
                />
              </header>
              {task?.attachments.map((attachment) => (
                <TaskDetailsAttachment
                  key={attachment.id}
                  attachment={attachment}
                  editTask={editTask}
                  task={task}
                  editBoard={editBoard}
                />
              ))}
            </section>
          )}
        </section>
        <section className="details-body__right">
          {!isMember && (
            <article className="suggestions">
              <p className="sub-title">Suggested</p>
              <button className="details-anchor-btn" onClick={onJoin}>
                <label className="trello-icon icon-member " />
                <label className="btn-label">Join</label>
              </button>
            </article>
          )}
          <TaskDetailsAddToCard
            task={task}
            editTask={editTask}
            labelActions={labelActions}
            editBoard={editBoard}
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
