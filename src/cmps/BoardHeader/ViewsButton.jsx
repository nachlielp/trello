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
import { GoGrabber } from "react-icons/go";
import checkedIcon from "/img/headerImgs/checkedIcon.svg";

export function ViewsButton() {
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
          <header className="view-header">
            <h2 className="view-title">Upgrade for Views</h2>
            <button
              className="close-btn"
              onClick={() => setOpenListMenu(!openListMenu)}
            >
              <span>
                <CloseOutlined />
              </span>
            </button>
          </header>
          <div className="view-main">
            <ul className="choose-list">
              {list.map((item, idx) => (
                <li key={item}>
                  <div>
                    <span className="grab-icon">
                      <GoGrabber />
                    </span>
                    <label>
                      <input
                        type="checkBox"
                        checked={item === "Board"}
                        disabled
                      />
                      <ReactSVG
                        src={checkedIcon}
                        wrapper="span"
                        className="checkbox"
                      />
                      <div className="item">
                        <ReactSVG src={icons[idx]} wrapper="span" />
                        <p>{item}</p>
                      </div>
                    </label>
                  </div>
                  {item !== "Board" && (
                    <ReactSVG src={privateIcon} wrapper="span" />
                  )}
                </li>
              ))}
            </ul>
            <div className="bottom">
              <h2>See your work in new ways</h2>
              <p>
                View key timelines, assignments, data, and more directly from
                your Trello board with Trello Premium.
              </p>
              <button>Start Free Trial</button>
              <a target="_blank" href="https://trello.com/premium">
                Learn more about Trello Premium
              </a>
            </div>
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
