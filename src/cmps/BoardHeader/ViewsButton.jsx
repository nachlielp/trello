import { Popover } from "antd";
import { useState } from "react";

//svg
import { ReactSVG } from "react-svg";
import boardIcon from "/img/board-index/headerImgs/viewBtn-imgs/boardIcon.svg";
import tableIcon from "/img/board-index/headerImgs/viewBtn-imgs/tableIcon.svg";
import calendarIcon from "/img/board-index/headerImgs/viewBtn-imgs/calendarIcon.svg";
import timeLineIcon from "/img/board-index/headerImgs/viewBtn-imgs/timeLineIcon.svg";
import dashBoard from "/img/board-index/headerImgs/viewBtn-imgs/dashBoard.svg";
import mapIcon from "/img/board-index/headerImgs/viewBtn-imgs/mapIcon.svg";
import privateIcon from "/img/board-index/headerImgs/privateIcon.svg";
import { CloseOutlined } from "@ant-design/icons";
import { GoGrabber } from "react-icons/go";
import checkedIcon from "/img/board-index/headerImgs/checkedIcon.svg";
import more from "/img/workspace/more.svg"
import { CheckBox } from "../CustomCpms/CheckBox";
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
                     
                      <CheckBox disabled checked={item === "Board"}/>
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
       
        <ReactSVG src={more} wrapper="span" className="arow" />

      </button>
    </Popover>
  );
}
