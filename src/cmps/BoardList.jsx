import { Card } from "antd"
import { ListCard } from "./ListCard"
import { Typography } from "antd"

export function BoardList({ list, cards }) {
    return (
        <Card className="board-list custom-card">
            <p className="list-title">{list.name}</p>
            {cards.map(card => <ListCard key={card.id} card={card} />)}
        </Card>
    )
}