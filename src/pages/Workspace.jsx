import { useLocation, Outlet, useSearchParams } from "react-router-dom";
import { WorkspaceHeader } from "../cmps/Workspace/WorkspaceHeader";
import { WorkspaceMenu } from "../cmps/Workspace/WorkspaceMenu";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setBoard, loadBoard, loadBoardByTaskId } from "../store/board.actions";
import { login, editUser, addBoardToUser } from "../store/user.actions";
import { createBoard } from "../store/workspace.actions";
import { useSelector } from "react-redux";
import { setBoards } from "../store/workspace.actions"
export function Workspace() {
    const boardsInfo = useSelector((state) => state.workspaceModule.boards).map((b) => ({ id: b.id, name: b.name, closed: b.closed, coverImg: b.prefs.backgroundImage }));
    useEffect(() => {
        setBoards();
        login();
    }, []);

    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [starredBoardIds, setStarredBoardIds] = useState([]);
    const navigate = useNavigate();


    const user = useSelector((state) => state.userModule.user);
    const params = useParams();

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
    return (
        <section className="workspace">
            {/* <WorkspaceHeader /> */}

            {user && starredBoardIds ? (
                <section className="workspace-content">
                    <WorkspaceMenu boardsInfo={boardsInfo} selectedBoardId={selectedBoardId} starredBoardIds={starredBoardIds} onStarClick={onStarClick} onAddBoard={onAddBoard} />
                    <Outlet />
                </section>
            ) : (
                <div>Loading...</div>
            )}
        </section>
    );
}