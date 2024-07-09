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

export function WorkspaceIndex() {
    const boardsInfo = useSelector((state) => state.workspaceModule.boards).filter((b) => !b.closed).map((b) => ({ id: b.id, name: b.name, closed: b.closed, coverImg: b.prefs.backgroundImage }));
    const boards = useSelector((state) => state.workspaceModule.boards);
    const boardBgPrefs = useSelector((state) => state.boardModule.board)?.prefs;
    const user = useSelector((state) => state.userModule.user);
    const params = useParams();

    useEffect(() => {
        setBoards();
        login();
    }, []);

    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [starredBoardIds, setStarredBoardIds] = useState([]);
    const navigate = useNavigate();




    useEffect(() => {
        if (params.boardId) {
            loadBoard(params.boardId);
            setSelectedBoardId(params.boardId);
        }
        if (params.cardId) {
            loadBoardByTaskId(params.cardId).then((boardId) => {
                setSelectedBoardId(boardId);
            });
        }
    }, [params]);

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
        await createBoard(board);
        await addBoardToUser(board.id);
        navigate(`/b/${board.id}`);
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
        <section className="workspace" style={{
            backgroundImage: boardBgPrefs?.backgroundImage ? `url(${boardBgPrefs.backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <WorkspaceHeader bgColor={boardBgPrefs?.backgroundColor || "#000"} />

            {user && starredBoardIds ? (
                <section className="workspace-content">
                    <WorkspaceMenu colorTheme={boardBgPrefs?.backgroundBrightness} boardsInfo={boardsInfo} selectedBoardId={selectedBoardId} starredBoardIds={starredBoardIds} onStarClick={onStarClick} onAddBoard={onAddBoard} closeBoard={onCloseBoard} leaveBoard={onLeaveBoard} />
                    <Outlet />
                </section>
            ) : (
                <div>Loading...</div>
            )}
        </section>
    );
}