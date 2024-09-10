import { utilService } from "../../../services/util.service"
import { Tooltip } from "antd"
import { useMemo, useState, useEffect } from "react"
import dayjs from "dayjs"

export function DateBadge({ task, editTask }) {
    const [dateLabel, setDateLabel] = useState(null)

    useEffect(() => {
        if (!dayjs(task.start).isValid() && !dayjs(task.due).isValid()) {
            setDateLabel(null)
        } else {
            setDateLabel(utilService.datePreviewTitle(task.start, task.due))
        }
    }, [task.start, task.due])

    const [dueStatus, dueTooltip] = utilService.taskDueStatus(task)

    async function onDateClick(e) {
        e.stopPropagation()

        const activityType = !task.dueComplete
            ? "completeDate"
            : "incompleteDate"
        const activity = {
            targetId: task.id,
            targetName: task.name,
            type: activityType,
        }

        editTask({ ...task, dueComplete: !task.dueComplete }, activity)
    }

    return (
        <>
            {dateLabel && (
                <Tooltip
                    placement="bottom"
                    title={dueTooltip}
                    key="dates"
                    arrow={false}
                    overlayInnerStyle={utilService.tooltipOuterStyle()}
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
            {!dateLabel && <></>}
        </>
    )
}
