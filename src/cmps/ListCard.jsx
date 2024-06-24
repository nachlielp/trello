import { Card, Image } from "antd"
import { utilService } from "../services/util.service"
import Label from "./Label"

export function ListCard({ card }) {
    const cardHeader = (
        card.cover.color && card.cover.size == 'normal' ?
            <div className="list-card-header" style={{ backgroundColor: utilService.getColorHashByName(card.cover.color) }}>&nbsp;</div>
            : card.cover.idUploadedBackground && card.cover.size == 'normal' ?
                <Image src={card.cover.scaled[2].url} alt="card cover" className="list-card-header-img" height={256} width={260} preview={false} />
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
                    {card.labels.map(label => <Label key={label.id} label={label} isExpanded={false} />)}
                </article>
                <span className="list-card-content-title">{card.name}</span>
            </section>
        </Card>
    )
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
