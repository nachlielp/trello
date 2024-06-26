import { Tooltip } from "antd"
import descriptionIcon from "../assets/svgs/description.svg"
import fileIcon from "../assets/svgs/file.svg"

export function CardPreviewIcons({ card }) {
    const cardIcons = []
    if (card.badges.description) {
        cardIcons.push(
            <Tooltip placement="bottom" title="This card has a description" key="description">
                <span className="card-icon-wrapper">
                    <img src={descriptionIcon} alt="description" className="card-icon" />
                </span>
            </Tooltip>
        )
    }
    if (card.badges.attachments > 0) {
        cardIcons.push(
            <Tooltip placement="bottom" title="Attachments" key="attachments">
                <span className="card-icon-wrapper">
                    <img src={fileIcon} alt="file" className="card-icon" />
                    <span className="card-icon-count">{card.badges.attachments}</span>
                </span>
            </Tooltip>
        )
    }
    return (
        <section className="card-preview-icons">
            {cardIcons}
        </section>
    )
}