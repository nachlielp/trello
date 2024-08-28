import { Tooltip } from "antd";
import { ReactSVG } from "react-svg";
import { UserAvatar } from "../UserAvatar";
import { useSelector } from "react-redux";
import { ProfilePopover } from "./ManageTaskPopovers/ProfilePopover";
import { utilService } from "../../services/util.service";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { updateBoard } from "../../store/board.actions";

export function TaskPreviewBadges({ task, editTask }) {
  const members = useSelector((state) => state.boardModule.board.members);
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);
  const [taskIcons, setTaskIcon] = useState([]);
  const taskMembers =
    members?.filter((member) => task?.idMembers.includes(member?.id)) || [];

  useEffect(() => {
    setTaskIcon([]);

    if (task.start || task.due) {
      let dateLabel = "";
      if (task.start && task.due) {
        dateLabel = getDateLabel(task.start) + " - " + getDateLabel(task.due);
      } else {
        dateLabel = getDateLabel(task.start) + getDateLabel(task.due);
      }

      const [dueStatus, dueTooltip] = taskDueStatus(task);

      setTaskIcon((prev) => [
        ...prev,
        <Tooltip
          placement="bottom"
          title={dueTooltip}
          key="dates"
          arrow={false}
        >
          <span
            className={`task-icon-wrapper dates ${
              task.dueComplete && "completed"
            } ${dueStatus}`}
            onClick={onDateClick}
          >
            {task.dueComplete ? (
              <>
                <label className="trello-icon icon-clock task-icon default-icon"></label>
                <label className="trello-icon icon-checklist task-icon hover-icon"></label>
              </>
            ) : (
              <>
                <label className="trello-icon icon-clock task-icon default-icon"></label>
                <label className="trello-icon icon-checkbox-unchecked task-icon hover-icon"></label>
              </>
            )}

            <span className="task-icon-count">{dateLabel}</span>
          </span>
        </Tooltip>,
      ]);
    }

    if (task.desc.length > 0) {
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

    if (task?.attachments?.length > 0) {
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
            <span className="task-icon-count">{task?.attachments?.length}</span>
          </span>
        </Tooltip>,
      ]);
    }

    if (task.checkLists) {
      const checklistBadge = utilService.getChecklistBadge(task);
      if (!checklistBadge.checkLists.count) return;

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
              checklistBadge.checkLists.allChecked ? "completed" : ""
            }`}
          >
            <ReactSVG
              src={"/img/board-index/detailsImgs/checkListIcon.svg"}
              alt="check"
              className="task-icon checklist-icon"
              wrapper="span"
            />
            <span className="task-icon-count">
              {checklistBadge.checkLists.count}
            </span>
          </span>
        </Tooltip>,
      ]);
    }
  }, [task]);

  async function onDateClick(e) {
    e.stopPropagation();
    const newActivity = utilService.createActivity(
      {
        targetId: task.id,
        targetName: task.name,
      },
      user
    );
    if (!task.dueComplete) {
      newActivity.type = "completeDate";
    } else {
      newActivity.type = "incompleteDate";
    }
    board.activities.push(newActivity);
    const newBoard = board;
    await updateBoard(newBoard);
    editTask({ ...task, dueComplete: !task.dueComplete });
  }

  return (
    <div className="task-preview-badges">
      <div
        className={`task-badges-content ${
          task.checkLists.length === 0 || taskMembers.length === 0
            ? "no-checklist-badges"
            : ""
        }`}
      >
        <aside className="aside-task-icons">
          <section className="task-preview-icons">{taskIcons}</section>
        </aside>
        <aside className="aside-task-users">
          {taskMembers.map((member) => (
            <ProfilePopover
              memberId={member?.id}
              key={member.id}
              anchorEl={
                <UserAvatar
                  memberId={member?.id}
                  onClick={(e) => e.stopPropagation()}
                />
              }
            />
          ))}
        </aside>
      </div>
    </div>
  );
}

function getDateLabel(date) {
  if (!date) return "";

  if (dayjs(date).isSame(dayjs(), "year")) {
    return dayjs(date).format("MMM D");
  } else {
    return dayjs(date).format("MMM D YYYY");
  }
}

function taskDueStatus(task) {
  if (task.dueComplete) return ["completed", "This card is completed"];

  const dueDate = dayjs(task.due);
  const now = dayjs();
  const diff = dueDate.diff(now, "hours");

  if (diff < -24) return ["overdue", "This card is overdue"];
  if (diff < 0)
    return ["recently-overdue", "This card is due in the next 24 hours"];
  if (diff > 24) return ["due", "This card is due in the next 24 hours"];
  if (diff > 0) return ["due-soon", "This card is due in the next 24 hours"];
  return ["", ""];
}
