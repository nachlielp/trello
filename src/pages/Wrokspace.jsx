import { useLocation, Outlet, useSearchParams } from "react-router-dom";
import { WorkspaceHeader } from "../cmps/Workspace/WorkspaceHeader";
import { WorkspaceMenu } from "../cmps/Workspace/WorkspaceMenu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { setBoard } from "../store/board.actions";
import { login, editUser } from "../store/user.actions";

export function Workspace({ boardsInfo }) {
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [starredBoardIds, setStarredBoardIds] = useState([]);

    const board = useSelector((state) => state.workspaceModule.boards.find((b) => b.id === selectedBoardId));
    const task = useSelector((state) =>
        state.workspaceModule.boards
            ?.flatMap((b) => b.groups || [])
            ?.flatMap((g) => g.tasks || [])
            ?.find((t) => t.id === selectedTaskId)
    );
    const user = useSelector((state) => state.userModule.user);

    const params = useParams();

    useEffect(() => {
        params.boardId && setSelectedBoardId(params.boardId);
        params.cardId ? setSelectedTaskId(params.cardId) : setSelectedTaskId(null);
        if (selectedTaskId && !selectedBoardId && task) {
            setSelectedBoardId(task.idBoard);
        }
    }, [params]);

    useEffect(() => {
        if (board) {
            setBoard(board);
        }
    }, [board]);

    useEffect(() => {
        setStarredBoardIds(user?.starredBoardIds);
    }, [user?.starredBoardIds.length]);


    useEffect(() => {
        login()
    }, []);

    function onStarClick(boardId) {
        const isStarred = user.starredBoardIds.includes(boardId);
        const starredBoardIds = isStarred ? user.starredBoardIds.filter((id) => id !== boardId) : [...user.starredBoardIds, boardId];
        console.log("starredBoardIds", starredBoardIds);
        editUser({ ...user, starredBoardIds });
    }
    return (
        <section className="workspace">
            {/* <WorkspaceHeader /> */}

            {user && board && starredBoardIds ? (
                <section className="workspace-content">
                    <WorkspaceMenu boardsInfo={boardsInfo} selectedBoardId={selectedBoardId} starredBoardIds={starredBoardIds} onStarClick={onStarClick} />
                    <Outlet context={{ board, task }} />
                </section>
            ) : (
                <div>Loading...</div>
            )}
        </section>
    );
}