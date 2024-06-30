import { Input } from "antd"
const { TextArea } = Input;
import { CloseOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";

export function AddTaskInGroup({ groupId, closeAddTask, addTask, firstTaskPos, lastTaskPos }) {
    const [taskName, setTaskName] = useState('');
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);

    async function onKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAddTask();
        }
    }
    async function onAddTask() {
        if (!taskName) {
            closeAddTask()
            return;
        }

        const newTask = {
            name: taskName,
        }

        //TODO find a better Strategy for when i add twice to the same column multiple cards
        if (firstTaskPos) {
            newTask.pos = firstTaskPos - 123
        }
        if (lastTaskPos) {
            newTask.pos = lastTaskPos + 123
        }
        newTask.groupId = groupId;
        console.log("newTask,groupId", newTask, groupId);
        setTaskName('')
        await addTask(newTask, groupId)
    }
    return (
        <section className="add-card-in-list-footer">
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
                <button type="primary" onClick={onAddTask} className="add-card-btn">Add card</button>
                <button type="secondary" onClick={closeAddTask} className="close-add-card-btn"><CloseOutlined /></button>
            </article>
        </section>
    )
}