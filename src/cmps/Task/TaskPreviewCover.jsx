import { Card } from "antd";
import { useState, useEffect, useRef } from "react";
import { utilService } from "../../services/util.service";
import { TaskPreviewEditModal } from "./TaskPreviewEditModal";
import { useNavigate } from "react-router";

export function TaskPreviewCover({ task, editTask, editLabel }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const taskCover = task?.cover;
  const taskRef = useRef(null);
  const [taskWidth, setTaskWidth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (taskRef.current) {
      setTaskWidth(taskRef.current.offsetWidth);
    }
  }, [taskRef]);
  const openPreviewModal = (value) => {
    setIsOpenPreviewModal(value);
  }

  const taskColorCoverStyle = taskCover.color
    ? {
      backgroundColor: utilService.getColorHashByName(taskCover?.color)
        .bgColor,
    }
    : {};

  const taskBackgroundCoverImage = taskCover.idUploadedBackground
    ? {
      backgroundImage: `url(${taskCover.scaled[2].url})`,
      backgroundSize: "cover",
    }
    : {};

  const componentClass = taskCover.color
    ? "task-bg-cover"
    : taskCover.idUploadedBackground
      ? "task-img-cover"
      : "";

  function onClick(e) {
    e.stopPropagation();
    navigate(`/c/${task.id}`, { replace: true });
  }
  return (
    <Card
      ref={taskRef}
      className={`group-task  custom-card ${componentClass} ${isOpenPreviewModal ? 'open-preview-modal' : ''} `}
      style={{ ...taskColorCoverStyle, ...taskBackgroundCoverImage }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <TaskPreviewEditModal
        task={task}
        isHovered={isHovered}
        editTask={editTask}
        isOpen={isOpenPreviewModal}
        openPreviewModal={openPreviewModal}
        editLabel={editLabel}
        taskWidth={taskWidth}
      />
      <section
        className={`group-task-content ${taskCover.idUploadedBackground && "image-cover"} ${taskCover.color && "color-cover"}`}

      >
        <span className="group-task-content-title">{task.name}</span>
      </section>
    </Card>
  );
}
