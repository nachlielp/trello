import { utilService } from "../../services/util.service"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toggleIsExpanded } from "../../store/board.actions"
import { Tooltip } from "antd"

export function TaskPreviewLabel({ label }) {
    const [hoveredLabelId, setHoveredLabelId] = useState(null)
    const [isLabelVisible, setIsLabelVisible] = useState(false)
    const isExpanded = useSelector((state) => state.boardModule.isExpanded)

    useEffect(() => {
        let timer
        if (isExpanded) {
            // Show label.name after 2 seconds when isExpanded is true
            timer = setTimeout(() => setIsLabelVisible(true), 500)
        } else {
            // Reset the visibility immediately when not expanded
            setIsLabelVisible(false)
            clearTimeout(timer)
        }

        return () => clearTimeout(timer)
    }, [isExpanded])

    function onClick(e) {
        e.stopPropagation()
        toggleIsExpanded()
    }
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
                className={`card-label ${
                    isExpanded ? "expanded" : "minimized"
                }`}
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
                {isExpanded &&isLabelVisible ? label.name : ""}
            </button>
        </Tooltip>
    )
}
