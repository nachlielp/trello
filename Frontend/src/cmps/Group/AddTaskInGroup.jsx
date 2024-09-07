import { Input } from "antd"
const { TextArea } = Input
import { CloseOutlined } from "@ant-design/icons"
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

export function AddTaskInGroup({
    groupId,
    closeAddTask,
    addTask,
    addToTop,
    onBtnClick,
    groupRef,
}) {
    const group = useSelector((state) =>
        state.boardModule.board.groups.find((group) => group.id === groupId)
    )
    const [taskName, setTaskName] = useState("")
    const firstPos = useRef(null)
    const lastAddedPos = useRef(null)
    const lastPos = useRef(null)
    const textAreaRef = useRef(null)

    useEffect(() => {
        if (group.tasks?.length > 0) {
            const groupMaxPos = group.tasks
                .filter((task) => !task.closed)
                .reduce((max, task) => Math.max(max, task.pos), 0)
            const groupMinPos = group.tasks
                .filter((task) => !task.closed)
                .reduce((min, task) => Math.min(min, task.pos), 0)
            firstPos.current = groupMinPos
            lastPos.current = groupMaxPos
        }
    }, [group.tasks])

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
        return () => {
            lastAddedPos.current = null
        }
    }, [])

    async function onKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            onAddTask()
        }
    }

    async function onAddTask() {
        if (!taskName) {
            closeAddTask()
            return
        }

        const newTask = {
            addToTop: addToTop,
            name: taskName,
        }

        newTask.groupId = groupId

        setTaskName("")
        await addTask(newTask, group)
        if (onBtnClick) {
            onBtnClick()
        }
    }

    return (
        <section
            className={`add-card-in-list-footer ${
                addToTop ? "first-task" : ""
            } ${!addToTop ? "last-task" : ""}`}
            ref={groupRef}
        >
            <TextArea
                ref={textAreaRef}
                className="footer-input"
                placeholder="Enter a title for this card"
                autoSize={{ minRows: 2, maxRows: 6 }}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <article className="footer-actions">
                <button
                    type="primary"
                    onClick={onAddTask}
                    className="add-card-btn"
                >
                    Add card
                </button>
                <button
                    type="secondary"
                    onClick={closeAddTask}
                    className="close-add-card-btn"
                >
                    <CloseOutlined />
                </button>
            </article>
        </section>
    )
}
