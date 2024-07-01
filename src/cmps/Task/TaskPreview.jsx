import { Card } from "antd";
import { useState } from "react";
import { utilService } from "../../services/util.service";
import { TaskPreviewLabel } from "./TaskPreviewLabel";
import { TaskPreviewBadges } from "./TaskPreviewBadges";
import { TaskPreviewEditModal } from "./TaskPreviewEditModal";
import { useNavigate } from "react-router";

export function TaskPreview({ task, editTask }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const navigate = useNavigate();

  const taskCover = task.cover;

  function onOpenPreviewModal(value) {
    console.log('onOpenPreviewModal', value);
    setIsOpenPreviewModal(value);
  }

  return (
    <Card
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
          style={{ backgroundImage: `url(${task.cover.scaled[2].url})` }}
          onClick={() => navigate(`/c/${task.id}`, { replace: true })}
        ></div>
      )}
      <section
        className="group-task-content"
        onClick={() => navigate(`/c/${task.id}`, { replace: true })}
      >
        <article className="group-task-content-labels">
          {task.labels.map((label) => (
            <TaskPreviewLabel key={label.id} label={label} isExpanded={true} />
          ))}
        </article>
        <span className="group-task-content-title">{task.name}</span>
        <TaskPreviewBadges task={task} />
      </section>
    </Card>
  );
}
