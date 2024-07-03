import { CloseOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { CustomSelect } from "./CustomSelect";

export function MoveCardPopover({ board, group, task, anchorEl }) {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useSelector((state) => state.workspaceModule.boards);
  const [selectedBoardId, setSelectedBoardId] = useState(board.id);
  const [selectedGroupId, setSelectedGroupId] = useState(group.id);
  const [selectedGroups, setSelectedGroups] = useState(
    board.groups.map((group) => {
      return { name: group.name, id: group.id };
    })
  );

  const [positions, setPositions] = useState(
    group.tasks.map((g) => g.pos).sort((a, b) => a - b)
  );
  const [position, setPosition] = useState(task.pos);
  const [selectedPosition, setSelectedPosition] = useState(
    positions?.findIndex((p) => p === position)
  );

  const newPositions = useMemo(() => {
    const selectedBoard = boards.find((b) => b.id === selectedBoardId);
    const selectedGroup = selectedBoard?.groups?.find((g) => g.id === selectedGroupId);
    return selectedGroup?.tasks?.map((t) => t.pos).sort((a, b) => a - b) || [];
  }, [selectedBoardId, selectedGroupId, boards]);

  useEffect(() => {
    if (selectedBoardId && boards.length > 0) {
      setPositions(newPositions);
      if (task.idGroup === selectedGroupId && newPositions.length > 0) {
        setSelectedPosition(newPositions.findIndex((p) => p === task.pos));
      } else {
        setSelectedPosition(0);
        setPosition(newPositions[0] || 19322); // Default position if no tasks
      }
    }
  }, [selectedBoardId, selectedGroupId, boards, newPositions, task.idGroup, task.pos]);

  useEffect(() => {
    const selectedBoard = boards.find((b) => b.id === selectedBoardId);
    if (selectedBoard) {
      setSelectedGroups(
        selectedBoard.groups.map((group) => ({
          name: group.name,
          id: group.id,
        }))
      );
    }
  }, [selectedBoardId, boards]);

  function generatePositionOptions(n) {
    return Array.from({ length: n }, (v, i) => i + 1).map((i) => ({
      name: i,
      id: i,
    }));
  }

  function onSelectBoard(board) {
    setSelectedBoardId(board.id);
  }

  function onSelectGroup(group) {
    setSelectedGroupId(group.id);
    if (newPositions.length > 0) {
      setPosition(newPositions[0]);
    } else {
      setPositions([19322]);
      setPosition(19322);
    }
  }

  function onSelectPosition(item) {
    setSelectedPosition(item.id - 1);
    setPosition(positions[item.id - 1] || 19322);
  }

  function onMoveClick() {
    console.log(selectedBoardId, selectedGroupId, position);
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
        <div className="move-card-popover">
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
                options={boards.map((board) => ({
                  name: board.name,
                  id: board.id,
                }))}
                onSelect={onSelectBoard}
                currentSelect={selectedBoardId}
              />
            </section>
            <section className="list-select">
              <span>
                <p>List</p>
                <CustomSelect
                  options={selectedGroups}
                  onSelect={onSelectGroup}
                  currentSelect={selectedGroupId}
                />
              </span>
              <span>
                <p>Position</p>
                <CustomSelect
                  options={
                    positions.length > 0
                      ? generatePositionOptions(positions.length)
                      : generatePositionOptions(1)
                  }
                  currentSelect={selectedPosition + 1}
                  onSelect={onSelectPosition}
                />
              </span>
            </section>
            <button className="move-btn" onClick={onMoveClick}>
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
