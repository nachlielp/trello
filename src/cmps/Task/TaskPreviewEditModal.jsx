import { useRef, useState } from 'react';
import { Modal } from 'antd';
import { ReactSVG } from "react-svg"
import editSvg from '../../assets/svgs/edit.svg';
import { Input } from "antd"
import { TaskPreviewBadges } from "./TaskPreviewBadges";
import { TaskPreviewLabel } from "./TaskPreviewLabel";

const { TextArea } = Input;

export function TaskPreviewEditModal({ task, isHovered, editTask }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const [taskName, setTaskName] = useState(task.name || '');

    const containerRef = useRef(null);

    const showModal = () => {
        const rect = containerRef.current.getBoundingClientRect();
        setModalStyle({
            position: 'absolute',
            top: `${rect.top - 4}px`,
            left: `${rect.left - 205}px`,
        });
        setIsOpen(true);
    };

    const handleOk = () => {
        if (taskName !== task.name) {
            editTask({ ...task, name: taskName });
        }
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {isHovered && !isOpen &&
                (<div ref={containerRef} className="task-preview-edit-modal-anchor">
                    <button className="edit-button" onClick={showModal}>
                        <ReactSVG
                            src={editSvg}
                            beforeInjection={(svg) => {
                                svg.classList.add('edit-icon');
                            }}
                        />
                    </button>
                </div>
                )}
            <Modal
                className="task-preview-edit-modal"
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                getContainer={() => containerRef.current}
                style={modalStyle}
                width={236}
                closable={false}
                footer={null}
            >
                <div className="task-preview-edit-modal-content">
                    <article className="group-task-content-labels">
                        {task.labels.map((label) => (
                            <TaskPreviewLabel key={label.id} label={label} isExpanded={true} />
                        ))}
                    </article>
                    <TextArea
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <TaskPreviewBadges task={task} />
                </div>
                <button className="floating-button save-button" onClick={handleOk}>
                    Save
                </button>
            </Modal>
        </div>
    )
}