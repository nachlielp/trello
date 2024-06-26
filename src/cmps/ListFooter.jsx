import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import templateCard from "../assets/svgs/template-card.svg"
import { AddCardInListFooter } from "./AddCardInListFooter"

export function ListFooter({ idList, addCard }) {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false)
    function closeAddCard() {
        setIsAddCardOpen(false)
    }

    return (
        <div className="list-footer">
            {!isAddCardOpen && <>
                <button className="add-card-btn" onClick={() => setIsAddCardOpen(true)}>
                    <PlusOutlined />&nbsp;&nbsp;Add a card
                </button>
                <button className="use-template-btn">
                    <img src={templateCard} alt="template card" className="template-card" />
                </button>
            </>}
            {isAddCardOpen && <AddCardInListFooter idList={idList} closeAddCard={closeAddCard} addCard={addCard} />}
        </div>
    )
}