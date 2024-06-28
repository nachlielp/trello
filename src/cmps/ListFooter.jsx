import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import templateCard from "../assets/svgs/template-card.svg"
import { AddCardInList } from "./AddCardInList"
import { ReactSVG } from "react-svg"

export function ListFooter({ idList, addCard, lastCardPos }) {
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
                    <ReactSVG src={templateCard} alt="template card" className="template-card" wrapper="span"/>
                </button>
            </>}
            {isAddCardOpen && <AddCardInList idList={idList} closeAddCard={closeAddCard} addCard={addCard} lastCardPos={lastCardPos} />}
        </div>
    )
}