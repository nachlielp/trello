import { useEffect, useState } from "react"
import { SvgButton } from "../CustomCpms/SvgButton"
import { useNavigate } from "react-router-dom"
import { StarBoardBtn } from "../CustomCpms/StarBoardBtn"
import { AddBoardPopover } from "./AddBoardPopover"
import { CloseBoardPopover } from "./CloseBoardPopover"

export function WorkspaceMenu({
    boardsInfo,
    selectedBoardId,
    starredBoardIds,
    onStarClick,
    onAddBoard,
    colorTheme,
    closeBoard,
    leaveBoard,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [hoveredBoardId, setHoveredBoardId] = useState(null)
    const [selectedBoardOptionsId, setSelectedBoardOptionsId] = useState(null)

    useEffect(() => {
        const root = document.documentElement
        const dynamicIconColor = colorTheme === "dark" ? "#fff" : "#42526E"
        const dynamicTextColor = colorTheme === "dark" ? "#fff" : "#172B4D"
        const dynamicLightDecrease = colorTheme === "dark" ? "0.35" : "0.0"
        root.style.setProperty("--dynamic-icon", dynamicIconColor)
        root.style.setProperty("--dynamic-text", dynamicTextColor)
        root.style.setProperty("--dynamic-light-decrease", dynamicLightDecrease)
    }, [colorTheme])
    // const bgTextColor = colorTheme === "dark" ? "#fff" : "#000";
    const navigate = useNavigate()

    function onSelectBoard(boardId) {
        navigate(`/b/${boardId}`, { replace: true })
    }

    function onSelectBoardOptions(boardId) {
        setSelectedBoardOptionsId(boardId)
    }

    return (
        <aside className="workspace-menu">
            {isMenuOpen ? (
                <section className="workspace-sidebar-closed">
                    <SvgButton
                        className="open-btn"
                        src="/img/workspace/backIcon.svg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </section>
            ) : (
                <section className="workspace-sidebar-opened">
                    <header className="workspace-sidebar-open-header">
                        <aside className="aside-start">
                            <img
                                className="workspace-cover-img"
                                src="/img/workspace/workspace-P.png"
                                alt="board cover"
                            />
                            <div className="workspace-title">
                                <h3>Pyello Workspace</h3>
                                <p>Free</p>
                            </div>
                        </aside>
                        <aside>
                            <SvgButton
                                className="close-btn"
                                src="/img/workspace/backIcon.svg"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                        </aside>
                    </header>
                    <main className="workspace-menu-main">
                        <article className="workspace-menu-options">
                            <p className="workspace-menu-option">
                                <SvgButton
                                    className="option-icon"
                                    src="/img/workspace/boardIcon.svg"
                                />
                                <span className="option-title">Boards</span>
                            </p>
                            <p className="workspace-menu-option">
                                <SvgButton
                                    className="option-icon"
                                    src="/img/taskActionBtns/userIcon.svg"
                                />
                                <span className="option-title">Members </span>
                                <SvgButton
                                    className="option-add-btn"
                                    src="/img/workspace/pluseIcon.svg"
                                />
                            </p>
                            <p className="workspace-menu-option">
                                <SvgButton
                                    className="option-icon"
                                    src="/img/workspace/settings.svg"
                                />
                                <span className="option-title">
                                    Workspace settings
                                </span>
                            </p>
                        </article>
                        {/* <h3>Workspace views</h3>
                        <p>Table</p>
                        <p>Calendar</p> */}
                        <article className="workspace-menu-boards">
                            <header className="workspace-menu-boards-header">
                                <h3>Your Boards</h3>
                                <AddBoardPopover
                                    onAddBoard={onAddBoard}
                                    anchorEl={
                                        <SvgButton
                                            className="board-add-btn"
                                            src="/img/workspace/pluseIcon.svg"
                                        />
                                    }
                                />
                            </header>
                            {boardsInfo
                                .sort((a, b) => {
                                    const aIsStarred = starredBoardIds.includes(
                                        a.id
                                    )
                                    const bIsStarred = starredBoardIds.includes(
                                        b.id
                                    )

                                    if (aIsStarred && !bIsStarred) return -1
                                    if (!aIsStarred && bIsStarred) return 1

                                    return a.name.localeCompare(b.name)
                                })
                                .map((board) => (
                                    <div
                                        className={`board-option ${
                                            selectedBoardId === board.id
                                                ? "active-board"
                                                : ""
                                        }`}
                                        key={board.id}
                                        onClick={() => onSelectBoard(board.id)}
                                        onMouseEnter={() =>
                                            setHoveredBoardId(board.id)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredBoardId(null)
                                        }
                                    >
                                        <img
                                            className="board-cover-img"
                                            src={board.coverImg}
                                            alt="board cover"
                                        />
                                        <p className="board-name">
                                            {board.name}
                                        </p>
                                        <aside className="board-option-btns">
                                            {(hoveredBoardId === board.id ||
                                                selectedBoardOptionsId ===
                                                    board.id) && (
                                                <CloseBoardPopover
                                                    boardName={board.name}
                                                    boardId={board.id}
                                                    onSelectBoardOptions={
                                                        onSelectBoardOptions
                                                    }
                                                    closeBoard={closeBoard}
                                                    leaveBoard={leaveBoard}
                                                />
                                            )}
                                            {(selectedBoardId === board.id ||
                                                starredBoardIds.includes(
                                                    board.id
                                                ) ||
                                                hoveredBoardId ===
                                                    board.id) && (
                                                <StarBoardBtn
                                                    starredBoardIds={
                                                        starredBoardIds
                                                    }
                                                    boardId={board.id}
                                                    starClick={onStarClick}
                                                />
                                            )}
                                        </aside>
                                    </div>
                                ))}
                        </article>
                    </main>
                </section>
            )}
        </aside>
    )
}

const AddBoardBtn = () => {
    return (
        <article className="board-tab-add">
            <p>Create new board</p>
            <p>{10 - boards.length} remaining</p>
        </article>
    )
}
