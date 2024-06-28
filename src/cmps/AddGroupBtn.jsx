import { useState } from "react"
import { PlusOutlined, CloseOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { Card } from "antd"

export function AddGroupBtn({ addGroup }) {
    const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
    const [groupName, setGroupName] = useState('');

    function onAddGroup() {
        console.log('onAddGroup')
        addGroup(groupName)
        setIsAddGroupOpen(false)
        setGroupName('')
    }
    return (
        <div className="add-list-btn-wrapper">
            {!isAddGroupOpen &&
                <button className="add-list-btn" onClick={() => setIsAddGroupOpen(true)}>
                    <span className="add-list-btn-text">
                        <PlusOutlined />&nbsp;Add another list
                    </span>
                </button>
            }
            {isAddGroupOpen &&
                <Card className="add-list-in-board-card">
                    <Input
                        className="add-list-input"
                        placeholder="Enter list title..."
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <article className="footer-actions">
                        <button type="primary" onClick={() => onAddGroup()} className="add-card-btn">Add card</button>
                        <button type="secondary" onClick={() => setIsAddGroupOpen(false)} className="close-add-card-btn"><CloseOutlined /></button>
                    </article>
                </Card>}
        </div>
    )
}