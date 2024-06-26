import { useState } from "react"
import { PlusOutlined, CloseOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { Card } from "antd"

export function AddListBtn({ addList }) {
    const [isAddListOpen, setIsAddListOpen] = useState(false)
    const [listName, setListName] = useState('');

    function onAddList() {
        console.log('onAddList')
        addList(listName)
        setIsAddListOpen(false)
        setListName('')
    }
    return (
        <div className="add-list-btn-wrapper">
            {!isAddListOpen &&
                <button className="add-list-btn" onClick={() => setIsAddListOpen(true)}>
                    <span className="add-list-btn-text">
                        <PlusOutlined />&nbsp;Add another list
                    </span>
                </button>
            }
            {isAddListOpen &&
                <Card className="add-list-in-board-card">
                    <Input
                        className="add-list-input"
                        placeholder="Enter list title..."
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                    <article className="footer-actions">
                        <button type="primary" onClick={() => onAddList()} className="add-card-btn">Add card</button>
                        <button type="secondary" onClick={() => setIsAddListOpen(false)} className="close-add-card-btn"><CloseOutlined /></button>
                    </article>
                </Card>}
        </div>
    )
}