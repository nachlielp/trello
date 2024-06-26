import { Card } from "antd"
import { utilService } from "../services/util.service"
import { Label } from "./Label"
import { useSelector } from "react-redux"
import { UserAvatar } from "./UserAvatar"
import { CardPreviewIcons } from "./CardPreviewIcons"

export function ListCardPreview({ card }) {

    const members = useSelector(state => state.boardModule.members)

    const cardMembers = members.filter(member => card.idMembers.includes(member.id)) || []

    const cardCover = card.cover
    const isFullCover = cardCover.size === 'full'
    const isHalfCover = cardCover.size === 'normal'
    const cardColorCoverStyle = cardCover.color && cardCover.size == 'full' ? { backgroundColor: utilService.getColorHashByName(cardCover.color) } : {}
    const isImageCover = cardCover.idUploadedBackground && cardCover.size === 'full';
    const cardBackgroundCoverImage = isImageCover ? { backgroundImage: `url(${cardCover.scaled[2].url})`, backgroundSize: 'cover' } : {};

    return (
        <Card className={`list-card custom-card ${getCardFullCoverClass(cardCover)}`} style={{ ...cardColorCoverStyle, ...cardBackgroundCoverImage }}>
            {isFullCover &&
                <section className={`list-card-content ${isImageCover ? 'image-cover' : ''}`}>
                    <span className="list-card-content-title">{card.name}</span>
                </section>
            }
            {!isFullCover &&
                <>
                    {isHalfCover &&
                        cardCover.color && <div className="list-card-header" style={{ backgroundColor: utilService.getColorHashByName(card.cover.color) }}>&nbsp;</div>
                        ||
                        cardCover.idUploadedBackground && <div className="list-card-header img-cover" style={{ backgroundImage: `url(${card.cover.scaled[2].url})` }}></div>
                    }
                    <section className='list-card-content'>
                        <article className="list-card-content-labels">
                            {card.labels.map(label => <Label key={label.id} label={label} isExpanded={true} />)}
                        </article>
                        <span className="list-card-content-title">{card.name}</span>
                        <div className="list-card-content-icons">
                            <aside className="aside-left">
                                <CardPreviewIcons card={card} />
                            </aside>
                            <aside className="aside-right">
                                {cardMembers.map(member => <UserAvatar key={member.id} member={member} />)}
                            </aside>
                        </div>
                    </section>
                </>
            }
        </Card>
    )
}

function getCardFullCoverClass(cardCover) {
    if (cardCover.size === 'full') {
        if (cardCover.color) {
            return 'card-bg-cover'
        }
        if (cardCover.idUploadedBackground) {
            return 'card-img-cover'
        }
    }
    return '';
}
