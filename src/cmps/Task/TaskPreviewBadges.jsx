import { Tooltip } from "antd";
import { ReactSVG } from "react-svg";
import { UserAvatar } from "../UserAvatar";
import { batch, useSelector } from "react-redux";
import { ProfilePopover } from "./ManageTaskPopovers/ProfilePopover";
import { utilService } from "../../services/util.service";
import { useCallback, useEffect, useMemo, useState } from "react";

export function TaskPreviewBadges({ task }) {
  const members = useSelector((state) => state.boardModule.board.members);
  const [badges, setBadges] = useState(utilService.getBadges(task));
  const [taskIcons, setTaskIcon] = useState([]);
  useEffect(() => {
    setBadges(utilService.getBadges(task));
  }, [task]);

  const taskMembers =
    members?.filter((member) => task?.idMembers.includes(member?.id)) || [];

  //TODO refator to Batdg component list ...Eugene

  useEffect(() => {
    setTaskIcon([]);
    if (badges.desc) {
      setTaskIcon((prev) => [
        ...prev,
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
        </Tooltip>,
      ]);
    }
    if (task?.badges?.attachments > 0) {
      setTaskIcon((prev) => [
        ...prev,
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
        </Tooltip>,
      ]);
    }
    if (badges.checkLists.count) {
      setTaskIcon((prev) => [
        ...prev,
        <Tooltip
          placement="bottom"
          title="Checklist items"
          key="checklist"
          arrow={false}
        >
          <span
            className={`task-icon-wrapper checklist ${
              badges.checkLists.allChecked ? "all-checked" : ""
            }`}
          >
            <ReactSVG
              src={"/img/board-index/detailsImgs/checkListIcon.svg"}
              alt="check"
              className="task-icon checklist-icon"
              wrapper="span"
            />
            <span className="task-icon-count">{badges.checkLists.count}</span>
          </span>
        </Tooltip>,
      ]);
    }
  }, [badges]);

  return (
    <div className="task-preview-badges">
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
