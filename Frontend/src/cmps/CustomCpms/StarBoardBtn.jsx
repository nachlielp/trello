import { StarOutlined, StarFilled } from "@ant-design/icons"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export function StarBoardBtn({ starredBoardIds, boardId, starClick }) {
    const [hover, setHover] = useState(false)
    const [isStarredBoard, setIsStarredBoard] = useState(false)
    const user = useSelector((state) => state.userModule.user)

    useEffect(() => {
        if (starredBoardIds) {
            setIsStarredBoard(starredBoardIds.includes(boardId))
        }
    }, [starredBoardIds, boardId])

    function onStarClick(e) {
        e.stopPropagation()
        starClick(boardId)
    }
    return (
        <button
            className={`star-board-btn  ${isStarredBoard ? "starred" : ""}`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={onStarClick}
        >
            {isStarredBoard ? (
                hover ? (
                    <StarOutlined />
                ) : (
                    <StarFilled />
                )
            ) : hover ? (
                <StarFilled />
            ) : (
                <StarOutlined />
            )}
        </button>
    )
}
