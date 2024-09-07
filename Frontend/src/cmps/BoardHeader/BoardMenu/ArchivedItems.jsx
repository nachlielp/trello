import { useSelector } from "react-redux"
import { TaskPreview } from "../../Task/TaskPreview"
import { ActionPopover } from "./ActionPopover"
import { editTask, updateBoard } from "../../../store/board.actions"
import { utilService } from "../../../services/util.service"

export function ArchivedItems() {
    const board = useSelector((state) => state.boardModule.board)
    const user = useSelector((state) => state.userModule.user)
    const closedTasks = board?.groups.flatMap((group) =>
        group.tasks.filter((task) => task.closed),
    )

    function onDeleteTask(task) {
        const groupName = board.groups.find((g) => g.id === task.idGroup).name

        const newActivity = utilService.createActivity(
            {
                type: "deleteTask",
                targetName: task.name,
                groupName: groupName,
            },
            user,
        )

        updateBoard({
            ...board,
            groups: board.groups.map((g) =>
                g.id === task.idGroup
                    ? { ...g, tasks: g.tasks.filter((t) => t.id !== task.id) }
                    : g,
            ),
            activities: [...board?.activities, newActivity],
        })
    }

    async function onSendToBoard(task) {
        const newActivity = utilService.createActivity(
            {
                type: "unArchive",
                targetId: task.id,
                targetName: task.name,
            },
            user,
        )
        task.closed = false
        await updateBoard({
            ...board,
            groups: board.groups.map((g) =>
                g.id === task.idGroup
                    ? {
                          ...g,
                          tasks: g.tasks.map((t) =>
                              t.id === task.id ? task : t,
                          ),
                      }
                    : g,
            ),
            activities: [...board?.activities, newActivity],
        })
    }

    return (
        <section className="archived-items">
            {closedTasks.map((task) => (
                <section className="task" key={task.id}>
                    <TaskPreview task={task} noHover />
                    <section className="buttons">
                        <a
                            className="button"
                            onClick={() => onSendToBoard(task)}
                        >
                            Send to board
                        </a>
                        {" • "}
                        <ActionPopover
                            deleteTask={() => onDeleteTask(task)}
                            position={"bottom"}
                            action={"Delete card?"}
                            anchorEl={<a className="button">Delete</a>}
                        />
                    </section>
                </section>
            ))}
        </section>
    )
}
