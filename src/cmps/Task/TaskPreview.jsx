import { Card } from "antd";
import { useState, useEffect, useRef } from "react";
import { utilService } from "../../services/util.service";
import { TaskPreviewLabel } from "./TaskPreviewLabel";
import { TaskPreviewBadges } from "./TaskPreviewBadges";
import { TaskPreviewEditModal } from "./TaskPreviewEditModal";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
// import { Draggable } from "react-beautiful-dnd";

export function TaskPreview({ task, editTask, labelActions, isDragging }) {
  const boardLabels = useSelector((state) => state.boardModule.board.labels);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const [taskLabels, setTaskLabels] = useState([]);
  const taskRef = useRef(null);
  const [taskWidth, setTaskWidth] = useState(0);
  const navigate = useNavigate();

  const taskCover = task?.cover;
  const coverSize = taskCover?.size;

  useEffect(() => {
    const taskLabels =
      task?.idLabels
        .filter((labelId) =>
          boardLabels?.some((boardLabel) => boardLabel.id === labelId)
        ) // Filter out non-existing labels
        .map((labelId) =>
          boardLabels.find((boardLabel) => boardLabel.id === labelId)
        ) || [];
    setTaskLabels(taskLabels);
  }, [task?.idLabels, boardLabels]);

  useEffect(() => {
    if (taskRef?.current) {
      setTaskWidth(taskRef?.current.offsetWidth);
    }
  }, [taskRef]);

  function onOpenPreviewModal(value) {
    setIsOpenPreviewModal(value);
  }

  function onClickTask() {
    if (isOpenPreviewModal) return;
    navigate(`/c/${task?.id}`, { replace: true });
  }

  const covorCardClass =
    coverSize === "full"
      ? taskCover.color
        ? "task-bg-cover"
        : taskCover.idUploadedBackground
        ? "task-img-full-cover"
        : ""
      : "";

  const taskColorCoverStyle =
    taskCover?.color && coverSize === "full"
      ? {
          backgroundColor: utilService.getColorHashByName(taskCover?.color)
            .bgColor,
        }
      : {};

  const taskBackgroundCoverImageStyle =
    taskCover?.idUploadedBackground && coverSize === "full"
      ? {
          backgroundImage: `url(${taskCover?.scaled[2].url})`,
          backgroundSize: "cover",
        }
      : {};

  return (
    <section
      ref={taskRef}
      className={`task-preview custom-card ${covorCardClass} ${
        isOpenPreviewModal ? "open-preview-modal" : ""
      } ${isDragging ? "dragging" : ""} ${
        isHovered && !isOpenPreviewModal ? "hovered" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...taskColorCoverStyle, ...taskBackgroundCoverImageStyle }}
      onClick={onClickTask}
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
        closePreviewModal={onOpenPreviewModal}
      />
      {coverSize === "normal" && taskCover.color && (
        <div
          className="group-task-header"
          style={{
            backgroundColor: utilService.getColorHashByName(task?.cover.color)
              .bgColor,
          }}
        ></div>
      )}
      {coverSize === "normal" && taskCover.idUploadedBackground && (
        <div
          className="group-task-header img-cover"
          style={{
            backgroundImage: `url(${task?.cover?.scaled[2]?.url})`,
          }}
        ></div>
      )}
      {coverSize === "normal" && (
        <section
          className={`group-task-content ${
            taskCover?.idUploadedBackground || taskCover?.color
              ? "normal-cover"
              : ""
          }`}
        >
          <article className="preview-labels">
            {taskLabels.length > 0 &&
              taskLabels.map((label) => (
                <TaskPreviewLabel
                  key={label?.id}
                  label={label}
                  isExpanded={true}
                />
              ))}
          </article>
          <span className="group-task-content-title">{task?.name}</span>
          <TaskPreviewBadges task={task} editTask={editTask} />
        </section>
      )}
      {coverSize === "full" && (
        <section
          className={`group-task-content ${
            taskCover?.idUploadedBackground && "image-cover-content"
          } ${taskCover?.color && "color-cover-content"}`}
        >
          <span className="group-task-content-title">{task?.name}</span>
        </section>
      )}
    </section>
  );
}
