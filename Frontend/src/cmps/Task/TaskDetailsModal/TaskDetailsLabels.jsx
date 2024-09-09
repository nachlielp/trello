import { SvgButton } from "../../CustomCpms/SvgButton"
import { ManageLabelsPopover } from "../ManageTaskPopovers/ManageLabelsPopover"
import { useSelector } from "react-redux"
import { utilService } from "../../../services/util.service"
import { useState } from "react"
import { Tooltip } from "antd"

export function TaskDetailsLabels({ task, editTask, labelActions }) {
    const boardLabels = useSelector((state) => state.boardModule.board.labels)
    const [hoveredLabelId, setHoveredLabelId] = useState(null)
    return (
        <section className="task-details-labels">
            <p className="sub-title">Labels</p>

            <ManageLabelsPopover
                editTask={editTask}
                labelActions={labelActions}
                task={task}
                anchorEl={
                    <article className="label-list">
                        {boardLabels
                            ?.filter((bLabel) =>
                                task.idLabels.includes(bLabel.id)
                            )
                            .map((labelInfo) => {
                                return (
                                    <Tooltip
                                        placement="bottom"
                                        title={`Color: ${
                                            labelInfo.color
                                        }, title: ${
                                            labelInfo.name
                                                ? `"${labelInfo.name}"`
                                                : "none"
                                        }`}
                                        arrow={false}
                                        overlayClassName="label-details-tooltip"
                                        overlayInnerStyle={utilService.tooltipOuterStyle()}
                                        key={labelInfo.id}
                                    >
                                        <div
                                            className="task-details-label"
                                            style={{
                                                backgroundColor:
                                                    hoveredLabelId ===
                                                    labelInfo.id
                                                        ? utilService.getColorHashByName(
                                                              labelInfo.color
                                                          ).hoverdBgColor
                                                        : utilService.getColorHashByName(
                                                              labelInfo.color
                                                          ).bgColor,
                                                color: utilService.getColorHashByName(
                                                    labelInfo.color
                                                ).lightFontColor,
                                            }}
                                            onMouseEnter={() =>
                                                setHoveredLabelId(labelInfo.id)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredLabelId(null)
                                            }
                                        >
                                            {labelInfo.name}
                                        </div>
                                    </Tooltip>
                                )
                            })}
                        <SvgButton
                            src="/img/workspace/pluseIcon.svg"
                            className="add-label-btn"
                        />
                    </article>
                }
            />
        </section>
    )
}
