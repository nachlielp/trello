import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"

import templateCard from "../assets/svgs/template-card.svg"
export function ListFooter() {
    return (
        <div className="list-footer">
            <Button className="add-card-btn"><PlusOutlined /> Add a card</Button><Button className="use-template-btn"><img src={templateCard} alt="template card" /></Button>
        </div>
    )
}