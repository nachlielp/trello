import { Popover } from "antd";
import { useState } from "react";

//svg
import { ReactSVG } from "react-svg";
import boardIcon from "/img/headerImgs/viewBtn-imgs/boardIcon.svg";
import tableIcon from "/img/headerImgs/viewBtn-imgs/tableIcon.svg";
import calendarIcon from "/img/headerImgs/viewBtn-imgs/calendarIcon.svg";
import timeLineIcon from "/img/headerImgs/viewBtn-imgs/timeLineIcon.svg";
import dashBoard from "/img/headerImgs/viewBtn-imgs/dashBoard.svg";
import mapIcon from "/img/headerImgs/viewBtn-imgs/mapIcon.svg";
import privateIcon from "/img/headerImgs/privateIcon.svg";
import { CloseOutlined, DownOutlined } from "@ant-design/icons";

export function BoardButton() {
  const [openListMenu, setOpenListMenu] = useState(false);

  const list = ["Board", "Table", "Calendar", "Timeline", "Dashboard", "Map"];
  const icons = [
    boardIcon,
    tableIcon,
    calendarIcon,
    timeLineIcon,
    dashBoard,
    mapIcon,
  ];

  return (
    <Popover
      className="list-actions-menu-popover"
      trigger="click"
      placement="bottomLeft"
      open={openListMenu}
      onOpenChange={setOpenListMenu}
      arrow={false}
      content={
        <section className="view-btn-popover">
          <header>
            <h2>Upgrade for Views</h2>
            <span onClick={() => setOpenListMenu(!openListMenu)}>
              <CloseOutlined />
            </span>
          </header>
          <div>
            <ul>
              {list.map((item, idx) => (
                <li key={item} className={true?"disabled":''}>
                  <input type="checkBox"/>
                  <ReactSVG src={icons[idx]} wrapper="span" />
                  {item}
                  <ReactSVG src={privateIcon} wrapper="span" />
                </li>
              ))}
            </ul>
            <footer>
            <h2>See your work in new ways</h2>
            <p>View key timelines, assignments, data, and more directly from your Trello board with Trello Premium.</p>
            <button>Start Free Trial</button>
            <a  target="_blank" href="https://trello.com/premium">Learn more about Trello Premium</a>
            </footer>
          </div>
        </section>
      }
    >
      <button className="view-btn">
        <ReactSVG src={boardIcon} wrapper="span" className="board-icon" />
        Board
        <DownOutlined className="arow" />
      </button>
    </Popover>
  );
}
