import { Card } from "antd"

export function ListCard({ card }) {
    console.log('color: ', card.cover.color)
    const header = (
        card.cover.color && card.cover.size == 'normal' ?
            <div className="list-card-header" style={{ backgroundColor: card.cover.color }}>&nbsp;</div>
            :
            <></>
    )
    const style = card.cover.color && card.cover.size == 'full' ? { backgroundColor: card.cover.color } : {}
    return (
        <Card className="list-card custom-card" style={style}>
            {header}
            <section className="list-card-content">
                {card.name}
            </section>
        </Card>
    )
}