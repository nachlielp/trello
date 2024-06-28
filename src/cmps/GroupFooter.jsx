import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import templateCard from "../assets/svgs/template-card.svg"
import { AddTaskInGroup } from "./AddTaskInGroup"

export function GroupFooter({ groupId, addTask, lastTaskPos }) {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
    function closeAddTask() {
        setIsAddTaskOpen(false)
    }

    return (
        <div className="list-footer">
            {!isAddTaskOpen &&
                <>
                    <button className="add-card-btn" onClick={() => setIsAddTaskOpen(true)}>
                        <PlusOutlined />&nbsp;&nbsp;Add a card
                    </button>
                    <button className="use-template-btn">
                        <img src={templateCard} alt="template card" className="template-card" />
                    </button>
                </>
            }
            {isAddTaskOpen && <AddTaskInGroup groupId={groupId} closeAddTask={closeAddTask} addTask={addTask} lastTaskPos={lastTaskPos} />}
        </div>
    )
}