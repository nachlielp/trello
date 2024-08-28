import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { BoardActivity } from "./BoardActivity";
import { BoardDescription } from "./BoardDescription";
import { useSelector } from "react-redux";
import { ActionPopover } from "./ActionPopover";
import { updateBoard } from "../../../store/board.actions";
import { editUser } from "../../../store/user.actions";
import { utilService } from "../../../services/util.service";
import { useNavigate } from "react-router";

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
  async function onCloseBoard() {
    const newActivity = utilService.createActivity(
      {
        type: "closeBoard",
      },
      user
    );
    if (board) {
      await updateBoard({
        ...board,
        closed: true,
        activities: [...board?.activities, newActivity],
      });
      navigate(`/u/${user.username}/boards`);
    }
  }

  function onLeaveBoard() {
    if (board) {
      updateBoard({
        ...board,
        members: board.members.filter((m) => m.id !== user.id),
      });
      editUser({
        ...user,
        idBoards: user.idBoards.filter((id) => id !== board.id),
      });
    }
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
          <button
            className="btn"
            onClick={() => setNavigation("About this board")}
          >
            <span className="trello-icon icon-information btn-menu" />
            <span className="desc">
              About this board
              <span>Add a description to your board</span>
            </span>
          </button>
          <button className="btn" onClick={() => setNavigation("Activity")}>
            <span className="trello-icon icon-activity btn-menu" />
            Activity
          </button>
          {/* <button className="btn" onClick={() => setNavigation("Menu")}>
            <span className="trello-icon icon-archive btn-menu" />
            Archived items
          </button> */}
          {board.members.some((m) => m.id === user.id) && (
            <>
              <hr className="border_bottom" />
              <ActionPopover
                action={"Close board"}
                closeBoard={onCloseBoard}
                anchorEl={
                  <button className="btn" onClick={() => setNavigation("Menu")}>
                    <span className="trello-icon icon-remove btn-menu" />
                    Close Board
                  </button>
                }
              />
              <ActionPopover
                action={"Leave board?"}
                leaveBoard={onLeaveBoard}
                anchorEl={
                  <button className="btn" onClick={() => setNavigation("Menu")}>
                    <span className="trello-icon icon-leave-board btn-menu" />
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
    </section>
  );
}
