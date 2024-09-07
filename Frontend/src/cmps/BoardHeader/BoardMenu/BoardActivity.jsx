import { useSelector } from "react-redux"
import { ActivityMsg } from "../../ActivityMsg"

export function BoardActivity() {
    const board = useSelector((state) => state.boardModule.board)
    if (!board.activities.length) return
    return board.activities
        .sort((a, b) => {
            return b.timeStamp - a.timeStamp
        })
        .map((activity) => (
            <ActivityMsg activity={activity} key={activity.id} />
        ))
}
