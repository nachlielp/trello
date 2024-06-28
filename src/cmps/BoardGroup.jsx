import { Card } from "antd"
import { ListCardPreview } from "./ListCardPreview"
import { GroupFooter } from "./GroupFooter"
import { useState, useRef, useEffect } from "react"
import { GroupActionsMenuPopover } from "./GroupActionsMenuPopover"
import { AddTaskInGroup } from "./AddTaskInGroup"
import { Input } from "antd"
const { TextArea } = Input;

export function BoardGroup({ group, addTask, archiveGroup, editGroup }) {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
    const [oldTaskIds, setOldTaskIds] = useState(group.tasks.map(task => task.id))
    const [firstTaskPos, setFirstTaskPos] = useState(null)
    const [lastTaskPos, setLastTaskPos] = useState(null)
    const [sortedTasks, setSortedTasks] = useState([])
    const [isEditGroupName, setIsEditGroupName] = useState(false)
    const [newGroupName, setNewGroupName] = useState(group.name)
    const textAreaRef = useRef(null);


    useEffect(() => {
        if (textAreaRef.current) {
            const textAreaElement = textAreaRef.current.resizableTextArea.textArea;
            textAreaElement.focus();
            textAreaElement.setSelectionRange(0, textAreaElement.value.length); // Select all text
        }
    }, [isEditGroupName]);

    useEffect(() => {
        console.log("group.tasks", group.tasks);
        setSortedTasks(group.tasks.sort((a, b) => a.pos - b.pos))
    }, [group.tasks])

    useEffect(() => {
        const sortedTasks = group.tasks.sort((a, b) => a.pos - b.pos)
        if (sortedTasks.length > 0) {
            setFirstTaskPos(sortedTasks[0].pos)
            setLastTaskPos(sortedTasks[sortedTasks.length - 1].pos)
        }
    }, [])

    useEffect(() => {
        const sortedTasks = group.tasks.sort((a, b) => a.pos - b.pos)
        if (sortedTasks.length > 0) {

            setFirstTaskPos(sortedTasks[0].pos)
            setLastTaskPos(sortedTasks[sortedTasks.length - 1].pos)
        }
        setOldTaskIds(group.tasks.map(task => task.id))
    }, [isAddTaskOpen])


    const openAddTask = () => {
        setIsAddTaskOpen(true)
    }

    async function onKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            onRenameGroup()
        }
    }

    function onRenameGroup() {
        setIsEditGroupName(false)
        if (newGroupName === group.name || newGroupName.trim() === '') {
            return;
        }
        editGroup({ ...group, name: newGroupName })
    }

    return (
        <div className="board-list-container">
            <Card className="board-list custom-card">
                <header className="board-list-header">
                    {isEditGroupName ?
                        <TextArea
                            ref={textAreaRef}
                            className="list-title-input"
                            autoSize={{ minRows: 1 }}
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            onKeyDown={onKeyDown}
                            onBlur={onRenameGroup}
                        />
                        : <p className="list-title" onClick={() => setIsEditGroupName(true)}>{group.name}</p>}
                    <GroupActionsMenuPopover openAddTask={openAddTask} archiveGroup={archiveGroup} />
                </header>
                <main className="board-list-main">
                    {sortedTasks.filter(task => !oldTaskIds.includes(task.id)).map(task => <ListCardPreview key={task.id} card={task} />)}
                    {isAddTaskOpen && <AddTaskInGroup groupId={group.id} closeAddCard={() => setIsAddTaskOpen(false)} addTask={addTask} firstCardPos={firstTaskPos} />}
                    {sortedTasks.filter(task => oldTaskIds.includes(task.id)).map(task => <ListCardPreview key={task.id} card={task} />)}
                    {!isAddTaskOpen && <GroupFooter groupId={group.id} addTask={addTask} lastTaskPos={lastTaskPos} />}
                </main>
            </Card>
        </div>
    )
}