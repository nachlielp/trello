import { Card } from "antd"
import { utilService } from "../services/util.service"
import { Label } from "./Label"
import { EditOutlined } from "@ant-design/icons"

export function ListCard({ card }) {
    const cardHeader = (
        card.cover.color && card.cover.size == 'normal' ?
            <div className="list-card-header" style={{ backgroundColor: utilService.getColorHashByName(card.cover.color) }}>
                &nbsp;
            </div>
            : card.cover.idUploadedBackground && card.cover.size == 'normal' ?
                <div className="list-card-header img-cover" style={{ backgroundImage: `url(${card.cover.scaled[2].url})` }}>
                </div>
                :
                <></>
    )

    const cardStyle = card.cover.color && card.cover.size == 'full' ? { backgroundColor: utilService.getColorHashByName(card.cover.color) } : {}

    const cardBackgroundImage = card.cover.idUploadedBackground && card.cover.size == 'full' ? { backgroundImage: `url(${card.cover.scaled[2].url})`, backgroundSize: 'cover' } : {};

    const isImageCover = card.cover.idUploadedBackground && card.cover.size === 'full';

    return (
        <Card className={`list-card custom-card ${getCardCoverClass(card)}`} style={{ ...cardStyle, ...cardBackgroundImage }}>
            {cardHeader}
            <section className={`list-card-content ${isImageCover ? 'image-cover' : ''}`}>
                <article className="list-card-content-labels">
                    {card.labels.map(label => <Label key={label.id} label={label} isExpanded={true} />)}
                </article>
                <span className="list-card-content-title">{card.name}</span>
            </section>
        </Card>
    )
}

const EditIcon = () => {
    return <span className="card-edit-icon"><EditOutlined /></span>
}
function getCardCoverClass(card) {
    if (!card.cover.color && !card.cover.idUploadedBackground) {
        return '';
    }
    if (card.cover.color && card.cover.size === 'normal') {
        return 'card-header-cover';
    }
    if (card.cover.color && card.cover.size === 'full') {
        return 'card-bg-cover';
    }
    if (card.cover.idUploadedBackground && card.cover.size === 'full') {
        return 'card-img-cover';
    }
    return '';
}
