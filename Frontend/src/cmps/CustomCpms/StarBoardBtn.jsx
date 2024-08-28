import {
    StarOutlined,
    StarFilled,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

export function StarBoardBtn({ starredBoardIds, boardId, starClick }) {

    const [hover, setHover] = useState(false);
    const [isStarredBoard, setIsStarredBoard] = useState(false);

    useEffect(() => {
        if (starredBoardIds) {
            setIsStarredBoard(starredBoardIds.includes(boardId));
        }
    }, [starredBoardIds]);

    function onStarClick(e) {
        e.stopPropagation();
        starClick(boardId);
    }
    return (
        <button
            className={`star-board-btn  ${isStarredBoard ? 'starred' : ""}`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={onStarClick}
        >
            {isStarredBoard ?
                hover ? <StarOutlined /> : <StarFilled />
                :
                hover ? <StarFilled /> : <StarOutlined />
            }
        </button>
    );
}