import { utilService } from "../services/util.service";

export default function Label({ label, isExpanded }) {
    return <button className={`card-label ${isExpanded ? 'expanded' : 'minimized'}`} style={{ backgroundColor: utilService.getColorHashByName(label.color) }}>{isExpanded ? label.name : ''}</button>;
}