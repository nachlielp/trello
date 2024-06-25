import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"

import templateCard from "../assets/svgs/template-card.svg"

export function ListFooter() {
    return (
        <div className="list-footer">
            <button className="add-card-btn">
                <PlusOutlined />&nbsp;&nbsp;Add a card
            </button>
            <button className="use-template-btn">
                <img src={templateCard} alt="template card" className="template-card" />
            </button>
        </div>
    )
}