import { Card } from "antd";
import { useState, useEffect, useRef } from "react";
import { utilService } from "../../services/util.service";
import { TaskPreviewEditModal } from "./TaskPreviewEditModal";
import { useNavigate } from "react-router";

export function TaskPreviewCover({ task, editTask, editLabel }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const taskMember = task.cover;
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

  const taskColorCoverStyle = taskMember.color
    ? {
      backgroundColor: utilService.getColorHashByName(taskMember.color)
        .bgColor,
    }
    : {};

  const taskBackgroundCoverImage = taskMember.idUploadedBackground
    ? {
      backgroundImage: `url(${taskMember.scaled[2].url})`,
      backgroundSize: "cover",
    }
    : {};

  const componentClass = taskMember.color
    ? "task-bg-cover"
    : taskMember.idUploadedBackground
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
        className={`group-task-content ${taskMember.idUploadedBackground ? "image-cover" : ""}`}
        onClick={() => navigate(`/c/${task.id}`, { replace: true })}
      >
        <span className="group-task-content-title">{task.name}</span>
      </section>
    </Card>
  );
}
