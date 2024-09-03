import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { BoardActivity } from "./BoardActivity";
import { BoardDescription } from "./BoardDescription";
import { useSelector } from "react-redux";
import { ActionPopover } from "./ActionPopover";
import { removeBoard, updateBoard } from "../../../store/board.actions";
import { editUser } from "../../../store/user.actions";
import { utilService } from "../../../services/util.service";
import { useNavigate } from "react-router";
import { ArchivedItems } from "./ArchivedItems";

export function BoardMenu({ setOpenBoarMenu, setShowBtn }) {
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);

  const [preventLoad, setPreventLoad] = useState(false);
  const [animation, setAnimation] = useState("");
  const [navigation, setNavigation] = useState("Menu");

  const navigate = useNavigate();
  function onClose() {
    setAnimation("fade-out");
    setShowBtn(true);
    setTimeout(() => {
      setOpenBoarMenu(false);
      setAnimation("");
    }, 200);
  }
  useEffect(() => {
    if (!preventLoad) {
      setNavigation("Menu");
    }
  }, []);

  function onSetPreventLoad(boolean) {
    setPreventLoad(boolean);
  }
  async function deleteBoard() {
    if (board) {
      await removeBoard(board.id);
      navigate(`/u/${user.username}/boards`);
    }
  }

  function onLeaveBoard() {
    if (board) {
      updateBoard({
        ...board,
        members: board.members.filter((m) => m.id !== user.id),
      });
    }
  }

  return (
    <section className={`board-menu ${animation}`}>
      <header className="header-menu">
        {navigation !== "Menu" && (
          <button className="btn back" onClick={() => setNavigation("Menu")}>
            <span className="prello-icon icon-back" />
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
          <button
            className="btn"
            onClick={() => setNavigation("About this board")}
          >
            <span className="prello-icon icon-information btn-menu" />
            <span className="desc">
              About this board
              <span>Add a description to your board</span>
            </span>
          </button>
          <button className="btn" onClick={() => setNavigation("Activity")}>
            <span className="prello-icon icon-activity btn-menu" />
            Activity
          </button>
          {(board.members.some((m) => m.id === user.id) || user.isAdmin) && (
            <>
              <button className="btn" onClick={() => setNavigation("Archive")}>
                <span className="prello-icon icon-archive btn-menu" />
                Archived items
              </button>
              <hr className="border_bottom" />
              {(board.members.some(
                (m) => m.id === user.id && m.permissionStatus === "admin"
              ) ||
                user.isAdmin) && (
                <ActionPopover
                  action={"Delete board?"}
                  deleteBoard={deleteBoard}
                  anchorEl={
                    <button
                      className="btn"
                      onClick={() => setNavigation("Menu")}
                    >
                      <span className="prello-icon icon-remove btn-menu" />
                      Delete board
                    </button>
                  }
                />
              )}
              <ActionPopover
                action={"Leave board?"}
                leaveBoard={onLeaveBoard}
                anchorEl={
                  <button className="btn" onClick={() => setNavigation("Menu")}>
                    <span className="prello-icon icon-leave-board btn-menu" />
                    Leave Board
                  </button>
                }
              />
            </>
          )}
        </main>
      )}

      {navigation === "Activity" && (
        <section className="navigation">
          <BoardActivity />
        </section>
      )}
      {navigation === "About this board" && (
        <BoardDescription onSetPreventLoad={onSetPreventLoad} />
      )}
      {navigation === "Archive" && <ArchivedItems />}
    </section>
  );
}
