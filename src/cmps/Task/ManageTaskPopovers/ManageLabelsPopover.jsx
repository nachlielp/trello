import { Popover, Input, Checkbox } from "antd"
import { useState, useEffect } from "react";
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader";
import { utilService } from "../../../services/util.service";
import { useSelector } from "react-redux";
import { SvgButton } from "../../CustomCpms/SvgButton";
import { Tooltip } from "antd";
import { CheckBox } from "../../CustomCpms/CheckBox";

export function ManageLabelsPopover({ anchorEl, editTask, task, labelActions }) {
    const boardLabels = useSelector((state) => state.boardModule.board.labels) || [];
    const [boardTaskLabels, setBoardTaskLabels] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editColor, setEditColor] = useState('');
    const [filteredLabels, setFilteredLabels] = useState([]);
    const [backToList, setBackToList] = useState(null);
    const [isCreateLabel, setIsCreateLabel] = useState(false);

    useEffect(() => {
        if (task?.idLabels) {
            const arr = boardLabels.map(boardLabel => {
                const isTask = task.idLabels.find(taskLabelId => taskLabelId === boardLabel.id);
                if (isTask) {
                    return { ...boardLabel, isTask: true };
                }
                return { ...boardLabel, isTask: false };
            });
            setBoardTaskLabels(arr);
        }
    }, [task?.idLabels, boardLabels]);

    useEffect(() => {
        if (inputSearch !== '') {
            setFilteredLabels(boardTaskLabels.filter((label) => label.name.toLowerCase().includes(inputSearch.toLowerCase())));
        } else {
            setFilteredLabels(boardTaskLabels);
        }
    }, [inputSearch, boardTaskLabels, boardLabels]);

    function onClose() {
        setIsOpen(false);
    }

    function onSelectLabel(label, isTask) {
        if (isTask) {
            editTask({ ...task, idLabels: [...task.idLabels, label.id] });
        } else {
            editTask({ ...task, idLabels: task.idLabels.filter(taskLabel => taskLabel !== label.id) });
        }
    }

    function onEditLabel(label) {
        setSelectedLabel(label);
        setEditTitle(label.name);
        setEditColor(label.color);
        setBackToList(() => onBackToList);
    }

    function onBackToList() {
        setSelectedLabel(null);
        setEditTitle('');
        setBackToList(null);
        setIsCreateLabel(false);
    }

    function onSaveLabel() {
        labelActions("edit", { ...selectedLabel, name: editTitle, color: editColor });
        setSelectedLabel(null);
        setEditTitle('');
        setBackToList(null);
    }

    function onCreateLabel() {
        labelActions("create", { name: editTitle, color: editColor }, task);
        setSelectedLabel(null);
        setEditTitle('');
        setBackToList(null);
        setIsCreateLabel(false);
    }

    function openCreateLabel() {
        setEditColor('green');
        setIsCreateLabel(true);
        setBackToList(() => onBackToList);
    }

    function onDeleteLabel() {
        labelActions("delete", selectedLabel);
        setSelectedLabel(null);
        setEditTitle('');
        setBackToList(null);
        setIsCreateLabel(false);
    }
    function onOpenPopover(e) {
        e.stopPropagation();
        setIsOpen(true);
    }

    const isEditPage = selectedLabel || isCreateLabel;
    const isSelectPage = !selectedLabel && !isCreateLabel
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
                    {!selectedLabel && !isCreateLabel &&
                        <section className="select-labels-page">
                            <Input placeholder="Search labels..." className="labels-search-input" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
                            <h3 className="labels-sub-title">Labels</h3>
                            <article className="labels-list">
                                {filteredLabels.map((taskLabel) => <LabelsOption key={taskLabel.color} taskLabel={taskLabel} selectLabel={onSelectLabel} editColor={onEditLabel} />)}
                            </article>
                            <button className="lebel-full-btn" onClick={openCreateLabel}>Create label</button>
                        </section>
                    }
                    {(selectedLabel || isCreateLabel) &&
                        <section className="edit-labels-page">
                            <article className="edit-label-block-wrapper">
                                <div className="disbly-label-block" style={{ backgroundColor: utilService.getColorHashByName(editColor).bgColor }} >
                                    <span className="label-color-name">{editTitle}</span>
                                </div>
                            </article>
                            <h3 className="labels-sub-title">Title</h3>
                            <Input className="labels-search-input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            <h3 className="labels-sub-title">Select a color</h3>
                            <article className="color-picker-wrapper">
                                {utilService.boardLabelColorOptions.filter(color => color.color !== 'none').map((color) => <div className="color-picker-option" key={color.color} style={{ backgroundColor: color.bgColor }} onClick={() => setEditColor(color.color)}></div>)}
                            </article>
                            <button className="lebel-full-btn" onClick={() => setEditColor('none')}>Remove color</button>
                            <label className="label-hr" />
                            <article className="edit-label-buttons">
                                {isCreateLabel &&
                                    <button className="save-button" onClick={onCreateLabel}>Create</button>
                                }
                                {!isCreateLabel &&
                                    <>
                                        <button className="save-button" onClick={onSaveLabel}>Save</button>
                                        <button className="delete-button" onClick={onDeleteLabel}>Delete</button>
                                    </>
                                }
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
                    <span className="label-color-name">{taskLabel.name}</span>
                </div>
            </Tooltip>
            <SvgButton src='/img/edit.svg' className="edit-button" onClick={() => editColor(taskLabel)} />
        </div>
    );
}