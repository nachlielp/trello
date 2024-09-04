import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";

import { MoveCardPopover } from "../ManageTaskPopovers/MoveCardPopover";
import { updateBoard } from "../../../store/board.actions";
import { useSelector } from "react-redux";
import { ActionPopover } from "../../BoardHeader/BoardMenu/ActionPopover";
import { useNavigate } from "react-router";
import { utilService } from "../../../services/util.service";

export function TaskDetailsActions({ task, editTask, onClose }) {
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);
  const navigate = useNavigate();
  function onArchiveTask() {
    editTask({ ...task, closed: true });
  }
  async function onSendBack() {
    const newActivity = utilService.createActivity(
      {
        type: "unArchive",
        targetId: task.id,
        targetName: task.name,
      },
      user
    );
    task.closed = false;
    await updateBoard({
      ...board,
      groups: board.groups.map((g) =>
        g.id === task.idGroup
          ? { ...g, tasks: g.tasks.map((t) => (t.id === task.id ? task : t)) }
          : g
      ),
      activities: [...board?.activities, newActivity],
    });
  }
  async function onDeleteTask() {
    const newBoard = {
      ...board,
      groups: board.groups.map((g) =>
        g.id === task.idGroup
          ? { ...g, tasks: g.tasks.filter((t) => t.id !== task.id) }
          : g
      ),
    };
    await updateBoard(newBoard);
    navigate(`/b?${board?.id}`);
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
              <label className="pyello-icon icon-move " />
              <label className="btn-label">Move</label>
            </button>
          }
        />
      ),
    },
    { svg: labelIcon, text: "Copy" },
    { svg: checkListIcon, text: "Make template" },
    {
      popover: task.closed ? (
        <>
          <button className="details-anchor-btn" onClick={onSendBack}>
            <label className="pyello-icon icon-refresh " />
            <label className="btn-label">Send to board</label>
          </button>
          <ActionPopover
            action={"Delete card?"}
            deleteTask={onDeleteTask}
            anchorEl={
              <button className="details-anchor-btn delete">
                <label className="pyello-icon icon-remove " />
                <label className="btn-label">Delete</label>
              </button>
            }
          />
        </>
      ) : (
        <button className="details-anchor-btn" onClick={onArchiveTask}>
          <label className="pyello-icon icon-archive " />
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
