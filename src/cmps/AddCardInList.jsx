import { Input } from "antd"
const { TextArea } = Input;
import { CloseOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";

export function AddCardInList({ idList, closeAddCard, addCard, firstCardPos, lastCardPos }) {
    const [cardName, setCardName] = useState('');
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);

    async function onKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAddCard();
        }
    }
    async function onAddCard() {
        if (!cardName) {
            closeAddCard()
            return;
        }

        const newCard = {
            idList,
            name: cardName,
        }

        //TODO find a better Strategy for when i add twice to the same column multiple cards
        if (firstCardPos) {
            newCard.pos = firstCardPos - 123
            console.log('firstCardPos: ', firstCardPos)
            console.log('newCard.pos: ', newCard.pos)
        }
        if (lastCardPos) {
            newCard.pos = lastCardPos + 123
        }
        await addCard(newCard)
        setCardName('')
    }
    return (
        <section className="add-card-in-list-footer">
            <TextArea
                ref={textAreaRef}
                className="footer-input"
                placeholder="Enter a title for this card"
                autoSize={{ minRows: 2, maxRows: 6 }}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <article className="footer-actions">
                <button type="primary" onClick={onAddCard} className="add-card-btn">Add card</button>
                <button type="secondary" onClick={closeAddCard} className="close-add-card-btn"><CloseOutlined /></button>
            </article>
        </section>
    )
}