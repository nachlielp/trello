import { useState } from "react";
import { SvgButton } from "../CustomCpms/SvgButton";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons"

export function WorkspaceMenu({ boardsInfo }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    console.log(boardsInfo)
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
                                <SvgButton className="board-add-btn" src="/img/workspace/pluseIcon.svg" />
                            </header>
                            {boardsInfo.map((board) => (
                                <div className="board-option" key={board.id} onClick={() => navigate(`/b/${board.id}`, { replace: true })}>
                                    <img className="board-cover-img" src={board.coverImg} alt="board cover" />
                                    <p className="board-name">{board.name}</p>
                                </div>
                            ))}
                        </article>
                    </main>
                </section>
            }
        </aside>
    )
}