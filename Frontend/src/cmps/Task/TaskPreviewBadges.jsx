import { Tooltip } from "antd";
import { ReactSVG } from "react-svg";
import { UserAvatar } from "../UserAvatar";
import { useSelector } from "react-redux";
import { ProfilePopover } from "./ManageTaskPopovers/ProfilePopover";
import { utilService } from "../../services/util.service";
import { useMemo } from "react";
import dayjs from "dayjs";
import { updateBoard } from "../../store/board.actions";
import { DateBadge } from "./TaskPreviewBadges/DateBadge";
import { DescriptionBadge } from "./TaskPreviewBadges/DescriptionBadge";
import { AttachmentsBadge } from "./TaskPreviewBadges/AttachmentsBadge";
import { ChecklistBadge } from "./TaskPreviewBadges/ChecklistBadge";
//TODO rename icons to badges
//TODO move to new files and delegate logic to them
export function TaskPreviewBadges({ task, editTask }) {
  const members = useSelector((state) => state.boardModule.board.members);
  const users = useSelector((state) => state.userModule.users);
  const taskMembers =
    members?.filter((member) => task?.idMembers.includes(member?.id)) || [];

  return (
    <div className="task-preview-badges">
      <div className={`task-badges-content`}>
        <aside className="aside-task-icons">
          {
            <section className="task-preview-icons">
              <DateBadge task={task} editTask={editTask} />
              <DescriptionBadge desc={task.desc} />
              <AttachmentsBadge numOfAttachments={task.attachments.length} />
              <ChecklistBadge checklists={task.checkLists} />
            </section>
          }
        </aside>
        <aside className="aside-task-users">
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
        </aside>
      </div>
    </div>
  );
}
