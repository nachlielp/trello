import { ReactSVG } from "react-svg"

export function TaskDetailsSectionHeader({ title, icon }) {
    return (
        <header className="task-details-section-header">
            <ReactSVG src={icon} wrapper="span" className="section-icon" />
            <h3 className="section-title">{title}</h3>
        </header>
    )
}
