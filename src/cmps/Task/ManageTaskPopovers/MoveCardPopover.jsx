import { CloseOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { CustomSelect } from "../../CustomCpms/CustomSelect";
import { moveCard, setBoards } from "../../../store/workspace.actions";
import { loadBoard } from "../../../store/board.actions";
import { useNavigate } from "react-router";

export function MoveCardPopover({ anchorEl, task, onUpdateTask }) {
  //selectors
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

  // states
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(board?.id);
  const [selectedGroupId, setSelectedGroupId] = useState(group?.id);
  const [boardGroupOptions, setBoardGroupOptions] = useState(
    board?.groups
      ?.filter((g) => !g.closed)
      .map((group) => {
        return { name: group?.name, id: group?.id };
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
          .map((group) => ({
            name: group.name,
            id: group.id,
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
  }, [selectedBoardId, boards]);

  function generatePositionOptions(array) {
    if (!array) return;
    return array?.map((item, i) => ({
      name: i + 1,
      id: item,
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
    let newPosDetails = {
      targetBoardId: selectedBoardId,
      targetGroupId: selectedGroupId,
      targetPos: selectedPosition,
      task,
      user,
    };

    setIsOpen(false);

    await moveCard(newPosDetails);

    if (selectedBoardId !== task.idBoard) {
      navigate(`/b/${task.idBoard}`);
    }
    if (onUpdateTask) {
      onUpdateTask();
    }
  }

  return (
    <Popover
      className="list-actions-menu-popover"
      trigger="click"
      placement="bottomLeft"
      open={isOpen}
      onOpenChange={setIsOpen}
      arrow={false}
      content={
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
              <p>Board</p>
              <CustomSelect
                options={boards
                  .filter((b) => !b.closed)
                  .map((board) => ({
                    name: board.name,
                    id: board.id,
                  }))}
                onSelect={onSelectBoard}
                value={selectedBoardId}
              />
            </section>
            <section className="list-select">
              <span>
                <p>List</p>
                <CustomSelect
                  options={boardGroupOptions}
                  onSelect={onSelectGroup}
                  value={selectedGroupId}
                  disabled={isDisabled}
                />
              </span>
              <span>
                <p>Position</p>
                <CustomSelect
                  options={generatePositionOptions(selectedGroupTaskPositions)}
                  value={selectedPosition}
                  onSelect={onSelectPosition}
                  disabled={isDisabled}
                />
              </span>
            </section>
            <button
              className="move-btn"
              onClick={onMoveTask}
              disabled={isDisabled}
            >
              Move
            </button>
          </div>
        </div>
      }
    >
      {anchorEl}
    </Popover>
  );
}
