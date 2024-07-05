import { useState } from "react";
import { SvgButton } from "../CustomCpms/SvgButton";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons"
import { StarBoardBtn } from "../CustomCpms/StarBoardBtn";
import { Button } from "antd";
import { AddBoardPopover } from "./AddBoardPopover";

export function WorkspaceMenu({ boardsInfo, selectedBoardId, starredBoardIds, onStarClick, onAddBoard }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredBoardId, setHoveredBoardId] = useState(null);
    // const [selectedBoard, setSelectedBoard] = useState(null);

    const navigate = useNavigate();

    function onSelectBoard(boardId) {
        navigate(`/b/${boardId}`, { replace: true });
    }

    return (
        <aside className="workspace-menu">
            {isMenuOpen ?
                <section className="workspace-sidebar-closed">
                    <SvgButton className="open-btn" src="/img/workspace/backIcon.svg" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </section>
                :
                <section className="workspace-sidebar-opened">
                    <header className="workspace-sidebar-open-header">
                        <aside className="aside-start">
                            <img className="workspace-cover-img" src="/img/workspace/workspace-T.png" alt="board cover" />
                            <div className="workspace-title">
                                <h3>Workspace</h3>
                                <p>Free</p>
                            </div>
                        </aside>
                        <aside>
                            <SvgButton className="close-btn" src="/img/workspace/backIcon.svg" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        </aside>
                    </header>
                    <main className="workspace-menu-main">
                        <article className="workspace-menu-options">
                            <p className="workspace-menu-option">
                                <SvgButton className="option-icon" src="/img/workspace/boardIcon.svg" />
                                <span className="option-title">Boards</span>
                            </p>
                            <p className="workspace-menu-option">
                                <SvgButton className="option-icon" src='/img/taskActionBtns/userIcon.svg' />
                                <span className="option-title">Members  </span>
                                <SvgButton className="option-add-btn" src="/img/workspace/pluseIcon.svg" />
                            </p>
                            <p className="workspace-menu-option">
                                <SvgButton className="option-icon" src="/img/workspace/settings.svg" />
                                <span className="option-title">Workspace settings</span>
                            </p>
                        </article>
                        {/* <h3>Workspace views</h3>
                        <p>Table</p>
                        <p>Calendar</p> */}
                        <article className="workspace-menu-boards">
                            <header className="workspace-menu-boards-header">
                                <h3>Your Boards</h3>
                                {/* <SvgButton className="board-add-btn" src="/img/workspace/pluseIcon.svg" /> */}
                                <AddBoardPopover onAddBoard={onAddBoard} />
                            </header>
                            {boardsInfo.sort((a, b) => b.name - a.name).map((board) => (
                                <div
                                    className={`board-option ${selectedBoardId === board.id ? "active-board" : ""}`}
                                    key={board.id}
                                    onClick={() => onSelectBoard(board.id)}
                                    onMouseEnter={() => setHoveredBoardId(board.id)}
                                    onMouseLeave={() => setHoveredBoardId(null)}
                                >
                                    <img className="board-cover-img" src={board.coverImg} alt="board cover" />
                                    <p className="board-name">{board.name}</p>
                                    <aside className="board-option-btns">
                                        {hoveredBoardId === board.id &&
                                            <Button className="more-btn" size="small" >
                                                <EllipsisOutlined />
                                            </Button>
                                        }
                                        {(selectedBoardId === board.id || starredBoardIds.includes(board.id) || hoveredBoardId === board.id) && (
                                            <StarBoardBtn
                                                starredBoardIds={starredBoardIds}
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
            }
        </aside>
    )
}