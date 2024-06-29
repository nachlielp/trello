import { Card } from "antd";
import { utilService } from "../../services/util.service";
import { TaskPreviewLabel } from "./TaskPreviewLabel";
import { useSelector } from "react-redux";
import { UserAvatar } from "../UserAvatar";
import { TaskPreviewBadges } from "./TaskPreviewBadges";

export function TaskPreview({ task }) {
  const members = useSelector((state) => state.boardModule.members);

  const taskMembers =
    members.filter((member) => task.idMembers.includes(member.id)) || [];

  const taskMember = task.cover;
  const isFullCover = taskMember.size === "full";
  const isHalfCover = taskMember.size === "normal";
  const taskColorCoverStyle =
    taskMember.color && taskMember.size == "full"
      ? { backgroundColor: utilService.getColorHashByName(taskMember.color) }
      : {};
  const isImageCover =
    taskMember.idUploadedBackground && taskMember.size === "full";
  const taskBackgroundCoverImage = isImageCover
    ? {
      backgroundImage: `url(${taskMember.scaled[2].url})`,
      backgroundSize: "cover",
    }
    : {};

  return (
    <Card
      className={`group-task  custom-card ${getTaskFullCoverClass(taskMember)}`}
      style={{ ...taskColorCoverStyle, ...taskBackgroundCoverImage }}
    >
      {isFullCover && (
        <section
          className={`group-task-content ${isImageCover ? "image-cover" : ""}`}
        >
          <span className="group-task-content-title">{task.name}</span>
        </section>
      )}
      {!isFullCover && (
        <>
          {(isHalfCover && taskMember.color && (
            <div
              className="group-task-header"
              style={{
                backgroundColor: utilService.getColorHashByName(
                  task.cover.color
                ),
              }}
            >
              &nbsp;
            </div>
          )) ||
            (taskMember.idUploadedBackground && (
              <div
                className="group-task-header img-cover"
                style={{ backgroundImage: `url(${task.cover.scaled[2].url})` }}
              ></div>
            ))}
          <section className="group-task-content">
            <article className="group-task-content-labels">
              {task.labels.map((label) => (
                <TaskPreviewLabel key={label.id} label={label} isExpanded={true} />
              ))}
            </article>
            <span className="group-task-content-title">{task.name}</span>
            <div className="group-task-content-icons">
              <aside className="aside-left">
                <TaskPreviewBadges task={task} />
              </aside>
              <aside className="aside-right">
                {taskMembers.map((member) => (
                  <UserAvatar key={member.id} member={member} />
                ))}
              </aside>
            </div>
          </section>
        </>
      )}
    </Card>
  );
}

function getTaskFullCoverClass(taskCover) {
  if (taskCover.size === "full") {
    if (taskCover.color) {
      return "task-bg-cover";
    }
    if (taskCover.idUploadedBackground) {
      return "task-img-cover";
    }
  }
  return "";
}
