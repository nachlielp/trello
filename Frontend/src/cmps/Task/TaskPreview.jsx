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

  const isBadges =
    task.attachments.lenght > 0 ||
    task.desc.length > 0 ||
    task.checkLists.length > 0 ||
    task.due;

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
  }, [taskRef?.current]);

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
        : taskCover.attachment
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
    taskCover?.attachment && coverSize === "full"
      ? {
          backgroundImage: `url(${taskCover?.attachment?.link})`,
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
      {taskCover.color && (
        <div
          className={`group-task-header ${
            coverSize === "normal" ? "normal-cover" : "full-cover"
          }`}
          style={{
            backgroundColor: utilService.getColorHashByName(task?.cover.color)
              .bgColor,
          }}
        ></div>
      )}
      {coverSize === "normal" && taskCover.attachment && (
        <div
          className="group-task-header img-cover"
          style={{
            backgroundImage: `url(${task?.cover?.attachment?.link})`,
          }}
        ></div>
      )}
      {coverSize === "normal" && (
        <section
          className={`group-task-content ${
            taskCover?.attachment || taskCover?.color ? "normal-cover" : ""
          }`}
        >
          {taskLabels.length > 0 && (
            <article className="preview-labels">
              {taskLabels.map((label) => (
                <TaskPreviewLabel
                  key={label?.id}
                  label={label}
                  isExpanded={true}
                />
              ))}
            </article>
          )}
          <span className="group-task-content-title">{task?.name}</span>
          {isBadges && <TaskPreviewBadges task={task} editTask={editTask} />}
        </section>
      )}
      {coverSize === "full" && (
        <section
          className={`group-task-content ${
            taskCover?.attachment && "image-cover-content"
          } ${taskCover?.color && "color-cover-content"}`}
        >
          <span className="group-task-content-cover-title">{task?.name}</span>
        </section>
      )}
    </section>
  );
}
