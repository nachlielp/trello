import { CloseOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { CustomSelect } from "../../CustomCpms/CustomSelect";
import { moveCard, setBoards } from "../../../store/workspace.actions";
import { loadBoard } from "../../../store/board.actions";
import { useNavigate } from "react-router";

export function MoveCardPopover({
  anchorEl,
  taskId,
  onCloseTask,
  closeAfter = false,
}) {
  //selectors
  const boards = useSelector((state) => state.workspaceModule.boards);
  const board = useSelector((state) => state.boardModule.board);
  const group = useSelector((state) =>
    state.boardModule.board.groups?.find((g) =>
      g.tasks?.find((t) => t.id === taskId)
    )
  );
  const task = useSelector((state) =>
    state.boardModule.board.groups
      ?.find((g) => g.tasks?.find((t) => t.id === taskId))
      .tasks.find((t) => t.id === taskId)
  );

  // states
  const [isOpen, setIsOpen] = useState(false);
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
  const [selectedPosition, setSelectedPosition] = useState(task.pos);

  ///memo
  const newPositions = useMemo(() => {
    const selectedBoard = boards.find((b) => b.id === selectedBoardId);
    const selectedGroup = selectedBoard?.groups?.find(
      (g) => g.id === selectedGroupId
    );

    return selectedGroup?.tasks?.map((t) => t.pos).sort((a, b) => a - b) || [];
  }, [selectedBoardId, selectedGroupId, boards]);
  const navigate = useNavigate();

  useEffect(() => {
    setBoards();
    loadBoard(selectedBoardId);
  }, []);

  // useEffect position
  useEffect(() => {
    if (selectedBoardId && boards.length > 0) {
      if (
        selectedBoardId !== task.idBoard ||
        selectedGroupId !== task.idGroup
      ) {
        setPositions([...newPositions, Math.max(...newPositions) + 12111]);
      } else {
        setPositions(newPositions);
      }
      if (task.idGroup === selectedGroupId) {
        setSelectedPosition(task.pos);
      } else if (newPositions.length > 0) {
        setSelectedPosition(newPositions[0]);
      } else {
        setPositions([65536]);
        setSelectedPosition(newPositions[0] || 65536); // Default position if no tasks
      }
    }
  }, [
    selectedBoardId,
    selectedGroupId,
    boards,
    newPositions,
    task.idGroup,
    task.pos,
  ]);

  // use effect board & groups
  useEffect(() => {
    const selectedBoard = boards.find((b) => b.id === selectedBoardId);
    if (selectedBoard) {
      setSelectedGroups(
        selectedBoard.groups.map((group) => ({
          name: group.name,
          id: group.id,
        }))
      );
      if (selectedBoard.id !== task.idBoard) {
        setSelectedGroupId(selectedBoard.groups[0].id);
      } else {
        setSelectedGroupId(task.idGroup);
      }
    }
  }, [selectedBoardId, boards]);

  function generatePositionOptions(array) {
    return array.map((item, i) => ({
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

  function onSelectPosition(item) {
    item && setSelectedPosition(item.id);
  }

  async function onMoveClick() {
    let newPosDetails = {
      idBoard: selectedBoardId,
      idGroup: selectedGroupId,
      pos: selectedPosition + 12111,
      task,
    };

    if (task.pos > selectedPosition) {
      newPosDetails = { ...newPosDetails, pos: selectedPosition };
    }
    await moveCard(newPosDetails);
    setIsOpen(false);
    if (newPosDetails.task.idBoard !== newPosDetails.idBoard) {
      navigate(`/b/${task.idBoard}`, { replace: true });
      onCloseTask();
    } else {
      loadBoard(task?.idBoard);
    }
    if (closeAfter) {
      onCloseTask();
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
                value={selectedBoardId}
              />
            </section>
            <section className="list-select">
              <span>
                <p>List</p>
                <CustomSelect
                  options={selectedGroups}
                  onSelect={onSelectGroup}
                  value={selectedGroupId}
                />
              </span>
              <span>
                <p>Position</p>
                <CustomSelect
                  options={generatePositionOptions(positions)}
                  value={selectedPosition}
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
