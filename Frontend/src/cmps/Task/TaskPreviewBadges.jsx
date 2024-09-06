import { Tooltip } from "antd";
import { ReactSVG } from "react-svg";
import { UserAvatar } from "../UserAvatar";
import { useSelector } from "react-redux";
import { ProfilePopover } from "./ManageTaskPopovers/ProfilePopover";
import { utilService } from "../../services/util.service";
import { useMemo } from "react";
import dayjs from "dayjs";
import { updateBoard } from "../../store/board.actions";

//TODO rename icons to badges
//TODO move to new files and delegate logic to them
export function TaskPreviewBadges({ task, editTask }) {
  const members = useSelector((state) => state.boardModule.board.members);
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);
  const taskMembers =
    members?.filter((member) => task?.idMembers.includes(member?.id)) || [];

  const taskIcons = useMemo(() => {
    const icons = [];

    // Date badge
    if (
      utilService.isNotEmpty(task.start) ||
      utilService.isNotEmpty(task.due)
    ) {
      let dateLabel = "";
      if (
        utilService.isNotEmpty(task.start) &&
        utilService.isNotEmpty(task.due)
      ) {
        dateLabel = getDateLabel(task.start) + " - " + getDateLabel(task.due);
      } else {
        dateLabel = getDateLabel(task.start) + getDateLabel(task.due);
      }

      const [dueStatus, dueTooltip] = taskDueStatus(task);

      icons.push(
        dateBadge({
          dueTooltip,
          dueComplete: task.dueComplete,
          dateLabel,
          dueStatus,
          onDateClick: (e) => onDateClick(e, task),
        })
      );
    }

    // Description badge
    if (utilService.isNotEmpty(task.desc)) {
      icons.push(descriptionBadge);
    }

    // Attachments badge
    if (task?.attachments?.length > 0) {
      icons.push(attachmentsBadge(task?.attachments?.length));
    }

    // Checklist badge
    if (task.checkLists.length > 0) {
      const result = utilService.getChecklistBadge(task.checkLists);
      icons.push(checklistBadge(result));
    }

    return icons;
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
          taskIcons.length === 0 && taskMembers.length === 0
            ? "no-checklist-badges"
            : ""
        }`}
      >
        <aside className="aside-task-icons">
          {taskIcons.length > 0 && (
            <section className="task-preview-icons">{taskIcons}</section>
          )}
        </aside>
        <aside className="aside-task-users">
          {taskMembers.map((member) => (
            <ProfilePopover
              memberId={member.id}
              key={member.id}
              anchorEl={
                <UserAvatar
                  memberId={member.id}
                  onClick={(e) => e.stopPropagation()}
                  memberProp={member}
                />
              }
            />
          ))}
        </aside>
      </div>
    </div>
  );
}

const dateBadge = ({
  dueTooltip,
  dueComplete,
  dateLabel,
  dueStatus,
  onDateClick,
}) => (
  <Tooltip placement="bottom" title={dueTooltip} key="dates" arrow={false}>
    <span
      className={`task-icon-wrapper dates ${
        dueComplete && "completed"
      } ${dueStatus}`}
      onClick={onDateClick}
    >
      {dueComplete ? (
        <>
          <label className="pyello-icon icon-clock task-icon default-icon"></label>
          <label className="pyello-icon icon-checklist task-icon hover-icon"></label>
        </>
      ) : (
        <>
          <label className="pyello-icon icon-clock task-icon default-icon"></label>
          <label className="pyello-icon icon-checkbox-unchecked task-icon hover-icon"></label>
        </>
      )}

      <span className="task-icon-count">{dateLabel}</span>
    </span>
  </Tooltip>
);

const descriptionBadge = (
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

const attachmentsBadge = (numOfAttachments) => (
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
      <span className="task-icon-count">{numOfAttachments}</span>
    </span>
  </Tooltip>
);

const checklistBadge = ({ checkLists }) => (
  <Tooltip
    placement="bottom"
    title="Checklist items"
    key="checklist"
    arrow={false}
  >
    <span
      className={`task-icon-wrapper checklist ${
        checkLists.allChecked ? "completed" : ""
      }`}
    >
      <ReactSVG
        src={"/img/board-index/detailsImgs/checkListIcon.svg"}
        alt="check"
        className="task-icon checklist-icon"
        wrapper="span"
      />
      <span className="task-icon-count check-list">{checkLists.count}</span>
    </span>
  </Tooltip>
);

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
