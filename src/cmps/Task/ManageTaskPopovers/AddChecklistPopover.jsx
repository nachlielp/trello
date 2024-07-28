import { CloseOutlined } from "@ant-design/icons";
import { Popover, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect, useRef } from "react";
import { utilService } from "../../../services/util.service";
import { useSelector } from "react-redux";

export function AddChecklistPopover({ anchorEl, task, editTask, editBoard }) {
  const board = useSelector((state) => state.boardModule.board);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [text, setText] = useState("Checklist");
  function onClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const inputRefElement = inputRef.current.resizableTextArea.textArea;
      setTimeout(() => {
        inputRefElement.focus();
        inputRefElement.setSelectionRange(0, inputRefElement.value.length); // Select all text
      }, 0); // Select all text
    }
  }, [isOpen]);
  function onChange(e) {
    setText(e.target.value);
  }
  async function onSubmit() {
    var minPos = 12222;
    //add taskId to checkListTaskIds
    if (
      !board.checkListTaskIds.length ||
      !board.checkListTaskIds.includes(task.id)
    ) {
      await editBoard({
        ...board,
        checkListTaskIds: [...board.checkListTaskIds, task.id],
      });
    }
    if (task.checkLists.length > 0) {
      minPos = task.checkLists.reduce(
        (min, item) => (item.pos > min ? item.pos : min),
        task.checkLists[0].pos
      );
      minPos;
    }
    const newCheckList = utilService.createCheckList({
      label: text,
      pos: minPos - 1000,
    });
    const newTask = { ...task, checkLists: [...task.checkLists, newCheckList] };
    setText("Checklist");
    setIsOpen(!isOpen);
    await editTask(newTask);
  }

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      open={isOpen}
      close={onClose}
      onOpenChange={setIsOpen}
      arrow={false}
      content={
        <section className="add-checklist-popover">
          <header className="checklist-header">
            <span>Add CheckList</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="close-btn-popover"
            >
              <CloseOutlined />
            </button>
          </header>
          <div className="checklist-main">
            <h2>Title</h2>
            {isOpen && (
              <TextArea
                ref={inputRef}
                className="checklist-title-input"
                value={text}
                autoSize={{ minRows: 1 }}
                onChange={onChange}
              />
            )}

            <button className="add-btn" onClick={onSubmit}>
              Add
            </button>
          </div>
        </section>
      }
    >
      {anchorEl}
    </Popover>
  );
}
