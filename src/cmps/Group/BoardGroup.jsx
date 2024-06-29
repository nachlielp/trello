import { Card } from "antd"
import { GroupFooter } from "./GroupFooter"
import { useState, useEffect } from "react"
import { AddTaskInGroup } from "./AddTaskInGroup"
import { BoardGroupHeader } from "./BoardGroupHeader"
import { TaskPreview } from "../Task/TaskPreview"

export function BoardGroup({ group, addTask, archiveGroup, editGroup }) {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
    const [newTaskIds, setNewTaskIds] = useState([])
    const [firstTaskPos, setFirstTaskPos] = useState(null)
    const [lastTaskPos, setLastTaskPos] = useState(null)
    const [sortedTasks, setSortedTasks] = useState([])

    useEffect(() => {
        setSortedTasks(group.tasks?.sort((a, b) => a.pos - b.pos) || [])
        setNewTaskIds(group.tasks?.filter(task => task.pos < firstTaskPos).map(task => task.id) || [])
    }, [group.tasks])

    useEffect(() => {
        const sortedTasks = group.tasks?.sort((a, b) => a.pos - b.pos) || []
        if (sortedTasks.length > 0) {
            setFirstTaskPos(sortedTasks[0].pos)
            setLastTaskPos(sortedTasks[sortedTasks.length - 1].pos)
        }
    }, [])

    useEffect(() => {
        const sortedTasks = group.tasks?.sort((a, b) => a.pos - b.pos) || []
        if (sortedTasks.length > 0) {
            setFirstTaskPos(sortedTasks[0].pos)
            setLastTaskPos(sortedTasks[sortedTasks.length - 1].pos)
        }
    }, [isAddTaskOpen])


    const openAddTask = () => {
        setIsAddTaskOpen(true)
    }

    return (
        <div className="board-group-container">
            <Card className="board-group custom-card">
                <BoardGroupHeader group={group} editGroup={editGroup} openAddTask={openAddTask} archiveGroup={archiveGroup} />
                <main className="board-group-main">
                    {newTaskIds.map(taskId => <TaskPreview key={taskId} task={group.tasks.find(task => task.id === taskId)} />)}
                    {isAddTaskOpen && <AddTaskInGroup groupId={group.id} closeAddTask={() => setIsAddTaskOpen(false)} addTask={addTask} firstTaskPos={firstTaskPos} />}
                    {sortedTasks.filter(task => !newTaskIds.includes(task.id)).map(task => <TaskPreview key={task.id} task={task} />)}
                    {!isAddTaskOpen && <GroupFooter groupId={group.id} addTask={addTask} lastTaskPos={lastTaskPos} />}
                </main>
            </Card>
        </div>
    )
}