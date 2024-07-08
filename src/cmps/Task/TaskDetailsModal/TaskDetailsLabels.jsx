import { SvgButton } from "../../CustomCpms/SvgButton";
import { ManageLabelsPopover } from "../ManageTaskPopovers/ManageLabelsPopover";

export function TaskDetailsLabels({ task, editTask, editLabel }) {
    return (
        <section className="task-details-labels">
            <p className="sub-title">Labels</p>
            <article className="label-list">
                {task.labels.map((label) => (

                    <div className="task-details-label" key={label.color} style={{ backgroundColor: label.color }}>
                        {label.label}
                    </div>
                ))}
                <ManageLabelsPopover editTask={editTask} editLabel={editLabel} task={task} anchorEl={popoverAncher} />
            </article>
        </section>
    )
}

const popoverAncher = (
    <SvgButton src="/img/workspace/pluseIcon.svg" className="add-label-btn" />
)