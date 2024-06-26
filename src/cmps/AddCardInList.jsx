import { Input } from "antd"
const { TextArea } = Input;
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

export function AddCardInList({ idList, closeAddCard, addCard, firstCardPos, lastCardPos }) {
    const [cardName, setCardName] = useState('');

    async function onAddCard() {

        const newCard = {
            idList,
            name: cardName,
        }
        if (firstCardPos) {
            console.log('firstCardPos', firstCardPos);
            newCard.pos = firstCardPos - 1234
            console.log('newCardPos', newCard.pos);
        }
        if (lastCardPos) {
            console.log('lastCardPos', lastCardPos);
            newCard.pos = lastCardPos + 1234
            console.log('newCardPos', newCard.pos);
        }
        await addCard(newCard)
        closeAddCard()
    }
    return (
        <section className="add-card-in-list-footer">
            <TextArea
                className="footer-input"
                placeholder="Enter a title for this card"
                autoSize={{ minRows: 2, maxRows: 6 }}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />
            <article className="footer-actions">
                <button type="primary" onClick={onAddCard} className="add-card-btn">Add card</button>
                <button type="secondary" onClick={closeAddCard} className="close-add-card-btn"><CloseOutlined /></button>
            </article>
        </section>
    )
}