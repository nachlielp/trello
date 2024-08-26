import { CloseOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomSelect } from "../../CustomCpms/CustomSelect";
import { moveTaskBetweenBoards } from "../../../store/workspace.actions";
import { useNavigate } from "react-router";
import { moveTask } from "../../../store/board.actions";
import Popup from "@atlaskit/popup";

export function MoveCardPopover({ anchorEl, task, onUpdateTask }) {
  const boards = useSelector((state) => state.workspaceModule.boards);
  const user = useSelector((state) => state.userModule.user);

  const board = useSelector((state) =>
    state.workspaceModule.boards
      .filter((b) => !b.closed)
      .find((b) => b.id === task?.idBoard)
  );

  const group = useSelector((state) =>
    state.workspaceModule.boards
      ?.find((b) => b.id === task?.idBoard)
      ?.groups?.find((g) =>
        g.tasks?.filter((g) => !g.closed).find((t) => t.id === task?.idGroup)
      )
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(board?.id);
  const [selectedGroupId, setSelectedGroupId] = useState(group?.id);
  const [boardGroupOptions, setBoardGroupOptions] = useState(
    board?.groups
      ?.filter((g) => !g.closed)
      .sort((a, b) => {
        return a.pos - b.pos;
      })
      .map((g) => {
        return { name: g?.name, id: g?.id, isCurrent: task.idGroup === g?.id };
      })
  );
  const [selectedGroupTaskPositions, setSelectedGroupTaskPositions] = useState(
    group?.tasks.map((g) => g.pos).sort((a, b) => a - b)
  );
  const [selectedPosition, setSelectedPosition] = useState(task?.pos);

  const navigate = useNavigate();

  // useEffect position
  useEffect(() => {
    if (!boards.length) return;
    const newPositions =
      boards
        .find((b) => b.id === selectedBoardId)
        ?.groups?.filter((g) => !g.closed)
        .find((g) => g.id === selectedGroupId)
        ?.tasks?.filter((t) => !t.closed)
        .map((t) => t.pos)
        .sort((a, b) => a - b) || [];

    if (selectedBoardId && newPositions.length > 0) {
      if (
        selectedBoardId !== task?.idBoard ||
        selectedGroupId !== task?.idGroup
      ) {
        setSelectedGroupTaskPositions([
          ...newPositions,
          Math.max(...newPositions) + 34333,
        ]);
      } else {
        setSelectedGroupTaskPositions(newPositions);
      }

      if (task?.idGroup === selectedGroupId) {
        setSelectedPosition(task?.pos);
      } else {
        setSelectedPosition(newPositions[0]);
      }
    } else {
      const DEFAULT_FIRST_POSITION = 65536;
      setSelectedGroupTaskPositions([DEFAULT_FIRST_POSITION]);
      setSelectedPosition(DEFAULT_FIRST_POSITION);
    }
  }, [
    selectedBoardId,
    selectedGroupId,
    boards,
    group,
    board,
    task?.idGroup,
    task?.pos,
  ]);

  // use effect board & groups
  useEffect(() => {
    if (!boards.length) return;

    const selectedBoard = boards
      .filter((b) => !b.closed)
      .find((b) => b.id === selectedBoardId);

    if (
      selectedBoard &&
      selectedBoard.groups.filter((g) => !g.closed).length > 0
    ) {
      setIsDisabled(false);

      setBoardGroupOptions(
        selectedBoard.groups
          .filter((b) => !b.closed)
          .sort((a, b) => {
            return a.pos - b.pos;
          })
          .map((g) => ({
            name: g?.name,
            id: g?.id,
            isCurrent: task.idGroup === g.id,
          }))
      );
      if (selectedBoard.id !== task?.idBoard) {
        setSelectedGroupId(selectedBoard.groups[0].id);
      } else {
        setSelectedGroupId(task?.idGroup);
      }
    } else {
      setIsDisabled(true);
    }
  }, [selectedBoardId, boards, group]);

  function generatePositionOptions(array) {
    if (!array) return;
    return array?.map((item, i) => ({
      name: i + 1,
      id: item,
      isCurrent: item === task.pos,
    }));
  }

  function onSelectBoard(board) {
    board && setSelectedBoardId(board?.id);
  }

  function onSelectGroup(group) {
    group && setSelectedGroupId(group.id);
  }

  function onSelectPosition(pos) {
    pos && setSelectedPosition(pos.id);
  }

  async function onMoveTask() {
    setIsOpen(false);

    if (selectedBoardId === task.idBoard) {
      const moveTaskEvent = {
        boardId: board.id,
        sourceGroupId: task.idGroup,
        destinationGroupId: selectedGroupId,
        taskId: task.id,
        sourceIndex: task.pos,
        destinationIndex: selectedPosition,
      };
      await moveTask(moveTaskEvent, board, user);
      return;
    }
    const moveTaskEvent = {
      taskId: task.id,
      sourceBoardId: task.idBoard,
      sourceGroupId: task.idGroup,
      destinationBoardId: selectedBoardId,
      destinationGroupId: selectedGroupId,
      destinationIndex: selectedPosition,
      user,
    };

    await moveTaskBetweenBoards(moveTaskEvent);

    if (selectedBoardId !== task.idBoard) {
      navigate(`/b/${task.idBoard}`);
    }
    if (onUpdateTask) {
      onUpdateTask();
    }
  }

  const content = (
    <div className="move-card-popover" onClick={(e) => e.stopPropagation()}>
      <header>
        <span>Move Card</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <CloseOutlined />
        </button>
      </header>
      <div className="main">
        <p>Select destination</p>
        <section className="board-select">
          <p className="move-card-popover-title">Board</p>
          <CustomSelect
            options={boards
              .filter((b) => !b.closed)
              .sort((a, b) => {
                return a.name?.localeCompare(b.name);
              })
              .map((b) => ({
                name: b.name,
                id: b.id,
                isCurrent: board?.id === b.id,
              }))}
            disabled={boards.length < 2}
            onSelect={onSelectBoard}
            value={selectedBoardId}
          />
        </section>
        <section className="list-select">
          <span>
            <p className="move-card-popover-title">List</p>
            <CustomSelect
              options={boardGroupOptions}
              onSelect={onSelectGroup}
              value={selectedGroupId}
              disabled={isDisabled || boardGroupOptions?.length < 2}
            />
          </span>
          <span>
            <p className="move-card-popover-title">Position</p>
            <CustomSelect
              options={generatePositionOptions(selectedGroupTaskPositions)}
              value={selectedPosition}
              onSelect={onSelectPosition}
              disabled={isDisabled || selectedGroupTaskPositions?.length < 2}
            />
          </span>
        </section>
        <button className="move-btn" onClick={onMoveTask} disabled={isDisabled}>
          Move
        </button>
      </div>
    </div>
  );
  const onTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const trigger = (triggerProps) => {
    return (
      <label
        {...triggerProps}
        appearance="primary"
        isSelected={isOpen}
        onClick={onTriggerClick}
      >
        {anchorEl}
      </label>
    );
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      fallbackPlacements={["top-start", "auto"]}
      content={() => content}
      trigger={trigger}
      zIndex={10000}
    />
  );
}
