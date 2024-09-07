import { useState, useRef, useEffect } from "react"
import { PlusOutlined, CloseOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { Card } from "antd"
import { utilService } from "../../services/util.service"
import { updateBoard } from "../../store/board.actions"
import { useSelector } from "react-redux"

export function AddGroupBtn({ addGroup }) {
    const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
    const [groupName, setGroupName] = useState("")
    const inputRef = useRef(null)
    const user = useSelector((state) => state.userModule.user)
    const board = useSelector((state) => state.boardModule.board)

    useEffect(() => {
        if (inputRef.current) {
            const inputElement = inputRef.current
            inputElement.focus()
        }
    }, [isAddGroupOpen])

    async function onAddGroup() {
        if (groupName.trim() === "") {
            setIsAddGroupOpen(false)
        } else {
            const newActivity = utilService.createActivity(
                {
                    type: "addGroup",
                    targetName: groupName,
                },
                user
            )
            await updateBoard({
                ...board,
                activities: [...board?.activities, newActivity],
            })
            addGroup(groupName)
        }
        setGroupName("")
    }

    function onKeyDown(e) {
        if (e.key === "Enter") {
            onAddGroup()
        } else if (e.key === "Escape") {
            setIsAddGroupOpen(false)
            setGroupName("")
        }
    }

    const addListBtnTitle =
        board.groups.filter((g) => !g.closed).length === 0
            ? "Add a lists"
            : "Add another list"
    return (
        <>
            {(board.members.some((m) => m.id === user?.id) ||
                user?.isAdmin) && (
                <div className="add-group-btn-wrapper">
                    {!isAddGroupOpen && (
                        <button
                            className="add-group-btn"
                            onClick={() => setIsAddGroupOpen(true)}
                        >
                            <span className="add-group-btn-text">
                                <PlusOutlined />
                                &nbsp;{addListBtnTitle}
                            </span>
                        </button>
                    )}
                    {isAddGroupOpen && (
                        <Card className="add-group-in-board-card">
                            <Input
                                ref={inputRef}
                                className="add-group-input"
                                placeholder="Enter list title..."
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                onKeyDown={onKeyDown}
                            />
                            <article className="footer-actions">
                                <button
                                    type="primary"
                                    onClick={() => onAddGroup()}
                                    className="add-card-btn"
                                >
                                    Add list
                                </button>
                                <button
                                    type="secondary"
                                    onClick={() => setIsAddGroupOpen(false)}
                                    className="close-add-card-btn"
                                >
                                    <CloseOutlined />
                                </button>
                            </article>
                        </Card>
                    )}
                </div>
            )}
        </>
    )
}
