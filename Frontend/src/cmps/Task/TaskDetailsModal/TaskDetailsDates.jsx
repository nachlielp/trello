import dayjs from "dayjs";
import { ManageDatesPopover } from "../ManageTaskPopovers/ManageDatesPopover";
import { useSelector } from "react-redux";
import { utilService } from "../../../services/util.service";
import { CheckBox } from "../../CustomCpms/CheckBox";

export function TaskDetailsDates({ task, editTask, editBoard }) {
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);
  const currentTask = useSelector((state) =>
    state.boardModule.board.groups
      .find((g) => g.id === task.idGroup)
      .tasks.find((t) => t.id === task.id)
  );

  async function handleDueChange(e) {
    const newActivity = utilService.createActivity(
      {
        targetId: task.id,
        targetName: task.name,
      },
      user
    );
    if (e.target.checked) {
      newActivity.type = "completeDate";
    } else {
      newActivity.type = "incompleteDate";
    }
    await editBoard({
      ...board,
      activities: [...board?.activities, newActivity],
    });

    editTask({ ...task, dueComplete: !e.target.checked });
  }

  const [dueStatus, dueLabel] = taskDueStatus(task);

  return (
    <section className="task-details-dates">
      <p className="sub-title">{getTitle(task)}</p>
      <main className="task-details-dates-main">
        {task.due && (
          <CheckBox
            checked={currentTask.dueComplete}
            onChange={handleDueChange}
            className="due-checkbox"
          />
        )}
        <ManageDatesPopover
          task={task}
          editTask={editTask}
          anchorEl={
            <article className="dates-info">
              <label className="date-label">
                {utilService.getDateLabel(task.start)}
              </label>
              {task.due && task.start && (
                <label className="date-label"> - </label>
              )}
              <label className="date-label">
                {utilService.getDateLabel(task.due)}
              </label>
              {task.due && (
                <label className={`date-alert ${dueStatus}`}>{dueLabel}</label>
              )}
              <label className="pyello-icon icon-down open-popover"></label>
            </article>
          }
        />
      </main>
    </section>
  );
}

function taskDueStatus(task) {
  if (task.dueComplete) return ["completed", "Complete"];

  const dueDate = dayjs(task.due);
  const now = dayjs();
  const diff = dueDate.diff(now, "hours");

  if (diff < -24) return ["overdue", "Overdue"];
  if (diff < 0) return ["recently-overdue", "Overdue"];
  if (diff > 24) return ["due", ""];
  if (diff > 0) return ["due-soon", "Due soon"];
  return ["", ""];
}

function getTitle(task) {
  if (task.start && task.due) return "Dates";
  if (task.start) return "Start date";
  if (task.due) return "Due date";
  return "Dates";
}
