import { Popover, Input, Checkbox } from "antd"
import { useState, useEffect } from "react";
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader";
import { utilService } from "../../../services/util.service";
import { useSelector } from "react-redux";
import { SvgButton } from "../../CustomCpms/SvgButton";

export function ManageLabelsPopover({ anchorEl, editTask, task }) {
    const boardLabels = useSelector((state) => state.boardModule.board.labelNames) || [];
    const [boardTaskLabels, setBoardTaskLabels] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredLabels, setFilteredLabels] = useState([]);

    useEffect(() => {
        if (task.labels) {
            const arr = boardLabels.map(boardLabel => {
                const isTask = task.labels.find(taskLabel => taskLabel.color === boardLabel.color);
                if (isTask) {
                    return { ...boardLabel, isTask: true };
                }
                return { ...boardLabel, isTask: false };
            });
            setBoardTaskLabels(arr);
        }
    }, [task.labels, boardLabels]);

    useEffect(() => {
        if (inputSearch !== '') {
            setFilteredLabels(boardTaskLabels.filter((label) => label.label.toLowerCase().includes(inputSearch.toLowerCase())));
        } else {
            setFilteredLabels(boardTaskLabels);
        }
    }, [inputSearch, boardTaskLabels]);

    function onClose() {
        setIsOpen(false);
    }

    function onChangeLabel(label, isTask) {
        if (isTask) {
            editTask({ ...task, labels: [...task.labels, { color: label.color, label: label.label }] });
        } else {
            editTask({ ...task, labels: task.labels.filter(taskLabel => taskLabel.color !== label.color) });
        }
    }

    return (
        <Popover
            className="manage-labels-popover"
            trigger="click"
            placement="bottomLeft"
            open={true}
            close={() => { }}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="manage-labels-content">
                    <ManageTaskPopoverHeader title="Add members" close={onClose} />
                    <Input placeholder="Search labels..." className="labels-search-input" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
                    <h3 className="labels-sub-title">Labels</h3>
                    <div className="labels-list">
                        {filteredLabels.map((label) => <LabelsOption key={label.color} label={label} onChangeLabel={onChangeLabel} />)}
                    </div>
                </section>
            }
        >
            {anchorEl}
        </Popover>
    );
}

function LabelsOption({ label, onChangeLabel }) {
    return (
        <div className="popover-labels-option">
            <Checkbox className="checkbox" checked={label.isTask} onChange={(e) => {
                onChangeLabel(label, !label.isTask);
            }} />
            <div className="label-block" style={{ backgroundColor: utilService.getColorHashByName(label.color).bgColor }} onClick={() => onChangeLabel(label, !label.isTask)}>
                <span className="label-color-name">{label.label}</span>
            </div>
            <SvgButton src='/img/edit.svg' className="edit-button" />
        </div>
    );
}