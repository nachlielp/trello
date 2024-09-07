import { updateBoard } from "../../../store/board.actions";
import { utilService } from "../../../services/util.service";
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

    const activityType = !task.dueComplete ? "completeDate" : "incompleteDate";
    // console.log("activityType", activityType);
    // console.log("task.dueComplete", task.dueComplete);
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
