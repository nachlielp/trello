import { Card, Button } from "antd"
import { ListCard } from "./ListCard"
import { EllipsisOutlined } from "@ant-design/icons"

export function BoardList({ list, cards }) {
    return (
        <Card className="board-list custom-card">
            <header className="board-list-header">
                <p className="list-title">{list.name}</p>
                <Button className="list-more-btn" size="small"><EllipsisOutlined /></Button>
            </header>
            {cards.map(card => <ListCard key={card.id} card={card} />)}
        </Card>
    )
}