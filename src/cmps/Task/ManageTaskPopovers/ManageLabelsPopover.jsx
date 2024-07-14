import { Popover, Input, Checkbox } from "antd"
import { useState, useEffect } from "react";
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader";
import { utilService } from "../../../services/util.service";
import { useSelector } from "react-redux";
import { SvgButton } from "../../CustomCpms/SvgButton";
import { Tooltip } from "antd";
import { CheckBox } from "../../CustomCpms/CheckBox";

export function ManageLabelsPopover({ anchorEl, editTask, task, editLabel }) {
    const boardLabels = useSelector((state) => state.boardModule.board.labelNames) || [];
    const [boardTaskLabels, setBoardTaskLabels] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [editColor, setEditColor] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [filteredLabels, setFilteredLabels] = useState([]);
    const [backToList, setBackToList] = useState(null);

    useEffect(() => {
        if (task?.labels) {
            const arr = boardLabels.map(boardLabel => {
                const isTask = task.labels.find(taskLabel => taskLabel.color === boardLabel.color);
                if (isTask) {
                    return { ...boardLabel, isTask: true };
                }
                return { ...boardLabel, isTask: false };
            });
            setBoardTaskLabels(arr);
        }
    }, [task?.labels, boardLabels]);

    useEffect(() => {
        if (inputSearch !== '') {
            setFilteredLabels(boardTaskLabels.filter((label) => label.label.toLowerCase().includes(inputSearch.toLowerCase())));
        } else {
            setFilteredLabels(boardTaskLabels);
        }
    }, [inputSearch, boardTaskLabels, boardLabels]);

    function onClose(e) {
        e.stopPrapagation()
        setIsOpen(false);
    }

    function onSelectLabel(label, isTask) {
        if (isTask) {
            editTask({ ...task, labels: [...task.labels, { color: label.color, label: label.label }] });
        } else {
            editTask({ ...task, labels: task.labels.filter(taskLabel => taskLabel.color !== label.color) });
        }
    }

    function onEditColor(color) {

        setEditColor({ color: color.color, label: color.label });
        setEditTitle(color.label);
        setBackToList(() => onBackToList);
    }

    function onBackToList() {
        setEditColor(null);
        setEditTitle('');
        setBackToList(null);
    }

    function onSaveLabel() {
        editLabel({ color: editColor.color, label: editTitle });
        setEditColor(null);
        setEditTitle('');
        setBackToList(null);
    }

    function onOpenPopover(e) {
        e.stopPropagation();
        setIsOpen(true);
    }
    return (
        <Popover
            className="manage-labels-popover"
            trigger="click"
            placement="bottomLeft"
            open={isOpen}
            close={() => { }}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="manage-labels-content">
                    <ManageTaskPopoverHeader title={backToList ? "Edit label" : 'Labels'} close={onClose} back={backToList} />
                    {!editColor &&
                        <section className="select-labels-page">
                            <Input placeholder="Search labels..." className="labels-search-input" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
                            <h3 className="labels-sub-title">Labels</h3>
                            <div className="labels-list">
                                {filteredLabels.map((taskLabel) => <LabelsOption key={taskLabel.color} taskLabel={taskLabel} selectLabel={onSelectLabel} editColor={onEditColor} />)}
                            </div>
                        </section>}
                    {editColor &&
                        <section className="edit-labels-page">
                            <article className="edit-label-block-wrapper">
                                <div className="disbly-label-block" style={{ backgroundColor: utilService.getColorHashByName(editColor.color).bgColor }} >
                                    <span className="label-color-name">{editTitle}</span>
                                </div>
                            </article>
                            <h3 className="labels-sub-title">Title</h3>
                            <Input className="labels-search-input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            <article className="edit-label-buttons">
                                <button className="save-button" onClick={onSaveLabel}>Save</button>
                                {/* <button className="cancel-button" onClick={() => { }}>Cancel</button> */}
                            </article>
                        </section>}
                </ section>
            }
        >
            {anchorEl}
        </Popover>
    );
}

function LabelsOption({ taskLabel, selectLabel, editColor }) {
    return (
        <div className="popover-labels-option">
            <CheckBox type="checkbox" className="checkbox" checked={taskLabel.isTask} onChange={(e) => {
                selectLabel(taskLabel, e.target.checked);
            }} />
            <Tooltip title={`Color: ${taskLabel.color}, title: ${taskLabel.label ? taskLabel.label : 'none'}`} arrow={false}>
                <div className="label-block" style={{ backgroundColor: utilService.getColorHashByName(taskLabel.color).bgColor }} onClick={() => selectLabel(taskLabel, !taskLabel.isTask)}>
                    <span className="label-color-name">{taskLabel.label}</span>
                </div>
            </Tooltip>
            <SvgButton src='/img/edit.svg' className="edit-button" onClick={() => editColor(taskLabel)} />
        </div>
    );
}