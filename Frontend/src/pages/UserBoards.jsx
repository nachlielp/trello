import { useSelector } from "react-redux"
import { StarBoardBtn } from "../cmps/CustomCpms/StarBoardBtn"
import { StarOutlined } from "@ant-design/icons"
import { ReactSVG } from "react-svg"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AddBoardPopover } from "../cmps/Workspace/AddBoardPopover"
import { createBoard } from "../store/workspace.actions"
import { editUser } from "../store/user.actions"
import { ArchiveModal } from "../cmps/UserBoards/ArchiveModal"
import { SvgButton } from "../cmps/CustomCpms/SvgButton"
export function UserBoards() {
    const user = useSelector((state) => state.userModule.user)
    const boards = useSelector((state) => state.workspaceModule.boards)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (user && params.userName !== user.username) {
            navigate(`/u/${user.username}/boards`)
        }
    }, [user, params])

    function onStarClick(boardId) {
        const isStarred = user.starredBoardIds.includes(boardId)
        const starredBoardIds = isStarred
            ? user.starredBoardIds.filter((id) => id !== boardId)
            : [...user.starredBoardIds, boardId]
        editUser({ ...user, starredBoardIds })
    }

    async function onAddBoard(board) {
        const boardId = await createBoard(board)
        navigate(`/b/${boardId}`)
    }

    if (!user) return null

    return (
        <section className="user-boards">
            <main className="user-boards-main">
                <section className="section starred-boards">
                    <header className="section-header">
                        <StarOutlined className="section-icon star-icon" />
                        <h3 className="section-title">Starred boards</h3>
                    </header>
                    <article className="section-content">
                        {boards
                            .filter((board) =>
                                user?.starredBoardIds.includes(board.id)
                            )
                            .map((board) => (
                                <BoardTab
                                    key={board.id}
                                    board={board}
                                    starredBoardIds={user.starredBoardIds}
                                    starClick={onStarClick}
                                />
                            ))}
                    </article>
                </section>
                <section className="section recently-viewed-boards">
                    <header className="section-header">
                        <ReactSVG
                            src="/img/taskActionBtns/timeIcon.svg"
                            className="section-icon"
                        />
                        <h3 className="section-title">Recently viewed</h3>
                    </header>
                    <article className="section-content">
                        {boards
                            .sort((a, b) => b.viewedAt - a.viewedAt)
                            .filter((b) => !b.closed)
                            .slice(0, 3)
                            .map((board) => (
                                <BoardTab
                                    key={board.id}
                                    board={board}
                                    starredBoardIds={user.starredBoardIds}
                                    starClick={onStarClick}
                                />
                            ))}
                    </article>
                </section>
                <section className="section workspace">
                    <h1 className="workspace-title">YOUR WORKSPACES</h1>
                    <article className="workspace-header-section">
                        <img
                            className="workspace-cover-img"
                            src="/img/workspace/workspace-P.png"
                            alt="board cover"
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "3px",
                            }}
                        />
                        <label className="workspace-sub-title">
                            Pyello Workspace
                        </label>
                    </article>
                    <article className="section-content workspace-boards">
                        {boards
                            .sort((a, b) => b.updatedAt - a.updatedAt) // Sort boards by updatedAt in descending order
                            .filter((b) => !b.closed)
                            .map((board) => (
                                <BoardTab
                                    key={board.id}
                                    board={board}
                                    starredBoardIds={user.starredBoardIds}
                                    starClick={onStarClick}
                                />
                            ))}
                        <AddBoardPopover
                            onAddBoard={onAddBoard}
                            anchorEl={
                                <article className="board-tab-add-in-workspace">
                                    <p className="board-tab-add-title">
                                        Create new board
                                    </p>
                                    <p className="board-tab-add-subtitle">
                                        {10 -
                                            boards.filter((b) => !b.closed)
                                                .length}{" "}
                                        remaining
                                    </p>
                                </article>
                            }
                        />
                    </article>
                </section>
                <section className="bottom">
                    <button
                        className="btn"
                        disabled={!boards.filter((b) => b.closed).length > 0}
                        onClick={() => setIsOpenModal(true)}
                    >
                        View all closed boards
                    </button>
                </section>
            </main>
            {isOpenModal && (
                <ArchiveModal onClose={() => setIsOpenModal(false)} />
            )}
        </section>
    )
}

const BoardTab = ({ board, starredBoardIds, starClick }) => {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const isStarred = starredBoardIds?.includes(board.id)
    return (
        <article
            className="board-tab"
            style={{
                backgroundImage: `url(${
                    board?.prefs?.backgroundImageScaled
                        ? board?.prefs?.backgroundImageScaled[1]?.url
                        : board?.prefs?.backgroundImage
                })`,
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => navigate(`/b/${board.id}`)}
        >
            <span className="tab-bg" />
            <h2 className="board-title">{board.name}</h2>
            {(isHover || isStarred) && (
                <StarBoardBtn
                    starredBoardIds={starredBoardIds}
                    boardId={board.id}
                    starClick={starClick}
                />
            )}
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
