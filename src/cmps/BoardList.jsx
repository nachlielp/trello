import { Card } from "antd"
import { ListCard } from "./ListCard"

export function BoardList({ list, cards }) {
    console.log(cards)
    return (
        <Card className="board-list custom-card">
            <Card.Meta title={list.name} />
            {cards.map(card => <ListCard key={card.id} card={card} />)}
        </Card>
    )
}