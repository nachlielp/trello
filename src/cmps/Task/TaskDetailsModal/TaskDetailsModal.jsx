import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MoveCardPopover } from "../MoveCardPopover";
import { editTask, getItemById } from "../../../store/board.actions";

//svg
import { ReactSVG } from "react-svg";
import detailsIcon from "/img/board-index/detailsImgs/detailsIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";
import coverIcon from "/img/board-index/detailsImgs/coverIcon.svg";
import fieldsIcon from "/img/board-index/detailsImgs/fieldsIcon.svg";
import file from "../../../../src/assets/svgs/file.svg";
import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import clockIcon from "/img/board-index/headerImgs/filterBtn-imgs/clockIcon.svg";
import { utilService } from "../../../services/util.service";
import { TaskDetailsAddToCard } from "./TaskDetailsAddToCard";
import { TaskDetailsActions } from "./TaskDetailsActions";

export function TaskDetailsModal({ taskId }) {
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

  const [isMember, setIsMember] = useState(false);

  const actions = [
    { svg: defaultProfile, text: "Move" },
    { svg: labelIcon, text: "Copy" },
    { svg: checkListIcon, text: "Make template" },
    { svg: clockIcon, text: "Archive" },
    { svg: file, text: "Share" },
  ];

  useEffect(() => {
    if (currentBoard && currentTask?.idMembers.includes(currentUser?.id)) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  }, [currentBoard, taskId]);

  async function onJoin() {
    const updatedTask = {
      ...currentTask,
      idMembers: [...currentTask.idMembers, currentUser.id],
    };

    setIsMember(true);
    await editTask(currentBoard.id, updatedTask);
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
          lol
        </div>
        <div className="details-body__right">
          {currentTask && !isMember && (
            <section>
              <p>Suggested</p>
              <button onClick={onJoin}>
                <ReactSVG wrapper="span" src={defaultProfile} />
                Join
              </button>
            </section>
          )}
          <TaskDetailsAddToCard />
          <TaskDetailsActions />
        </div>
      </div>
    </Modal>
  );
}
