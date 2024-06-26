import { Card, Button } from "antd"
import { ListCardPreview } from "./ListCardPreview"
import { EllipsisOutlined } from "@ant-design/icons"
import { ListFooter } from "./ListFooter"

export function BoardList({ list, cards, addCard }) {

    return (
        <Card className="board-list custom-card">
            <header className="board-list-header">
                <p className="list-title">{list.name}</p>
                <Button className="list-more-btn" size="small"><EllipsisOutlined /></Button>
            </header>
            {cards.map(card => <ListCardPreview key={card.id} card={card} />)}
            <ListFooter idList={list.id} addCard={addCard} />
        </Card>
    )
}