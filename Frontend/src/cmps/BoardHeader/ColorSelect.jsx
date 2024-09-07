import { Popover } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
//svg
import { DownOutlined } from "@ant-design/icons"
import { ReactSVG } from "react-svg"
import checkedIcon from "/img/board-index/headerImgs/checkedIcon.svg"

export function ColorSelect() {
    const [openListMenu, setOpenListMenu] = useState(false)
    const boardLabels = useSelector(
        (state) => state.boardModule.board.labelNames,
    )
    const filteredLabels =
        boardLabels &&
        Object.keys(boardLabels)
            .filter((key) => !key.includes("_"))
            .map((key) => ({ name: key, value: boardLabels[key] }))

    return (
        <Popover
            className="list-actions-menu-popover"
            trigger="click"
            placement="bottomLeft"
            open={openListMenu}
            onOpenChange={setOpenListMenu}
            arrow={false}
            content={
                <>
                    {filteredLabels &&
                        filteredLabels.map((label) => (
                            <li key={label.name}>
                                <label>
                                    <input type="checkbox" />
                                    <ReactSVG
                                        src={checkedIcon}
                                        className="checkbox"
                                        wrapper="span"
                                    />
                                    <span
                                        title={label.value}
                                        style={{
                                            backgroundColor:
                                                utilService.getColorHashByName(
                                                    label.name,
                                                ),
                                        }}
                                        className="color-peaker"
                                    >
                                        {label.value}
                                    </span>
                                </label>
                            </li>
                        ))}
                </>
            }
        >
            <input />
            <DownOutlined className="arow" />
        </Popover>
    )
}
