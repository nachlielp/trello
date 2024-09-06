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
import { Link } from "react-router-dom";
import { PhotosBackgrounds } from "./PhotosBackgrounds";
import { ColorsBackgrounds } from "./ColorsBackgrounds";

export function BoardMenu({ setOpenBoarMenu, setShowBtn }) {
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);
  const [isGoToBackground, setIsGoToBackground] = useState(false);

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

  function onGoBack() {
    if (isGoToBackground) {
      setNavigation("Change background");
      setIsGoToBackground(false);
    } else {
      setNavigation("Menu");
    }
  }

  function onGotoPhotos() {
    setIsGoToBackground(true);
    setNavigation(
      <span>
        Photos by <Link to={"https://unsplash.com/"}>Unsplash</Link>
      </span>
    );
  }
  function onGoToColors() {
    setIsGoToBackground(true);
    setNavigation("Colors");
  }

  return (
    <section className={`board-menu ${animation}`}>
      <header className="header-menu">
        {navigation !== "Menu" && (
          <button className="btn back" onClick={onGoBack}>
            <span className="pyello-icon icon-back" />
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
            <span className="pyello-icon icon-information btn-menu" />
            <span className="desc">
              About this board
              <span>Add a description to your board</span>
            </span>
          </button>
          <button className="btn" onClick={() => setNavigation("Activity")}>
            <span className="pyello-icon icon-activity btn-menu" />
            Activity
          </button>
          {(board.members.some((m) => m.id === user.id) || user.isAdmin) && (
            <>
              <button className="btn" onClick={() => setNavigation("Archive")}>
                <span className="pyello-icon icon-archive btn-menu" />
                Archived items
              </button>{" "}
              <button
                className="btn"
                onClick={() => setNavigation("Change background")}
              >
                <span
                  className="bg"
                  style={{
                    backgroundImage: `url(${board.prefs.backgroundImage})`,
                  }}
                />
                Change background
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
                      <span className="pyello-icon icon-remove btn-menu" />
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
                    <span className="pyello-icon icon-leave-board btn-menu" />
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
      {navigation === "Change background" && (
        <section className="change-bg navigation">
          <section onClick={onGotoPhotos} className="photos container">
            <div className="bg photos"></div>
            <p>Photos</p>
          </section>
          <section onClick={onGoToColors} className="colors container">
            <div className="bg colors"></div>
            <p>Colors</p>
          </section>
        </section>
      )}
      {(navigation !== "Colors" && isGoToBackground) && <PhotosBackgrounds />}
      {(navigation === "Colors" && isGoToBackground) && <ColorsBackgrounds />}
    </section>
  );
}
