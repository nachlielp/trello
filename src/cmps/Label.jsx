import { utilService } from "../services/util.service";

export function Label({ label, isExpanded }) {


    function onClick() {
        utilService.saveToStorage('labelState', { showText: !isExpanded })
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