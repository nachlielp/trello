import { utilService } from "../services/util.service";
import { useSelector } from "react-redux";
import { toggleIsExpanded } from "../store/trello.actions";
import { Tooltip } from "antd";

export function Label({ label }) {
    const isExpanded = useSelector(state => state.boardModule.isExpanded)
    function onClick() {
        // utilService.saveToStorage('labelState', { showText: !isExpanded })
        toggleIsExpanded()
    }
    return (
        <Tooltip placement="bottom" title={`Color: ${label.color}, title: ${label.name ? `"${label.name}"` : "none"}`}>
            <button
                className={`card-label ${isExpanded ? 'expanded' : 'minimized'}`}
                style={{ backgroundColor: utilService.getColorHashByName(label.color) }}
                onClick={onClick}>
                {isExpanded ? label.name : ''}
            </button>
        </Tooltip>
    );
}