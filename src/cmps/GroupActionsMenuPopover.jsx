import { Popover, Button } from "antd"
import { useState } from "react"
import { EllipsisOutlined } from "@ant-design/icons"

export function GroupActionsMenuPopover({ openAddTask, archiveGroup }) {
    const [openGroupMenu, setOpenGroupMenu] = useState(false)

    function onClickAddTask() {
        openAddTask()
        setOpenGroupMenu(false)
    }

    function onArchiveGroup() {
        archiveGroup()
        setOpenGroupMenu(false)
    }

    return (
        <Popover
            className="list-actions-menu-popover"
            trigger="click"
            placement="bottomLeft"
            open={openGroupMenu}
            onOpenChange={setOpenGroupMenu}
            arrow={false}
            content={
                <section className="list-actions-menu-content">
                    <header className="menu-header">List actions</header>
                    <p className="menu-action" onClick={onClickAddTask}>Add card</p>
                    <p className="menu-action">Copy list</p>
                    <p className="menu-action">Move list</p>
                    <p className="menu-action">Move all cards in the list</p>
                    <p className="menu-action">Sort by...</p>
                    <p className="menu-action">Watch</p>
                    <p className="menu-action" onClick={onArchiveGroup}>Archive this list</p>
                    <p className="menu-action last-action">Archive all cards in the list</p>
                </section>
            }
        >
            <Button className="list-more-btn" size="small" onClick={() => setOpenGroupMenu(!openGroupMenu)}>
                <EllipsisOutlined />
            </Button>
        </Popover>
    )
}