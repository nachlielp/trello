import { current } from "@reduxjs/toolkit";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MoveCardPopover } from "./MoveCardPopover";
import detailsIcon from "/img/board-index/detailsIcon.svg"
import { ReactSVG } from "react-svg";

export function TaskDetailsModal({ taskId }) {
  const [isOPen, setIsOpen] = useState(true);
  const boards = useSelector((state) => state.workspaceModule.boards);
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState();
  const [currentGroup, setCurrentGroup] = useState();
  const [currentBoard, setCurrentBoard] = useState();
  useEffect(() => {
    for (let board of boards) {
      for (let group of board.groups) {
        if (group.tasks) {
          for (let tasks of group.tasks) {
            if (tasks.id === taskId) {
              setCurrentBoard(board);
              setCurrentGroup(group);
              setCurrentTask(tasks);
            }
          }
        }
      }
    }
  }, [boards]);

  return (
    <Modal
      title={
        <div className="details-header">
          <ReactSVG src={detailsIcon} className="icon" wrapper="span"/>
          <span className="info">
            <span className="task-name">{currentTask?.name}</span>
            <span className="task-group">
              in list{" "}
              {
                <MoveCardPopover
                  board={currentBoard}
                  group={currentGroup}
                  task={currentTask}
                  anchorEl={<a className="group-link" href="#">{currentGroup?.name}</a>}
                />
              }
            </span>
          </span>
        </div>
      }
      open
      onCancel={() => navigate("/", { replace: true })}
      footer=""
      className="task-details"
    >
      <div className="details-body">
        <div className="details-body__left">
          {/* <MoveCardPopover board={currentBoard} group={currentGroup} task={currentTask} anchorEl={} /> */}
          lol
        </div>
        <div className="details-body__right">kek</div>
      </div>
    </Modal>
  );
}
