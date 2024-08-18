import { CloseOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useState } from "react";
import { SvgButton } from "../../CustomCpms/SvgButton";
import { BoardActivity } from "./BoardActivity";

export function BoardMenu({ setOpenBoarMenu, setShowBtn }) {
  const [animation, setAnimation] = useState("");
  const [navigation, setNavigation] = useState("Menu");
  function onClose() {
    setAnimation("fade-out");
    setShowBtn(true);
    setTimeout(() => {
      setOpenBoarMenu(false);
      setAnimation("");
    }, 200);
  }

  return (
    <section className={`board-menu ${animation}`}>
      <header className="header-menu">
        {navigation !== "Menu" && (
          <button className="btn back" onClick={() => setNavigation("Menu")}>
            <span className="trello-icon icon-back" />
          </button>
        )}
        <h2>{navigation}</h2>
        <button className="btn close" onClick={onClose}>
          <CloseOutlined />
        </button>
        <hr className="border_bottom" />
      </header>
      {navigation === "Menu" && (
        <main className="main-menu">
          <button className="btn" onClick={() => setNavigation("Activity")}>
            <span className="trello-icon icon-activity btn-menu" />
            Activity
          </button>
        </main>
      )}

      {navigation === "Activity" && (
        <section className="activities">
          <BoardActivity />
        </section>
      )}
    </section>
  );
}
