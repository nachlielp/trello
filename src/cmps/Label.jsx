import { utilService } from "../services/util.service";
import { useSelector } from "react-redux";
import { toggleIsExpanded } from "../store/trello.actions";

export function Label({ label }) {
    const isExpanded = useSelector(state => state.boardModule.isExpanded)
    function onClick() {
        //  utilService.saveToStorage('labelState', { showText: !isExpanded })
        toggleIsExpanded()
    }
    return (
        <button
            className={`card-label ${isExpanded ? 'expanded' : 'minimized'}`}
            style={{ backgroundColor: utilService.getColorHashByName(label.color) }}
            onClick={onClick}>
            {isExpanded ? label.name : ''}
        </button>
    );
}