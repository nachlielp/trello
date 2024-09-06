import { updateBoard } from "../../../store/board.actions";
import { utilService } from "../../../services/util.service";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function DateBadge({ task, editTask }) {
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);

  const [isDate, setIsDate] = useState(false);
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    if (
      !utilService.isNotEmpty(task.start) &&
      !utilService.isNotEmpty(task.due)
    ) {
      setDateLabel("");
      setIsDate(false);
    } else if (
      utilService.isNotEmpty(task.start) &&
      utilService.isNotEmpty(task.due)
    ) {
      setDateLabel(getDateLabel(task.start) + " - " + getDateLabel(task.due));
      setIsDate(true);
    } else {
      setDateLabel(getDateLabel(task.start) + getDateLabel(task.due));
      setIsDate(true);
    }
  }, [task.start, task.due]);

  const [dueStatus, dueTooltip] = taskDueStatus(task);

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
    <>
      {isDate && (
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
      )}
      {!isDate && <></>}
    </>
  );
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

function getDateLabel(date) {
  if (!date) return "";

  if (dayjs(date).isSame(dayjs(), "year")) {
    return dayjs(date).format("MMM D");
  } else {
    return dayjs(date).format("MMM D YYYY");
  }
}
