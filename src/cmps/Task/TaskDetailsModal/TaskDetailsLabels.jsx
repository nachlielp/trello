import { SvgButton } from "../../CustomCpms/SvgButton";
import { ManageLabelsPopover } from "../ManageTaskPopovers/ManageLabelsPopover";
import { useSelector } from "react-redux";
import { utilService } from "../../../services/util.service";
export function TaskDetailsLabels({ task, editTask, editLabel }) {
    const boardLabels = useSelector((state) => state.boardModule.board.labelNames);
    return (
        <section className="task-details-labels">
            <p className="sub-title">Labels</p>
            <article className="label-list">
                {task.labels.map((tLabel) => {
                    const labelInfo = boardLabels?.find((bLabel) => bLabel.color === tLabel.color)
                    return (
                        <div className="task-details-label" key={labelInfo.color} style={{ backgroundColor: utilService.getColorHashByName(labelInfo.color).bgColor }}>
                            {labelInfo.label}
                        </div>)
                })}
                <ManageLabelsPopover editTask={editTask} editLabel={editLabel} task={task} anchorEl={popoverAncher} />
            </article>
        </section>
    )
}

const popoverAncher = (
    <SvgButton src="/img/workspace/pluseIcon.svg" className="add-label-btn" />
)