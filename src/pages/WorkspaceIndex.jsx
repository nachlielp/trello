import { useLocation, Outlet, useSearchParams } from "react-router-dom";
import { WorkspaceHeader } from "../cmps/Workspace/WorkspaceHeader";
import { WorkspaceMenu } from "../cmps/Workspace/WorkspaceMenu";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setBoard, loadBoard, loadBoardByTaskId } from "../store/board.actions";
import { login, editUser, addBoardToUser } from "../store/user.actions";
import { createBoard } from "../store/workspace.actions";
import { useSelector } from "react-redux";
import { setBoards, editWorkspaceBoardState } from "../store/workspace.actions"
import { updateBoard } from "../store/board.actions";
import { UserBoards } from "./UserBoards";

export function WorkspaceIndex() {
    const user = useSelector((state) => state.userModule.user);
    const boardsInfo = useSelector((state) => state.workspaceModule.boards)
        .filter(b => user && b.members.some(m => m.id === user.id)).filter((b) => !b.closed)
        .map((b) => ({ id: b.id, name: b.name, closed: b.closed, coverImg: b.prefs.backgroundImage }));
    const boards = useSelector((state) => state.workspaceModule.boards);
    const boardBgPrefs = useSelector((state) => state.boardModule.board)?.prefs;

    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [starredBoardIds, setStarredBoardIds] = useState([]);
    const [isUserBoards, setIsUserBoards] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setBoards();
        login();
    }, []);




    useEffect(() => {
        if (params.boardId) {
            loadBoard(params.boardId);
            setSelectedBoardId(params.boardId);
            setIsUserBoards(false);
        }
        if (params.cardId) {
            loadBoardByTaskId(params.cardId).then((boardId) => {
                setSelectedBoardId(boardId);
                setIsUserBoards(false);
            });
        }
    }, [params]);

    useEffect(() => {
        if (!params.boardId && !params.cardId && user && !isUserBoards) {
            setIsUserBoards(true);
            setSelectedBoardId(null);
            navigate(`/u/${user.username}/boards`);
        }
    }, [params, user, isUserBoards]);

    useEffect(() => {
        setStarredBoardIds(user?.starredBoardIds);
    }, [user]);


    useEffect(() => {
        login()
    }, []);

    function onStarClick(boardId) {
        const isStarred = user.starredBoardIds.includes(boardId);
        const starredBoardIds = isStarred ? user.starredBoardIds.filter((id) => id !== boardId) : [...user.starredBoardIds, boardId];
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
        if (board) {
            updateBoard({ ...board, closed: true });
        }
    }

    function onLeaveBoard(boardId) {
        const board = boards.find((b) => b.id === boardId);
        if (board) {
            updateBoard({ ...board, members: board.members.filter((m) => m.id !== user.id) });
            editUser({ ...user, idBoards: user.idBoards.filter((id) => id !== boardId) });
        }
    }
    return (
        <section className={`workspace ${isUserBoards ? "user-boards-bg" : ""}`} style={{
            backgroundImage: selectedBoardId && boardBgPrefs?.backgroundImage ? `url(${boardBgPrefs.backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <WorkspaceHeader bgColor={boardBgPrefs?.backgroundColor || "#fff"} userName={user?.username} />
            {user && starredBoardIds && selectedBoardId && !isUserBoards && (
                <section className="workspace-content">
                    <WorkspaceMenu colorTheme={boardBgPrefs?.backgroundBrightness} boardsInfo={boardsInfo} selectedBoardId={selectedBoardId} starredBoardIds={starredBoardIds} onStarClick={onStarClick} onAddBoard={onAddBoard} closeBoard={onCloseBoard} leaveBoard={onLeaveBoard} />
                    <Outlet />
                </section>
            )}
            {isUserBoards && (
                <UserBoards starClick={onStarClick} onAddBoard={onAddBoard} />
            )}
            {!user && (
                <div>Loading...</div>
            )}
        </section>
    );
}