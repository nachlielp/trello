import { Card } from "antd";
import { useState } from "react";
import { utilService } from "../../services/util.service";
import { TaskPreviewEditModal } from "./TaskPreviewEditModal";
import { useNavigate } from "react-router";

export function TaskPreviewCover({ task, editTask, editLabel }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const taskMember = task.cover;
  const navigate = useNavigate();

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

  return (
    <Card
      className={`group-task  custom-card ${componentClass} ${isOpenPreviewModal ? 'open-preview-modal' : ''} `}
      style={{ ...taskColorCoverStyle, ...taskBackgroundCoverImage }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TaskPreviewEditModal
        task={task}
        isHovered={isHovered}
        editTask={editTask}
        isOpen={isOpenPreviewModal}
        openPreviewModal={openPreviewModal}
        editLabel={editLabel}
      />
      <section
        className={`group-task-content ${taskMember.idUploadedBackground ? "image-cover" : ""
          }`}
        onClick={() => navigate(`/c/${task.id}`, { replace: true })}
      >
        <span className="group-task-content-title">{task.name}</span>
      </section>
    </Card>
  );
}
