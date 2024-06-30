import { Card } from "antd";
import { utilService } from "../../services/util.service";
import { TaskPreviewLabel } from "./TaskPreviewLabel";
import { useSelector } from "react-redux";
import { UserAvatar } from "../UserAvatar";
import { TaskPreviewBadges } from "./TaskPreviewBadges";

export function TaskPreview({ task }) {
  const members = useSelector((state) => state.boardModule.members);

  const taskMembers = members.filter((member) => task.idMembers.includes(member.id)) || [];

  const taskMember = task.cover;

  return (
    <Card className={`group-task  custom-card `}>
      {taskMember.color && (
        <div
          className="group-task-header"
          style={{
            backgroundColor: utilService.getColorHashByName(
              task.cover.color
            ),
          }}></div>
      )}
      {taskMember.idUploadedBackground && (
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
        <div className="group-task-content-icons">
          <aside className="aside-left">
            <TaskPreviewBadges task={task} members={members} />
          </aside>
          <aside className="aside-right">
            {taskMembers.map((member) => (
              <UserAvatar key={member.id} member={member} />
            ))}
          </aside>
        </div>
      </section>

    </Card>
  );
}

