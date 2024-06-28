import { Popover } from "antd";
import { ReactSVG } from "react-svg";
import boardIcon from "/img/headerImgs/boardIcon.svg";
import { CloseOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";

export function BoardButton() {
  const [openListMenu, setOpenListMenu] = useState(false);
  return (
    <Popover
      className="list-actions-menu-popover"
      trigger="click"
      placement="bottomLeft"
      open={openListMenu}
      onOpenChange={setOpenListMenu}
      arrow={false}
      content={
        <section className="board-btn-popover">
          <header>
            <h2>Upgrade for Views</h2>
            <span onClick={() => setOpenListMenu(!openListMenu)}>
              <CloseOutlined />
            </span>
          </header>
        </section>
      }
    >
      <button className="board-btn">
        <ReactSVG src={boardIcon} wrapper="span" className="board-icon" />
        Board
        <DownOutlined className="arow" />
      </button>
    </Popover>
  );
}
