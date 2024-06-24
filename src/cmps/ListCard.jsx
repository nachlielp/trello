import { Card } from "antd"

export function ListCard({ card }) {
    const cardHeader = (
        card.cover.color && card.cover.size == 'normal' ?
            <div className="list-card-header" style={{ backgroundColor: getColorHashByName(card.cover.color) }}>&nbsp;</div>
            :
            <></>
    )

    const cardStyle = card.cover.color && card.cover.size == 'full' ? { backgroundColor: getColorHashByName(card.cover.color) } : {}

    return (
        <Card className={`list-card custom-card ${getCardCoverType(card)}`} style={cardStyle}>
            {cardHeader}
            <section className="list-card-content">
                {card.name}
            </section>
        </Card>
    )
}


function getCardCoverType(card) {
    if (!card.cover.color && !card.cover.idUploadedBackground) {
        return '';
    }
    if (card.cover.color && card.cover.size === 'normal') {
        return 'card-header-cover';
    }
    if (card.cover.color && card.cover.size === 'full') {
        return 'card-bg-cover';
    }
    if (card.cover.idUploadedBackground) {
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