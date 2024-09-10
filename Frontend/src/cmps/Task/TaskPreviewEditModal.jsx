import { useRef, useState, useEffect, forwardRef } from "react"
import { Modal, Input, ConfigProvider } from "antd"
import editSvg from "../../assets/svgs/edit.svg"
import cardIcon from "/img/taskActionBtns/cardIcon.svg"
import { TaskPreviewBadges } from "./TaskPreviewBadges"
import { TaskPreviewLabel } from "./TaskPreviewLabel"
import { utilService } from "../../services/util.service"
import moveIcon from "/img/taskActionBtns/moveIcon.svg"
import labelIcon from "/img/taskActionBtns/labelIcon.svg"
import userIcon from "/img/taskActionBtns/userIcon.svg"
import timeIcon from "/img/taskActionBtns/timeIcon.svg"
import coverIcon from "/img/taskActionBtns/coverIcon.svg"
import archiveIcon from "/img/taskActionBtns/archiveIcon.svg"
import { SvgButton } from "../CustomCpms/SvgButton"
import { ManageMembersPopover } from "./ManageTaskPopovers/ManageMembersPopover"
import { ManageLabelsPopover } from "./ManageTaskPopovers/ManageLabelsPopover"
import { ManageCoverPopover } from "./ManageTaskPopovers/ManageCoverPopover"
import { useSelector } from "react-redux"
import { MoveCardPopover } from "./ManageTaskPopovers/MoveCardPopover"
import { ManageDatesPopover } from "./ManageTaskPopovers/ManageDatesPopover"
import { useNavigate } from "react-router-dom"
const { TextArea } = Input
import Popup from "@atlaskit/popup"

