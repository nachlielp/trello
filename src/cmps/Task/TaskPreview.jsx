import { Card } from "antd";
import { useState, useEffect, useRef } from "react";
import { utilService } from "../../services/util.service";
import { TaskPreviewLabel } from "./TaskPreviewLabel";
import { TaskPreviewBadges } from "./TaskPreviewBadges";
import { TaskPreviewEditModal } from "./TaskPreviewEditModal";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export function TaskPreview({ task, editTask, labelActions }) {
  const boardLabels = useSelector((state) => state.boardModule.board.labels);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const [taskLabels, setTaskLabels] = useState([]);
  const taskRef = useRef(null);
  const [taskWidth, setTaskWidth] = useState(0);
  const navigate = useNavigate();

  const taskCover = task.cover;

  useEffect(() => {
    const taskLabels = task.idLabels
      .filter((labelId) => boardLabels.some(boardLabel => boardLabel.id === labelId)) // Filter out non-existing labels
      .map((labelId) => boardLabels.find(boardLabel => boardLabel.id === labelId)) || [];
    setTaskLabels(taskLabels);
  }, [task.idLabels, boardLabels]);

  useEffect(() => {
    if (taskRef.current) {
      setTaskWidth(taskRef.current.offsetWidth);
    }
  }, [taskRef]);

  function onOpenPreviewModal(value) {
    setIsOpenPreviewModal(value);
  }

  return (
    <Card
      ref={taskRef}
      className={`group-task custom-card ${isOpenPreviewModal ? 'open-preview-modal' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TaskPreviewEditModal
        task={task}
        isHovered={isHovered}
        editTask={editTask}
        isOpen={isOpenPreviewModal}
        openPreviewModal={onOpenPreviewModal}
        taskLabels={taskLabels}
        taskWidth={taskWidth}
        labelActions={labelActions}
      />
      {taskCover.color && (
        <div
          className="group-task-header"
          style={{
            backgroundColor: utilService.getColorHashByName(task.cover.color)
              .bgColor,
          }}
          onClick={() => navigate(`/c/${task.id}`, { replace: true })}
        ></div>
      )}
      {taskCover.idUploadedBackground && (
        <div
          className="group-task-header img-cover"
          style={{ backgroundImage: `url(${task?.cover?.scaled[2]?.url})` }}
          onClick={() => navigate(`/c/${task.id}`, { replace: true })}
        ></div>
      )}
      <section
        className={`group-task-content ${taskCover.idUploadedBackground || taskCover.color ? 'cover' : ''}`}
        onClick={() => navigate(`/c/${task.id}`, { replace: true })}
      >
        <article className="group-task-content-labels">
          {taskLabels.length > 0 && (
            taskLabels.map((label) => (
              <TaskPreviewLabel key={label?.color} label={label} isExpanded={true} />
            ))
          )}
        </article>
        <span className="group-task-content-title">{task.name}</span>
        <TaskPreviewBadges task={task} />
      </section>
    </Card>
  );
}
