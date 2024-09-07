import { DateBadge } from "./TaskPreviewBadges/DateBadge";
import { DescriptionBadge } from "./TaskPreviewBadges/DescriptionBadge";
import { AttachmentsBadge } from "./TaskPreviewBadges/AttachmentsBadge";
import { ChecklistBadge } from "./TaskPreviewBadges/ChecklistBadge";
import { MembersBadge } from "./TaskPreviewBadges/MembersBadge";
//TODO rename icons to badges
//TODO move to new files and delegate logic to them
export function TaskPreviewBadges({ task, editTask }) {
  return (
    <div className="task-preview-badges">
      <div className={`task-badges-content`}>
        <aside className="aside-task-icons">
          <section className="task-preview-icons">
            <DateBadge task={task} editTask={editTask} />
            <DescriptionBadge desc={task.desc} />
            <AttachmentsBadge numOfAttachments={task.attachments.length} />
            <ChecklistBadge checklists={task.checkLists} />
          </section>
          <MembersBadge task={task} />
        </aside>
        {/* <aside className="aside-task-users">
          {taskMembers.map((member) => {
            const currentUser = users?.find((u) => u.id === member.id);
            return (
              <ProfilePopover
                memberId={member.id}
                key={member.id}
                anchorEl={
                  <UserAvatar
                    memberId={member.id}
                    onClick={(e) => e.stopPropagation()}
                    memberProp={{ ...member, imgUrl: currentUser?.imgUrl }}
                  />
                }
              />
            );
          })}
        </aside> */}
      </div>
    </div>
  );
}
