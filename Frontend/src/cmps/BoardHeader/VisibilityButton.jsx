import { Popover } from "antd"
import { useEffect, useState } from "react"
import { CloseOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"

//svg
import { ReactSVG } from "react-svg"
import peopleIcon from "/img/board-index/headerImgs/peopleIcon.svg"
import privateIcon from "/img/board-index/headerImgs/privateIcon.svg"
import publicIcon from "/img/board-index/headerImgs/publicIcon.svg"
import { VisibilityOptions } from "./VisibilityOptions"

export function VisibilityButton() {
    const [openListMenu, setOpenListMenu] = useState(false)
    const [svg, setSvg] = useState(privateIcon)
    const permissionLevel = useSelector(
        (state) => state.boardModule.board.prefs?.permissionLevel,
    )

    const icon = [
        { permission: "private", svg: privateIcon },
        { permission: "org", svg: peopleIcon },
        { permission: "public", svg: publicIcon },
    ]

    useEffect(() => {
        const currentSvg = icon.find((i) => i.permission === permissionLevel)
        if (currentSvg) {
            setSvg(currentSvg.svg)
        }
    }, [permissionLevel])

    return (
        <Popover
            className="list-actions-menu-popover"
            trigger="click"
            placement="bottomLeft"
            open={openListMenu}
            onOpenChange={setOpenListMenu}
            arrow={false}
            content={
                <section className="visibility-popover">
                    <header className="menu-header">
                        <h2>Change visibility</h2>
                        <span onClick={() => setOpenListMenu(!openListMenu)}>
                            <CloseOutlined />
                        </span>
                    </header>
                    <div className="menu-body">
                        <VisibilityOptions setOpenListMenu={setOpenListMenu} />
                    </div>
                </section>
            }
        >
            <button
                className="visibility-btn"
                onClick={() => setOpenListMenu(!openListMenu)}
            >
                <ReactSVG src={svg || null} wrapper="span" />
            </button>
        </Popover>
    )
}
