import { CloseOutlined } from "@ant-design/icons";
import { current } from "@reduxjs/toolkit";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function MoveCardPopover({ board, group, task }) {
  const [openListMenu, setOpenListMenu] = useState(false);
  const boards = useSelector((state) => state.workspaceModule.boards);

  const [selectedBoardId, setSelectedBoardId] = useState(board?.id);
  const [listSelectOption, setListSelectOption] = useState();
  useEffect(() => {
    if (board) {
      setSelectedBoardId(board.id);
    }
  }, [board]);
  useEffect(() => {
    if (selectedBoardId) {
      for (let board of boards) {
        if (board.id === selectedBoardId) {
          setListSelectOption(board.groups);
        }
      }
    }
  }, [selectedBoardId]);

  function onSelectBoard(event) {
    setSelectedBoardId(event.target.value)
  }

  return (
    <Popover
      className="list-actions-menu-popover"
      trigger="click"
      placement="bottomLeft"
      open={openListMenu}
      onOpenChange={setOpenListMenu}
      arrow={false}
      content={
        <div>
          <header>
            <span>Move Card</span>{" "}
            <button onClick={() => setOpenListMenu(!openListMenu)}>
              <CloseOutlined />
            </button>
          </header>
          <div>
            <p>Select destination</p>
            <section>
              <p>Board</p>
              <select value={selectedBoardId} onChange={onSelectBoard}>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </select>
            </section>
            <section>
              <span>
                <p>List</p>
                <select>
                  {listSelectOption?.map((currentOptions) => (
                    <option key={currentOptions.id} value={currentOptions.id}>{currentOptions.name}</option>
                  ))}
                </select>
              </span>
              <span>
                <p>position</p>
                <select>{"all elements + current position"}</select>
              </span>
            </section>
            <button>Move</button>
          </div>
        </div>
      }
    >
      <button>Move</button>
    </Popover>
  );
}
