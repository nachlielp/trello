import { Card } from "antd";
import { utilService } from "../../services/util.service";
import { TaskPreviewLabel } from "./TaskPreviewLabel";
import { TaskPreviewBadges } from "./TaskPreviewBadges";

export function TaskPreview({ task }) {
  const taskCover = task.cover;

  return (
    <Card className={`group-task  custom-card `}>
      {taskCover.color && (
        <div
          className="group-task-header"
          style={{
            backgroundColor: utilService.getColorHashByName(
              task.cover.color
            ),
          }}></div>
      )}
      {taskCover.idUploadedBackground && (
        <div
          className="group-task-header img-cover"
          style={{ backgroundImage: `url(${task.cover.scaled[2].url})` }}
        ></div>
      )}
      <section className="group-task-content">
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