export function TaskPreviewEditModal({
    task,
    isHovered,
    editTask,
    isOpen,
    openPreviewModal,
    taskWidth,
    labelActions,
    closePreviewModal,
}) {
    const boardLabels = useSelector((state) => state.boardModule.board.labels)
    const [taskLabels, setTaskLabels] = useState([])
    const [modalStyle, setModalStyle] = useState({})
    const [taskName, setTaskName] = useState(task?.name || "")
    const [removePopupButtons, setRemovePopupButtons] = useState(false)
    const [showEditModalBtn, setShowEditModalBtn] = useState(false)

    const containerRef = useRef(null)
    const triggerRef = useRef(null)
    const popupRef = useRef(null)
    const textareaRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (isOpen && textareaRef.current) {
            setTimeout(() => {
                textareaRef.current.focus({
                    cursor: "all",
                })
            }, 300)
        }
    }, [isOpen])

    useEffect(() => {
        setShowEditModalBtn(isHovered)
    }, [isHovered, isOpen])

    useEffect(() => {
        const taskLabels =
            boardLabels?.filter((boardLabel) =>
                task?.idLabels.includes(boardLabel.id)
            ) || []
        setTaskLabels(taskLabels)
    }, [task?.idLabels, boardLabels])

    useEffect(() => {
        setTaskName(task?.name || "")
    }, [task?.name])

    function showModal(e) {
        e.stopPropagation()
        const rect = containerRef.current.getBoundingClientRect()
        setModalStyle({
            position: "absolute",
            top: `${rect.top}px`,
            left: `${rect.right - taskWidth}px`,
            width: `${taskWidth}px`,
        })
        openPreviewModal(true)
    }

    function handleOk(e) {
        e.stopPropagation()
        if (taskName !== task?.name) {
            editTask({ ...task, name: taskName })
        }
        openPreviewModal(false)
    }

    function handleCancel(e) {
        openPreviewModal(false)
    }

    function handleOpenCard() {
        closePreviewModal()
        navigate(`/c/${task?.id}`, { replace: true })
    }
    const modalActionButtons = [
        {
            cover: false,
            popover: (
                <SvgButton
                    src={cardIcon}
                    className="floating-button"
                    label="Open card"
                    onClick={handleOpenCard}
                />
            ),
        },
        {
            cover: false,
            popover: (
                <ManageLabelsPopover
                    anchorEl={
                        <SvgButton
                            src={labelIcon}
                            className="floating-button"
                            label="Edit labels"
                        />
                    }
                    editTask={editTask}
                    task={task}
                    labelActions={labelActions}
                />
            ),
        },
        {
            cover: false,
            popover: (
                <ManageMembersPopover
                    anchorEl={
                        <SvgButton
                            src={userIcon}
                            className="floating-button"
                            label="Change members"
                        />
                    }
                    editTask={editTask}
                    task={task}
                />
            ),
        },
        {
            cover: true,
            popover: (
                <ManageCoverPopover
                    anchorEl={
                        <SvgButton
                            src={coverIcon}
                            className="floating-button"
                            label="Change cover"
                        />
                    }
                    editTask={editTask}
                    task={task}
                />
            ),
        },
        {
            cover: false,
            popover: (
                <ManageDatesPopover
                    task={task}
                    editTask={editTask}
                    anchorEl={
                        <SvgButton
                            src={timeIcon}
                            className="floating-button"
                            label="Edit date"
                        />
                    }
                />
            ),
        },
        // TODO fix dropdonw menu select options issue
        {
            cover: true,
            popover: (
                <MoveCardPopover
                    task={task}
                    onCloseTask={handleCancel}
                    closeAfter={true}
                    anchorEl={
                        <SvgButton
                            src={moveIcon}
                            label="Move"
                            className="floating-button"
                        />
                    }
                />
            ),
        },
        // { label: 'Copy', icon: copyIcon, onClick: () => console.log('Add to Y'), cover: true },
        {
            popover: (
                <SvgButton
                    src={archiveIcon}
                    className="floating-button"
                    label="Archive"
                    onClick={() => editTask({ ...task, closed: true })}
                />
            ),
            cover: true,
        },
    ]

    // const modalActionButtons =
    //   task.cover.size === "full"
    //     ? allModalActionButtons.filter((btn) => btn.cover)
    //     : allModalActionButtons;

    const content = () => {
        if (!isOpen) return null
        return (
            <div
                className={`task-preview-floating-buttons ${
                    removePopupButtons ? "remove-popup-buttons" : ""
                }`}
            >
                {modalActionButtons.map((btn, index) => (
                    <div
                        key={index}
                        style={{
                            display:
                                task?.cover.size === "normal" || btn.cover
                                    ? "block"
                                    : "none",
                        }}
                    >
                        {btn.popover}
                    </div>
                ))}
            </div>
        )
    }

    const trigger = () => {
        return (
            <div ref={triggerRef}>
                {task?.cover.color && (
                    <div
                        className="group-task-header normal-cover"
                        style={{
                            backgroundColor: utilService.getColorHashByName(
                                task?.cover.color
                            ).bgColor,
                        }}
                    ></div>
                )}
                {task?.cover.attachment && (
                    <div
                        className="group-task-header img-cover"
                        style={{
                            backgroundImage: `url(${task?.cover.attachment?.link})`,
                        }}
                    ></div>
                )}
                <main className="task-preview-edit-modal-content">
                    <article className="preview-labels">
                        {taskLabels?.map((label) => (
                            <TaskPreviewLabel
                                key={label.id}
                                label={label}
                                isExpanded={true}
                            />
                        ))}
                    </article>
                    <TextArea
                        ref={textareaRef}
                        className="task-name-input"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <TaskPreviewBadges task={task} editTask={editTask} />
                </main>
                <button
                    className="floating-button save-button"
                    onClick={handleOk}
                >
                    Save
                </button>
                <section
                    className={`floating-buttons ${
                        task?.cover.size === "full" ? "full-cover" : ""
                    }`}
                ></section>
            </div>
        )
    }

    return (
        <div>
            {showEditModalBtn && (
                <div
                    ref={containerRef}
                    className="task-preview-edit-modal-anchor"
                >
                    <button className="preview-anchor-btn" onClick={showModal}>
                        <label className="pyello-icon icon-edit"></label>
                    </button>
                </div>
            )}
            <ConfigProvider
                getPopupContainer={() => triggerRef.current || document.body}
            >
                <Modal
                    className="task-preview-edit-modal"
                    open={isOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    getContainer={() => containerRef?.current}
                    style={modalStyle}
                    width={taskWidth}
                    closable={false}
                    footer={null}
                    transitionName="" // Disable modal open animation
                    maskTransitionName=""
                    // Disable the full-screen mask
                >
                    <Popup
                        id="task-preview-edit-modal-popup"
                        isOpen={isOpen}
                        placement="right-start"
                        fallbackPlacements={["right", "left-start", "left"]}
                        content={content}
                        trigger={(triggerProps) => (
                            <div {...triggerProps}>{trigger()}</div>
                        )}
                        zIndex={9000}
                        triggerRef={triggerRef}
                        ref={popupRef}
                        closeOnClickOutside={true}
                    />
                </Modal>
            </ConfigProvider>
        </div>
    )
}
