import { useSelector } from "react-redux";
import { StarBoardBtn } from "../cmps/CustomCpms/StarBoardBtn";
import {
    StarOutlined,
} from "@ant-design/icons";
import { ReactSVG } from "react-svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddBoardPopover } from "../cmps/Workspace/AddBoardPopover";

export function UserBoards({ starClick, onAddBoard }) {
    const user = useSelector((state) => state.userModule.user);
    const boards = useSelector((state) => state.workspaceModule.boards)

    if (!user) return null;

    return (
        <section className="user-boards">
            <menu className="user-boards-menu">
                {/* TODO: Add user boards menu */}
            </menu>
            <main className="user-boards-main">
                <section className="section starred-boards">
                    <header className="section-header">
                        <StarOutlined className="section-icon star-icon" />
                        <h3 className="section-title">Starred Boards</h3>
                    </header>
                    <article className="section-content">
                        {boards.filter((board) => user.starredBoardIds.includes(board.id)).map((board) => (
                            <BoardTab key={board.id} board={board} starredBoardIds={user.starredBoardIds} starClick={starClick} />
                        ))}
                    </article>
                </section>
                <section className="section recently-viewed-boards">
                    <header className="section-header">
                        <ReactSVG src="/img/taskActionBtns/timeIcon.svg" className="section-icon" />
                        <h3 className="section-title">Recently Viewed</h3>
                    </header>
                    <article className="section-content">
                        {boards
                            .sort((a, b) => b.viewedAt - a.viewedAt)
                            .slice(0, 3)
                            .map((board) => (
                                <BoardTab key={board.id} board={board} starredBoardIds={user.starredBoardIds} starClick={starClick} />
                            ))}
                    </article>
                </section>
                <section className="section workspace">
                    <h1>YOUR WORKSPACE</h1>
                    <article className="section-content workspace-boards">
                        {boards
                            .sort((a, b) => b.apdatedAt - a.apdatedAt) // Sort boards by apdatedAt in descending order
                            .map((board) => (
                                <BoardTab key={board.id} board={board} starredBoardIds={user.starredBoardIds} starClick={starClick} />
                            ))}
                        <AddBoardPopover onAddBoard={onAddBoard}
                            anchorEl={
                                <article className="board-tab-add-in-workspace">
                                    <p className="board-tab-add-title">Create new board</p>
                                    <p className="board-tab-add-subtitle">{10 - boards.length} remaining</p>
                                </article>
                            } />
                    </article>
                </section>
            </main>
        </section>
    )
}

const BoardTab = ({ board, starredBoardIds, starClick }) => {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const isStarred = starredBoardIds.includes(board.id);
    return (
        <article
            className="board-tab"
            style={{ backgroundImage: `url(${board?.prefs?.backgroundImageScaled ? board?.prefs?.backgroundImageScaled[1]?.url : board?.prefs?.backgroundImage})` }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => navigate(`/b/${board.id}`)}
        >
            <h2 className="board-title">{board.name}</h2>
            {(isHover || isStarred) && <StarBoardBtn starredBoardIds={starredBoardIds} boardId={board.id} starClick={starClick} />}
        </article>
    )
}

const AddBoardBtn = ({ onAddBoard }) => {
    return (
        <article className="board-tab-add">
            <p>Create new board</p>
            <p>{10 - boards.length} remaining</p>
        </article>
    )
}