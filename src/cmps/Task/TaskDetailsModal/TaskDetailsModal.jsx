import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MoveCardPopover } from "../ManageTaskPopovers/MoveCardPopover";
import { TaskDetailsAddToCard } from "./TaskDetailsAddToCard";
import { TaskDetailsActions } from "./TaskDetailsActions";
import { SvgButton } from "../../CustomCpms/SvgButton";
import { TaskDetailsMembers } from "./TaskDetailsMembers";

//svg
import { ReactSVG } from "react-svg";
import detailsIcon from "/img/board-index/detailsImgs/detailsIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import { loadTestBoardFromStorage } from "../../../store/board.actions";
import { setBoards } from "../../../store/workspace.actions";

export function TaskDetailsModal({ taskId, editTask }) {
  const currentBoard = useSelector((state) => state.boardModule.board);
  const currentGroup = useSelector((state) =>
    state.boardModule.board.groups?.find((g) =>
      g.tasks.find((t) => t.id === taskId)
    )
  );
  const currentTask = useSelector((state) =>
    state.boardModule.board.groups
      ?.find((g) => g.tasks?.find((t) => t.id === taskId))
      .tasks.find((t) => t.id === taskId)
  );
  const currentUser = useSelector((state) => state.userModule.user);
  const navigate = useNavigate();
  const isMember = currentTask?.idMembers.includes(currentUser?.id);
  const hasMembers = currentTask.idMembers.length > 0;

  useEffect(() => {
    setBoards();

    loadTestBoardFromStorage();
  }, []);
  async function onJoin() {
    const updatedTask = {
      ...currentTask,
      idMembers: [...currentTask.idMembers, currentUser.id],
    };

    editTask(updatedTask);
  }

  return (
    <Modal
      title={
        currentTask && (
          <div className="details-header">
            <ReactSVG src={detailsIcon} className="icon" wrapper="span" />
            <span className="info">
              <span className="task-name">{currentTask?.name}</span>
              <span className="task-group">
                in list{" "}
                <MoveCardPopover
                  board={currentBoard}
                  group={currentGroup}
                  task={currentTask}
                  anchorEl={
                    <a className="group-link" href="#">
                      {currentGroup?.name}
                    </a>
                  }
                />
              </span>
            </span>
          </div>
        )
      }
      open
      onCancel={() => navigate("/", { replace: true })}
      loading={!currentTask}
      footer=""
      className="task-details"
    >
      <div className="details-body">
        <div className="details-body__left">
          {/* Additional content here */}
          {/* {utilService.makeLorem(1000)} */}
          <section className="subsection">
            {hasMembers && (
              <TaskDetailsMembers
                currentTask={currentTask}
                editTask={editTask}
              />
            )}
            <div className="labels">
              <p>Labels</p>
            </div>
          </section>
        </div>
        <div className="details-body__right">
          {!isMember && (
            <section>
              <p>Suggested</p>
              <SvgButton src={defaultProfile} label={"Join"} onClick={onJoin} />
            </section>
          )}
          <TaskDetailsAddToCard />
          <TaskDetailsActions />
        </div>
      </div>
    </Modal>
  );
}
