import { Card, Tooltip } from "antd"
import { utilService } from "../services/util.service"
import { Label } from "./Label"
import { EditOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { Avatar } from "antd"
import descriptionIcon from '../assets/svgs/description.svg'
import fileIcon from '../assets/svgs/file.svg'
import { UserAvatar } from "./UserAvatar"

//TODO rename to ListCardPreview
export function ListCard({ card }) {

    const members = useSelector(state => state.boardModule.members)

    const cardMembers = members.filter(member => card.idMembers.includes(member.id)) || []
    console.log('cardMembers', cardMembers)
    const cardMembersAvatars = cardMembers.map(member => <UserAvatar key={member.id} member={member} />)

    const cardIcons = getCardIcons(card)

    const cardHeader = getCardHeader(card)

    //TODO destruct card
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
                <div className={`list-card-content-icons ${getCardCoverClass(card)}`}>
                    <aside className="aside-left">
                        {cardIcons}
                    </aside>
                    <aside className="aside-right">
                        {cardMembersAvatars}
                    </aside>
                </div>
            </section>
        </Card>
    )
}

function getCardHeader(card) {
    return (
        card.cover.color && card.cover.size == 'normal' ?
            <div className="list-card-header" style={{ backgroundColor: utilService.getColorHashByName(card.cover.color) }}>&nbsp;</div>
            : card.cover.idUploadedBackground && card.cover.size == 'normal' ?
                <div className="list-card-header img-cover" style={{ backgroundImage: `url(${card.cover.scaled[2].url})` }}></div>
                :
                <></>
    )
}

//TODO move to component
function getCardMemerAvatars(members, cardMemberIds) {
    const cardMembers = members.filter(member => cardMemberIds.includes(member.id)) || []
    return cardMembers.map(member =>
        <Tooltip placement="bottom" title={member.fullName}>
            <Avatar
                key={member.id} src={member.avatarHash}
                style={{ backgroundColor: utilService.stringToColor(member.id), height: '24px', width: '24px' }}>
                {utilService.capitalizeInitials(member.fullName)}
            </Avatar>
        </Tooltip>)
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

function getCardIcons(card) {
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
    return cardIcons
}