import { current } from "@reduxjs/toolkit";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export function TaskDetailsModal({ taskId }) {
  const [isOPen, setIsOpen] = useState(true);
  const board = useSelector((state) => state.boardModule.board);
  const [currentTask, setCurrentTask] = useState();
  const [currentGroup, setCurrentGroup] = useState()
  const navigate = useNavigate();
  useEffect(() => {
    for (let group of board.groups) {
      for (let tasks of group.tasks) {
        if (tasks.id === taskId) {
          setCurrentTask(tasks);
          setCurrentGroup(group)
        }
      }
    }
  }, []);

  return (
    <Modal
      title={<div className="details-header"><span className="info"><span className="task-name">{currentTask?.name}</span><span className="task-board">in list {currentGroup?.name}</span></span></div>}
      open
      onCancel={() => navigate("/", { replace: true })}
      footer=""
      className="task-details"
    >
     
    </Modal>
  );
}
