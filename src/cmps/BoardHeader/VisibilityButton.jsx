import { Popover } from "antd";
import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

//svg
import { ReactSVG } from "react-svg";
import peopleIcon from "/img/board-index/headerImgs/peopleIcon.svg";
import privateIcon from "/img/board-index/headerImgs/privateIcon.svg";
import publicIcon from "/img/board-index/headerImgs/publicIcon.svg";
import permissionIcon from "/img/board-index/headerImgs/permissionIcon.svg";
import { updateBoard } from "../../store/board.actions";

export function VisibilityButton() {
  const [openListMenu, setOpenListMenu] = useState(false);
  const [hasAcces, setHasAcces] = useState(false);
  const currentMember = useSelector((state) =>
    state.boardModule.members.find(
      (member) => member.id === "666fe4efda8643029b6710f3"
    )
  );
  const board = useSelector((state) => state.boardModule.board);
//TODO make custom component
  useEffect(() => {
    if (currentMember?.permissionStatus === "admin") {
      setHasAcces(true);
    } else {
      setHasAcces(false);
    }
  }, [currentMember]);

  function permissionCheck(permission) {
    if (permission === board.prefs?.permissionLevel) {
      return (
        <ReactSVG
          src={permissionIcon}
          wrapper="span"
          className="permission-icon"
        />
      );
    }
    return "";
  }

  function onPermissionClick(value) {
    const newBoard = board;
    board.prefs.permissionLevel = value;
    updateBoard(newBoard);
    setOpenListMenu(false);
  }
  // console.log(hasAcces);
  return (
    <Popover
      className="list-actions-menu-popover"
      trigger="click"
      placement="bottomLeft"
      open={openListMenu}
      onOpenChange={setOpenListMenu}
      arrow={false}
      content={
        <section className="visibility-popover">
          <header className="menu-header">
            <h2>Change visibility</h2>
            <span onClick={() => setOpenListMenu(!openListMenu)}>
              <CloseOutlined />
            </span>
          </header>
          <div className="menu-body">
            <nav className="popover-nav">
              <ul>
                <li>
                  <button
                    className="private-btn btn"
                    disabled={!hasAcces}
                    onClick={() => onPermissionClick("private")}
                  >
                    <span className="private-header">
                      <ReactSVG
                        src={privateIcon}
                        wrapper="span"
                        className="icon"
                      />
                      Private
                      {permissionCheck("private")}
                    </span>
                    <div>
                      Only board members can see this board. Workspace admins
                      can close the board or remove members.
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    className="workspace-btn btn"
                    disabled={!hasAcces}
                    onClick={() => onPermissionClick("org")}
                  >
                    <span className="workspace-header">
                      <ReactSVG
                        src={peopleIcon}
                        wrapper="span"
                        className="icon"
                      />
                      Workspace
                      {permissionCheck("org")}
                    </span>
                    <div className="workspace-body">
                      All members of the Trello Workspace Workspace can see and
                      edit this board.
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    className="public-btn btn"
                    disabled={!hasAcces}
                    onClick={() => onPermissionClick("public")}
                  >
                    <span className="public-header">
                      <ReactSVG
                        src={publicIcon}
                        wrapper="span"
                        className="icon"
                      />
                      Public
                      {permissionCheck("public")}
                    </span>
                    <div className="public-body">
                      Anyone on the internet can see this board. Only board
                      members can edit.
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      }
    >
      <button
        className="visibility-btn"
        onClick={() => setOpenListMenu(!openListMenu)}
      >
        <ReactSVG src={peopleIcon} wrapper="span" />
      </button>
    </Popover>
  );
}
