import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MoveCardPopover } from "../MoveCardPopover";
import { editTask, getItemById } from "../../../store/board.actions";

//svg
import { ReactSVG } from "react-svg";
import detailsIcon from "/img/board-index/detailsImgs/detailsIcon.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";
import coverIcon from "/img/board-index/detailsImgs/coverIcon.svg";
import fieldsIcon from "/img/board-index/detailsImgs/fieldsIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import file from "../../../../src/assets/svgs/file.svg";
import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import clockIcon from "/img/board-index/headerImgs/filterBtn-imgs/clockIcon.svg";
import { utilService } from "../../../services/util.service";

export function TaskDetailsModal({ taskId }) {
  const board = useSelector((state) => state.boardModule.board);
  const currentUser = useSelector((state) => state.userModule.user);
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const addToCard = [
    { svg: defaultProfile, text: "Members" },
    { svg: labelIcon, text: "Labels" },
    { svg: checkListIcon, text: "Checklist" },
    { svg: clockIcon, text: "Dates" },
    { svg: file, text: "Attachment" },
    { svg: coverIcon, text: "Cover" },
    { svg: fieldsIcon, text: "Custom Fields" },
  ];
  const actions = [
    { svg: defaultProfile, text: "Move" },
    { svg: labelIcon, text: "Copy" },
    { svg: checkListIcon, text: "Make template" },
    { svg: clockIcon, text: "Archive" },
    { svg: file, text: "Share" },
  ];

  useEffect(() => {
    if (board) {
      getItemById(board.id, taskId).then((task) => {
        const group = board.groups.find((grp) => grp.id === task.idGroup);
        setCurrentBoard(board);
        setCurrentGroup(group);
        setCurrentTask(task);
      });
    }
    if (board && currentTask?.idMembers.includes(currentUser.id)) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  }, [board, taskId]);

  async function onJoin() {
    setCurrentTask((prevTask) => {
      const updatedTask = { ...prevTask };
      updatedTask.idMembers = [...updatedTask.idMembers, currentUser.id];
      return updatedTask;
    });

    const updatedTask = {
      ...currentTask,
      idMembers: [...currentTask.idMembers, currentUser.id],
    };

    setIsMember(true);
    await editTask(board.id, updatedTask);
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
          <section className="tittle">
            <p>Add to card</p>
            {addToCard.map((body) => (
              <button key={body.text} onClick={onJoin}>
                <ReactSVG wrapper="span" src={body.svg} />
                {body.text}
              </button>
            ))}
          </section>
          <section>
            <p>Actions</p>
            {actions.map((body) => (
              <button key={body.text} onClick={onJoin}>
                <ReactSVG wrapper="span" src={body.svg} />
                {body.text}
              </button>
            ))}
          </section>
        </div>
      </div>
    </Modal>
  );
}
