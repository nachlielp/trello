import { Card, Image } from "antd"

export function ListCard({ card }) {
    const cardHeader = (
        card.cover.color && card.cover.size == 'normal' ?
            <div className="list-card-header" style={{ backgroundColor: getColorHashByName(card.cover.color) }}>&nbsp;</div>
            : card.cover.idUploadedBackground && card.cover.size == 'normal' ?
                <Image src={card.cover.scaled[2].url} alt="card cover" className="list-card-header-img" height={256} width={260} />
                :
                <></>
    )

    const cardStyle = card.cover.color && card.cover.size == 'full' ? { backgroundColor: getColorHashByName(card.cover.color) } : {}

    const cardBackgroundImage = card.cover.idUploadedBackground && card.cover.size == 'full' ? { backgroundImage: `url(${card.cover.scaled[2].url})`, backgroundSize: 'cover' } : {};

    const isImageCover = card.cover.idUploadedBackground && card.cover.size === 'full';

    return (
        <Card className={`list-card custom-card ${getCardCoverClass(card)}`} style={{ ...cardStyle, ...cardBackgroundImage }}>
            {cardHeader}
            <section className={`list-card-content ${isImageCover ? 'image-cover' : ''}`}>
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

function getColorHashByName(name) {
    switch (name) {
        case 'yellow':
            return '#f5cd47';
        case 'green':
            return '#4cce97';
        case 'purple':
            return '#9f8fef';
        case 'orange':
            return '#fea362';
        case 'red':
            return '#f87169'
        case 'blue':
            return '#569dff'
        case 'sky':
            return '#6cc3e0'
        case 'lime':
            return '#94c748'
        case 'pink':
            return '#e774bb'
        case 'black':
            return '#8590a2'
        default:
            return '#fff'
    }
}