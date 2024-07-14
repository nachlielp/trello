import { Tooltip } from "antd";
import { ReactSVG } from "react-svg";
import { UserAvatar } from "../UserAvatar";
import { useSelector } from "react-redux";
import { ProfilePopover } from "./ManageTaskPopovers/ProfilePopover";

export function TaskPreviewBadges({ task }) {
  const members = useSelector((state) => state.boardModule.board.members);

  const taskMembers =
    members?.filter((member) => task?.idMembers.includes(member?.id)) || [];

  const taskIcons = [];

  //TODO refator to Batdg component list
  if (task?.badges?.description) {
    taskIcons.push(
      <Tooltip
        placement="bottom"
        title="This card has a description"
        key="description"
        arrow={false}
      >
        <span className="task-icon-wrapper">
          <ReactSVG
            src="/img/taskBadges/description.svg"
            alt="description"
            className="task-icon"
            wrapper="span"
          />
        </span>
      </Tooltip>
    );
  }
  if (task?.badges?.attachments > 0) {
    taskIcons.push(
      <Tooltip
        placement="bottom"
        title="Attachments"
        key="attachments"
        arrow={false}
      >
        <span className="task-icon-wrapper">
          <ReactSVG
            src="/img/taskBadges/file.svg"
            alt="file"
            className="task-icon"
            wrapper="span"
          />
          <span className="task-icon-count">{task.badges.attachments}</span>
        </span>
      </Tooltip>
    );
    if (task.badges.checkItems > 0) {
      taskIcons.push(
        <Tooltip
          placement="bottom"
          title="Checklist items"
          key="checklist"
          arrow={false}
        >
          <span className="task-icon-wrapper">
            <ReactSVG
              src={"/img/board-index/detailsImgs/checkListIcon.svg"}
              alt="check"
              className="task-icon checklist-icon"
              wrapper="span"
            />
            <span className="task-icon-count">
              {task.badges.checkItemsChecked}/{task.badges.checkItems}
            </span>
          </span>
        </Tooltip>
      );
    }
  }

  return (
    <div className="group-task-content-icons">
      <aside className="aside-task-icons">
        <section className="task-preview-icons"> {taskIcons}</section>
      </aside>
      <aside className="aside-task-users">
        {taskMembers.map((member) => (
          <ProfilePopover
            member={member}
            key={member.id}
            anchorEl={
              <UserAvatar
                member={member}
                onClick={(e) => e.stopPropagation()}
              />
            }
          />
        ))}
      </aside>
    </div>
  );
}
