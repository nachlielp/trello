import { Popover, Button } from "antd"
import { useState } from "react"
import { EllipsisOutlined } from "@ant-design/icons"

export function ListActionsMenuPopover({ openAddCard }) {
    const [openListMenu, setOpenListMenu] = useState(false)

    function onClickAddCard() {
        openAddCard()
        setOpenListMenu(false)
    }
    return (
        <Popover
            className="list-actions-menu-popover"
            trigger="click"
            placement="bottomLeft"
            open={openListMenu}
            onOpenChange={setOpenListMenu}
            arrow={false}
            content={
                <section className="list-actions-menu-content">
                    <header className="menu-header">List actions</header>
                    <p className="menu-action" onClick={onClickAddCard}>Add Card</p>
                    <p className="menu-action">Copy list</p>
                    <p className="menu-action">Move list</p>
                    <p className="menu-action">Move all cards in the list</p>
                    <p className="menu-action">Sort by...</p>
                    <p className="menu-action">Watch</p>
                    <p className="menu-action">Archive this list</p>
                    <p className="menu-action last-action">Archive all cards in the list</p>
                </section>
            }
        >
            <Button className="list-more-btn" size="small" onClick={() => setOpenListMenu(!openListMenu)}>
                <EllipsisOutlined />
            </Button>
        </Popover>
    )
}