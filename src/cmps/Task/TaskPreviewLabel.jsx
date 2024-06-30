import { utilService } from "../../services/util.service";
import { useSelector } from "react-redux";

import { toggleIsExpanded } from "../../store/board.actions";
import { Tooltip } from "antd";

export function TaskPreviewLabel({ label }) {
    const isExpanded = useSelector(state => state.boardModule.isExpanded)
    function onClick(e) {
        e.stopPropagation()
        toggleIsExpanded()
    }
    return (
        <Tooltip placement="bottom" title={`Color: ${label.color}, title: ${label.name ? `"${label.name}"` : "none"}`} arrow={false}>
            <button
                className={`card-label ${isExpanded ? 'expanded' : 'minimized'}`}
                style={{ backgroundColor: utilService.getColorHashByName(label.color).bgColor }}
                onClick={onClick}>
                {isExpanded ? label.name : ''}
            </button>
        </Tooltip>
    );
}