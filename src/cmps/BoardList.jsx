import { Card } from "antd"
import { ListCardPreview } from "./ListCardPreview"
import { ListFooter } from "./ListFooter"
import { useState } from "react"
import { ListActionsMenuPopover } from "./ListActionsMenuPopover"
import { AddCardInList } from "./AddCardInList"

export function BoardList({ list, cards, addCard, archiveList }) {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)

    const openAddCard = () => {
        setIsAddCardOpen(true)
    }

    const sortedCards = cards.sort((a, b) => a.pos - b.pos)

    const firstCardPos = sortedCards.length > 0 ? sortedCards[0].pos : 0
    const lastCardPos = sortedCards.length > 0 ? sortedCards[sortedCards.length - 1].pos : 0

    return (
        <div className="board-list-container">
            <Card className="board-list custom-card">
                <header className="board-list-header">
                    <p className="list-title">{list.name}</p>
                    <ListActionsMenuPopover openAddCard={openAddCard} archiveList={archiveList} />
                </header>
                {isAddCardOpen && <AddCardInList idList={list.id} closeAddCard={() => setIsAddCardOpen(false)} addCard={addCard} firstCardPos={firstCardPos} />}
                {sortedCards.map(card => <ListCardPreview key={card.id} card={card} />)}
                <ListFooter idList={list.id} addCard={addCard} lastCardPos={lastCardPos} />
            </Card>
        </div>
    )
}