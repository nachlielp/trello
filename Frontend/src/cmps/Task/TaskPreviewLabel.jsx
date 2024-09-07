import { utilService } from "../../services/util.service"
import { useSelector } from "react-redux"
import { useState } from "react"
import { toggleIsExpanded } from "../../store/board.actions"
import { Tooltip } from "antd"

export function TaskPreviewLabel({ label }) {
    const [hoveredLabelId, setHoveredLabelId] = useState(null)
    const isExpanded = useSelector((state) => state.boardModule.isExpanded)
    function onClick(e) {
        e.stopPropagation()
        toggleIsExpanded()
    }
    return (
        <Tooltip
            placement="bottom"
            title={`Color: ${label.color}, title: ${
                label.name ? `"${label.name}"` : "none"
            }`}
            arrow={false}
            overlayInnerStyle={utilService.tooltipOuterStyle()}
        >
            <button
                className={`card-label ${isExpanded ? "expanded" : "minimized"}`}
                style={{
                    backgroundColor:
                        hoveredLabelId === label.id
                            ? utilService.getColorHashByName(label.color)
                                  .hoverdBgColor
                            : utilService.getColorHashByName(label.color)
                                  .bgColor,
                    color: utilService.getColorHashByName(label.color)
                        .lightFontColor,
                }}
                onClick={onClick}
                onMouseEnter={() => setHoveredLabelId(label.id)}
                onMouseLeave={() => setHoveredLabelId(null)}
            >
                {isExpanded ? label.name : ""}
            </button>
        </Tooltip>
    )
}
