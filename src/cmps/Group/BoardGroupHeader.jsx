import { useState, useRef, useEffect } from "react";
import { GroupActionsMenuPopover } from "./GroupActionsMenuPopover";
import { Input } from "antd";
import { NameInput } from "../CustomCpms/NameInput";
const { TextArea } = Input;

export function BoardGroupHeader({
  group,
  editGroup,
  openAddTask,
  archiveGroup,
  copyGroup,
  moveAllCards,
  archiveAllCards,
  sortGroup,
}) {
  function onRenameGroup(newGroupName) {
    editGroup({ ...group, name: newGroupName });
  }

  return (
    <header className="board-group-header">
      <NameInput
        value={group?.name}
        expandInputWidth={false}
        onSubmit={onRenameGroup}
      />
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
