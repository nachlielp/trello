import { DateBadge } from "./TaskPreviewBadges/DateBadge";
import { DescriptionBadge } from "./TaskPreviewBadges/DescriptionBadge";
import { AttachmentsBadge } from "./TaskPreviewBadges/AttachmentsBadge";
import { ChecklistBadge } from "./TaskPreviewBadges/ChecklistBadge";
import { MembersBadge } from "./TaskPreviewBadges/MembersBadge";

export function TaskPreviewBadges({ task, editTask }) {
  return (
    <section className="task-preview-badges">
      <article className="task-badges-content">
        <article className="task-preview-icons">
          <DateBadge task={task} editTask={editTask} />
          <DescriptionBadge desc={task.desc} />
          <AttachmentsBadge numOfAttachments={task.attachments.length} />
          <ChecklistBadge checklists={task.checkLists} />
        </article>
        <MembersBadge task={task} />
      </article>
    </section>
  );
}
