import { Popover, Input } from "antd"
import { useState, useEffect, useRef } from "react"
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader"
import { utilService } from "../../../services/util.service"
import { useSelector } from "react-redux"
import { SvgButton } from "../../CustomCpms/SvgButton"
import { Tooltip } from "antd"
import { CheckBox } from "../../CustomCpms/CheckBox"
import Popup from "@atlaskit/popup"
export function ManageLabelsPopover({
    anchorEl,
    editTask,
    task,
    labelActions,
}) {
    const boardLabels =
        useSelector((state) => state.boardModule.board.labels) || []
    const [boardTaskLabels, setBoardTaskLabels] = useState([])
    const [inputSearch, setInputSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [editColor, setEditColor] = useState("")
    const [filteredLabels, setFilteredLabels] = useState([])
    const [backToList, setBackToList] = useState(null)
    const [isCreateLabel, setIsCreateLabel] = useState(false)
    const [isDeleteLabel, setIsDeleteLabel] = useState(false)
    const [popoverTitle, setPopoverTitle] = useState("Labels")
    const [popoverPlacement, setPopoverPlacement] = useState("bottomLeft")
    const [hoveredColor, setHoveredColor] = useState(null)

    const popoverRef = useRef(null)

    useEffect(() => {
        if (task?.idLabels) {
            const arr = boardLabels.map((boardLabel) => {
                const isTask = task.idLabels.find(
                    (taskLabelId) => taskLabelId === boardLabel.id
                )
                if (isTask) {
                    return { ...boardLabel, isTask: true }
                }
                return { ...boardLabel, isTask: false }
            })
            setBoardTaskLabels(arr)
        }
    }, [task?.idLabels, boardLabels])

    useEffect(() => {
        if (inputSearch !== "") {
            setFilteredLabels(
                boardTaskLabels.filter((label) =>
                    label.name.toLowerCase().includes(inputSearch.toLowerCase())
                )
            )
        } else {
            setFilteredLabels(boardTaskLabels)
        }
    }, [inputSearch, boardTaskLabels])

    function onClose() {
        setIsOpen(false)
    }

    function onSelectLabel(label, isTask) {
        if (isTask) {
            editTask({ ...task, idLabels: [...task.idLabels, label.id] })
        } else {
            editTask({
                ...task,
                idLabels: task.idLabels.filter(
                    (taskLabel) => taskLabel !== label.id
                ),
            })
        }
    }

    function openEditLabel(label) {
        setPopoverTitle("Edit label")
        setSelectedLabel(label)
        setEditTitle(label.name)
        setEditColor(label.color)
        setBackToList(() => onBackToList)
    }

    function openCreateLabel() {
        setPopoverTitle("Create label")
        setEditColor("green")
        setIsCreateLabel(true)
        setBackToList(() => onBackToList)
    }

    function openDeleteLabel() {
        setPopoverTitle("Delete label")
        setIsDeleteLabel(true)
        setBackToList(() => onBackToEditList)
    }

    function onBackToEditList() {
        setPopoverTitle("Edit label")
        setIsDeleteLabel(false)
        setBackToList(() => onBackToList)
    }

    function onBackToList() {
        setSelectedLabel(null)
        setEditTitle("")
        setBackToList(null)
        setIsCreateLabel(false)
    }

    function onSaveLabel() {
        labelActions("edit", {
            ...selectedLabel,
            name: editTitle,
            color: editColor,
        })
        setSelectedLabel(null)
        setEditTitle("")
        setBackToList(null)
    }

    function onCreateLabel() {
        labelActions("create", { name: editTitle, color: editColor }, task)
        setSelectedLabel(null)
        setEditTitle("")
        setBackToList(null)
        setIsCreateLabel(false)
    }

    function onDeleteLabel() {
        labelActions("delete", selectedLabel)
        setSelectedLabel(null)
        setEditTitle("")
        setBackToList(null)
        setIsCreateLabel(false)
        setIsDeleteLabel(false)
    }

    const isEditPage = (selectedLabel || isCreateLabel) && !isDeleteLabel
    const isSelectPage = !selectedLabel && !isCreateLabel && !isDeleteLabel

    const content = (
        <section className="manage-labels-content" ref={popoverRef}>
            <ManageTaskPopoverHeader
                title={popoverTitle}
                close={onClose}
                back={backToList}
            />
            {isSelectPage && (
                <section className="select-labels-page">
                    <Input
                        placeholder="Search labels..."
                        className="labels-search-input"
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <h3 className="labels-sub-title">Labels</h3>
                    <article className="labels-list">
                        {filteredLabels.map((taskLabel) => (
                            <LabelsOption
                                key={taskLabel.id}
                                taskLabel={taskLabel}
                                selectLabel={onSelectLabel}
                                editColor={openEditLabel}
                            />
                        ))}
                    </article>
                    <button
                        className="lebel-full-btn"
                        onClick={openCreateLabel}
                    >
                        Create a new label
                    </button>
                </section>
            )}
            {isEditPage && (
                <section className="edit-labels-page">
                    <article className="edit-label-block-wrapper">
                        <div
                            className="disbly-label-block"
                            style={{
                                backgroundColor:
                                    utilService.getColorHashByName(editColor)
                                        .bgColor,
                            }}
                        >
                            <span
                                className="label-color-name manage-labels-color-name"
                                style={{
                                    color: utilService.getColorHashByName(
                                        editColor
                                    ).lightFontColor,
                                }}
                            >
                                {editTitle}
                            </span>
                        </div>
                    </article>
                    <h3 className="labels-sub-title">Title</h3>
                    <Input
                        className="labels-search-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <h3 className="labels-sub-title">Select a color</h3>
                    <article className="color-picker-wrapper">
                        {utilService.boardLabelColorOptions
                            .filter((color) => color.color !== "none")
                            .map((color) => (
                                <div
                                    className="color-picker-option"
                                    key={color.color}
                                    style={{
                                        backgroundColor:
                                            hoveredColor === color.color
                                                ? color.hoverdBgColor
                                                : color.bgColor,
                                    }}
                                    onClick={() => setEditColor(color.color)}
                                    onMouseEnter={() =>
                                        setHoveredColor(color.color)
                                    }
                                    onMouseLeave={() => setHoveredColor(null)}
                                ></div>
                            ))}
                    </article>
                    <button
                        className="lebel-full-btn"
                        onClick={() => setEditColor("none")}
                    >
                        Remove color
                    </button>
                    <label className="label-hr" />
                    <article className="edit-label-buttons">
                        {isCreateLabel && (
                            <button
                                className="save-button"
                                onClick={onCreateLabel}
                            >
                                Create
                            </button>
                        )}
                        {!isCreateLabel && (
                            <>
                                <button
                                    className="save-button"
                                    onClick={onSaveLabel}
                                >
                                    Save
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={openDeleteLabel}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </article>
                </section>
            )}
            {isDeleteLabel && (
                <section className="delete-label-page">
                    <p style={{ fontSize: "14px" }}>
                        This will remove this label from all cards. There is no
                        undo.
                    </p>
                    <button
                        className="full-delete-label-button"
                        onClick={onDeleteLabel}
                    >
                        Delete
                    </button>
                </section>
            )}
        </section>
    )
    const onTriggerClick = () => {
        setIsOpen((prev) => !prev)
    }

    const trigger = (triggerProps) => {
        return (
            <label
                {...triggerProps}
                appearance="primary"
                // isSelected={isOpen}
                onClick={onTriggerClick}
            >
                {anchorEl}
            </label>
        )
    }

    return (
        <Popup
            id="manage-labels-popover-popup"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            placement="bottom-start"
            fallbackPlacements={["top-start", "auto"]}
            content={() => content}
            trigger={trigger}
            zIndex={10000}
        />
    )
}

function LabelsOption({ taskLabel, selectLabel, editColor }) {
    const [hoveredLabelId, setHoveredLabelId] = useState(null)

    return (
        <div className="popover-labels-option">
            <CheckBox
                type="checkbox"
                className="label-checkbox"
                checked={taskLabel.isTask}
                onChange={(e) => {
                    selectLabel(taskLabel, e.target.checked)
                }}
            />
            <Tooltip
                title={`Color: ${taskLabel.color}, title: ${
                    taskLabel.label ? taskLabel.label : "none"
                }`}
                arrow={false}
                overlayInnerStyle={utilService.tooltipOuterStyle()}
            >
                <div
                    className="label-block"
                    style={{
                        backgroundColor:
                            hoveredLabelId === taskLabel.id
                                ? utilService.getColorHashByName(
                                      taskLabel.color
                                  ).hoverdBgColor
                                : utilService.getColorHashByName(
                                      taskLabel.color
                                  ).bgColor,
                    }}
                    onClick={() => selectLabel(taskLabel, !taskLabel.isTask)}
                    onMouseEnter={() => setHoveredLabelId(taskLabel.id)}
                    onMouseLeave={() => setHoveredLabelId(null)}
                >
                    <span
                        className="label-color-name manage-labels-color-name"
                        style={{
                            color: utilService.getColorHashByName(
                                taskLabel.color
                            ).lightFontColor,
                        }}
                    >
                        {taskLabel.name}
                    </span>
                </div>
            </Tooltip>
            <SvgButton
                src="/img/edit.svg"
                className="edit-button"
                onClick={() => editColor(taskLabel)}
            />
        </div>
    )
}
