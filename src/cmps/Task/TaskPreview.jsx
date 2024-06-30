import { Card } from "antd";
import { useState } from "react";
import { utilService } from "../../services/util.service";
import { TaskPreviewLabel } from "./TaskPreviewLabel";
import { TaskPreviewBadges } from "./TaskPreviewBadges";
import { TaskPreviewEditModal } from "./TaskPreviewEditModal";

export function TaskPreview({ task, editTask }) {
  const [isHovered, setIsHovered] = useState(false);

  const taskCover = task.cover;

  return (
    <Card
      className={`group-task custom-card `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TaskPreviewEditModal task={task} isHovered={isHovered} editTask={editTask} />
      {taskCover.color && (
        <div
          className="group-task-header"
          style={{
            backgroundColor: utilService.getColorHashByName(
              task.cover.color
            ).bgColor,
          }}></div>
      )}
      {taskCover.idUploadedBackground && (
        <div
          className="group-task-header img-cover"
          style={{ backgroundImage: `url(${task.cover.scaled[2].url})` }}
        ></div>
      )}
      <section className="group-task-content" onClick={() => console.log("lol")}>
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

