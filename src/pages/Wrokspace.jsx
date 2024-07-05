import { useLocation, Outlet, useSearchParams } from "react-router-dom";
import { WorkspaceHeader } from "../cmps/Workspace/WorkspaceHeader";
import { WorkspaceMenu } from "../cmps/Workspace/WorkspaceMenu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function Workspace({ boardsInfo }) {
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const board = useSelector((state) => state.workspaceModule.boards.find((b) => b.id === selectedBoardId));
    const task = useSelector((state) =>
        state.boardModule.board.groups
            ?.find((g) => g.tasks?.find((t) => t.id === selectedTaskId))
            ?.tasks.find((t) => t.id === selectedTaskId)
    );


    const params = useParams();

    useEffect(() => {
        params.cardId ? setSelectedTaskId(params.cardId) : setSelectedTaskId(null);
        params.boardId && setSelectedBoardId(params.boardId);
        if (selectedTaskId && !selectedBoardId && task) {
            setSelectedBoardId(task.idBoard);
        }
    }, [params]);

    return (
        <section className="workspace">
            {/* <WorkspaceHeader /> */}
            <section className="workspace-content">
                <WorkspaceMenu boardsInfo={boardsInfo} />
                <Outlet context={{ board, task }} />
            </section>
        </section>
    );
}