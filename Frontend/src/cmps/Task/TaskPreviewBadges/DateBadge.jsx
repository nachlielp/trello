import { utilService } from "../../../services/util.service";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";

export function DateBadge({ task, editTask }) {
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
      setDateLabel(
        utilService.getDateLabel(task.start) +
          " - " +
          utilService.getDateLabel(task.due)
      );
      setIsDate(true);
    } else {
      setDateLabel(
        utilService.getDateLabel(task.start) +
          utilService.getDateLabel(task.due)
      );
      setIsDate(true);
    }
  }, [task.start, task.due]);

  const [dueStatus, dueTooltip] = utilService.taskDueStatus(task);

  async function onDateClick(e) {
    e.stopPropagation();

    const activityType = !task.dueComplete ? "completeDate" : "incompleteDate";

    const activity = {
      targetId: task.id,
      targetName: task.name,
      type: activityType,
    };
    editTask({ ...task, dueComplete: !task.dueComplete }, activity);
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

function datePreviewTitle(start, due) {
  if (!utilService.isNotEmpty(start) && !utilService.isNotEmpty(due)) return "";
  if (utilService.isNotEmpty(start) && utilService.isNotEmpty(due))
    return `${utilService.getDateLabel(start)} - ${utilService.getDateLabel(
      due
    )}`;
  if (utilService.isNotEmpty(start))
    return `Start: ${utilService.getDateLabel(start)}`;
  if (utilService.isNotEmpty(due))
    return `Due: ${utilService.getDateLabel(due)}`;
}
