import { Card } from "antd"
import { ListCardPreview } from "./ListCardPreview"
import { ListFooter } from "./ListFooter"
import { useState, useRef, useEffect } from "react"
import { ListActionsMenuPopover } from "./ListActionsMenuPopover"
import { AddCardInList } from "./AddCardInList"

export function BoardList({ list, cards, addCard, archiveList }) {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)
    const [oldCardIds, setOldCardIds] = useState(cards.map(card => card.id))
    const [firstCardPos, setFirstCardPos] = useState(null)
    const [lastCardPos, setLastCardPos] = useState(null)
    const [sortedCards, setSortedCards] = useState([])

    useEffect(() => {
        setSortedCards(cards.sort((a, b) => a.pos - b.pos))
    }, [cards])

    useEffect(() => {
        const sortedCards = cards.sort((a, b) => a.pos - b.pos)
        if (sortedCards.length > 0) {
            setFirstCardPos(sortedCards[0].pos)
            setLastCardPos(sortedCards[sortedCards.length - 1].pos)
        }
    }, [])

    useEffect(() => {
        const sortedCards = cards.sort((a, b) => a.pos - b.pos)
        if (sortedCards.length > 0) {

            setFirstCardPos(sortedCards[0].pos)
            setLastCardPos(sortedCards[sortedCards.length - 1].pos)
        }
        setOldCardIds(cards.map(card => card.id))
        setOldCardIds(cards.map(card => card.id))
    }, [isAddCardOpen])


    const openAddCard = () => {
        setIsAddCardOpen(true)
    }


    return (
        <div className="board-list-container">
            <Card className="board-list custom-card">
                <header className="board-list-header">
                    <p className="list-title">{list.name}</p>
                    <ListActionsMenuPopover openAddCard={openAddCard} archiveList={archiveList} />
                </header>
                <main className="board-list-main">
                    {sortedCards.filter(card => !oldCardIds.includes(card.id)).map(card => <ListCardPreview key={card.id} card={card} />)}
                    {isAddCardOpen && <AddCardInList idList={list.id} closeAddCard={() => setIsAddCardOpen(false)} addCard={addCard} firstCardPos={firstCardPos} />}
                    {sortedCards.filter(card => oldCardIds.includes(card.id)).map(card => <ListCardPreview key={card.id} card={card} />)}
                    {!isAddCardOpen && <ListFooter idList={list.id} addCard={addCard} lastCardPos={lastCardPos} />}
                </main>
            </Card>
        </div>
    )
}