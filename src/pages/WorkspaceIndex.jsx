import { useLocation, Outlet, useSearchParams } from "react-router-dom";
import { WorkspaceHeader } from "../cmps/Workspace/WorkspaceHeader";
import { WorkspaceMenu } from "../cmps/Workspace/WorkspaceMenu";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  setBoard,
  loadBoard,
  loadBoardByTaskId,
  viewBoard,
} from "../store/board.actions";
import {
  login,
  editUser,
  addBoardToUser,
  loadUsers,
} from "../store/user.actions";
import { createBoard } from "../store/workspace.actions";
import { useSelector } from "react-redux";
import { setBoards } from "../store/workspace.actions";
import { updateBoard } from "../store/board.actions";
import { UserBoards } from "./UserBoards";

export function WorkspaceIndex() {
  const user = useSelector((state) => state.userModule.user);
  const boardsInfo = useSelector((state) => state.workspaceModule.boards)
    ?.filter((b) => user && b?.members?.some((m) => m.id === user.id))
    .filter((b) => !b.closed)
    .map((b) => ({
      id: b.id,
      name: b.name,
      closed: b.closed,
      coverImg: b.prefs.backgroundImage,
    }));
  const boards = useSelector((state) => state.workspaceModule.boards);
  const boardBgPrefs = useSelector((state) => state.boardModule.board)?.prefs;

  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [starredBoardIds, setStarredBoardIds] = useState([]);
  const [isUserBoards, setIsUserBoards] = useState(false);
  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    if (user) {
      console.log(user.darkMode);
      setDarkMode(user.darkMode);
    }
  }, [user]);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setBoards();
    login();
    loadUsers();
  }, []);

  useEffect(() => {
    if (params.boardId) {
      loadBoard(params.boardId);
      setSelectedBoardId(params.boardId);
      setIsUserBoards(false);
      viewBoard(params.boardId);
    }
    if (params.cardId) {
      loadBoardByTaskId(params.cardId).then((boardId) => {
        setSelectedBoardId(boardId);
        setIsUserBoards(false);
        viewBoard(boardId);
      });
    }
  }, [params]);

  //Notice any change in user page is through this
  //Make sure that changes dont break navigation
  useEffect(() => {
    if (!params.boardId && !params.cardId && user && !isUserBoards) {
      setSelectedBoardId(null);
    }
  }, [params, user, isUserBoards]);

  useEffect(() => {
    setStarredBoardIds(user?.starredBoardIds);
  }, [user]);

  useEffect(() => {
    // Update localStorage and <html> class based on darkMode state
    if (darkMode === "dark") {
      document.querySelector("html").classList.add("dark");
    } else if (darkMode === "light") {
      document.querySelector("html").classList.remove("dark");
    }
    if (darkMode === "default") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.querySelector("html").classList.add("dark");
      } else if (!window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.querySelector("html").classList.remove("dark");
      }
    }
  }, [darkMode]);

  function onStarClick(boardId) {
    const isStarred = user.starredBoardIds.includes(boardId);
    const starredBoardIds = isStarred
      ? user.starredBoardIds.filter((id) => id !== boardId)
      : [...user.starredBoardIds, boardId];
    editUser({ ...user, starredBoardIds });
  }

  async function onAddBoard(board) {
    const boardId = await createBoard(board);
    await addBoardToUser(boardId);
    navigate(`/b/${boardId}`);
  }

  function onCloseBoard(boardId) {
    console.log("onCloseBoard", boardId);
    const board = boards.find((b) => b.id === boardId);
    const newActivity = utilService.createActivity(
      {
        type: "closeBoard",
      },
      user
    );
    if (board) {
      updateBoard({
        ...board,
        closed: true,
        activities: [...board?.activities, newActivity],
      });
    }
  }

  function onLeaveBoard(boardId) {
    const board = boards.find((b) => b.id === boardId);
    if (board) {
      updateBoard({
        ...board,
        members: board.members.filter((m) => m.id !== user.id),
      });
      editUser({
        ...user,
        idBoards: user.idBoards.filter((id) => id !== boardId),
      });
    }
  }
  return (
    <section
      className={`workspace ${isUserBoards ? "user-boards-bg" : ""}`}
      style={{
        backgroundImage:
          selectedBoardId && boardBgPrefs?.backgroundImage
            ? `url(${boardBgPrefs.backgroundImage})`
            : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <WorkspaceHeader
        bgColor={(selectedBoardId && boardBgPrefs?.backgroundColor) || ""}
        userName={user?.username}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
      />
      {user && starredBoardIds && selectedBoardId ? (
        <section className="workspace-content">
          <WorkspaceMenu
            colorTheme={boardBgPrefs?.backgroundBrightness}
            boardsInfo={boardsInfo}
            selectedBoardId={selectedBoardId}
            starredBoardIds={starredBoardIds}
            onStarClick={onStarClick}
            onAddBoard={onAddBoard}
            closeBoard={onCloseBoard}
            leaveBoard={onLeaveBoard}
          />
          <Outlet />
        </section>
      ) : (
        <Outlet />
      )}

      {!user && <div>Loading...</div>}
    </section>
  );
}
