import { useState, useRef, useEffect } from "react";
import { GroupActionsMenuPopover } from "./GroupActionsMenuPopover";
import { Input } from "antd";
const { TextArea } = Input;

export function BoardGroupHeader({
  draggableProvided,
  group,
  editGroup,
  openAddTask,
  archiveGroup,
  copyGroup,
  moveAllCards,
  archiveAllCards,
  sortGroup,
}) {
  const [isEditGroupName, setIsEditGroupName] = useState(false);
  const [newGroupName, setNewGroupName] = useState(group.name);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const textAreaElement = textAreaRef.current.resizableTextArea.textArea;
      textAreaElement.focus();
      textAreaElement.setSelectionRange(0, textAreaElement.value.length); // Select all text
    }
  }, [isEditGroupName]);

  async function onKeyDown(e) {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      onRenameGroup();
    }
  }

  function onRenameGroup() {
    setIsEditGroupName(false);
    if (newGroupName === group.name || newGroupName.trim() === "") {
      return;
    }
    editGroup({ ...group, name: newGroupName });
  }

  const dragHandle = (
    <div className="drag-handle">
      <p className="group-title" onClick={() => setIsEditGroupName(true)}>
        {group.name}
      </p>
    </div>
  );

  return (
    <header
      className="board-group-header"
      {...draggableProvided.dragHandleProps}
    >
      {isEditGroupName ? (
        <TextArea
          ref={textAreaRef}
          className="group-title-input"
          autoSize={{ minRows: 1 }}
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={onRenameGroup}
        />
      ) : (
        <p className="group-title" onClick={() => setIsEditGroupName(true)}>
          {group.name}
        </p>
      )}
      <GroupActionsMenuPopover
        openAddTask={openAddTask}
        archiveGroup={archiveGroup}
        group={group}
        copyGroup={copyGroup}
        moveAllCards={moveAllCards}
        archiveAllCards={archiveAllCards}
        sortGroup={sortGroup}
      />
    </header>
  );
}
