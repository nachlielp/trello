import { useRef, useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { ReactSVG } from "react-svg"
import editSvg from '../../assets/svgs/edit.svg';
import { TaskPreviewBadges } from "./TaskPreviewBadges";
import { TaskPreviewLabel } from "./TaskPreviewLabel";

import cardIcon from '/img/taskActionBtns/cardIcon.svg';
import moreIcon from '/img/taskActionBtns/moreIcon.svg';
import labelIcon from '/img/taskActionBtns/labelIcon.svg';
import userIcon from '/img/taskActionBtns/userIcon.svg';
import timeIcon from '/img/taskActionBtns/timeIcon.svg';
import coverIcon from '/img/taskActionBtns/coverIcon.svg';
import copyIcon from '/img/taskActionBtns/copyIcon.svg';
import archiveIcon from '/img/taskActionBtns/archiveIcon.svg';

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

    const modalActionButtons = [
        { label: 'Open card', icon: cardIcon, onClick: () => console.log('Add to X') },
        { label: 'Edit labels', icon: labelIcon, onClick: () => console.log('Add to Y') },
        { label: 'Change members', icon: userIcon, onClick: () => console.log('Add to Y') },
        { label: 'Change cover', icon: coverIcon, onClick: () => console.log('Add to Y') },
        { label: 'Edit date', icon: timeIcon, onClick: () => console.log('Add to Y') },
        { label: 'More', icon: moreIcon, onClick: () => console.log('Add to Y') },
        { label: 'Copy', icon: copyIcon, onClick: () => console.log('Add to Y') },
        { label: 'Archive', icon: archiveIcon, onClick: () => console.log('Add to Y') },
    ];

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
                        className="task-name-input"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <TaskPreviewBadges task={task} />
                </div>
                <button className="floating-button save-button" onClick={handleOk}>
                    Save
                </button>
                <section className='floating-buttons'>
                    {modalActionButtons.map((btn, index) => (
                        <a key={index} className="floating-button" onClick={btn.onClick}>
                            <ReactSVG
                                src={btn.icon}
                                beforeInjection={(svg) => {
                                    svg.classList.add('task-action-icon');
                                }}
                                wrapper="span"
                            />
                            {btn.label}
                        </a>
                    ))}
                </section>
            </Modal>
        </div>
    )
}