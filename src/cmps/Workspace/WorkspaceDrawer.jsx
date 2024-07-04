import { useState } from "react";
import { SvgButton } from "../../cmps/CustomCpms/SvgButton";

export function WorkspaceDrawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
        <aside className="workspace-drawer">
            {isDrawerOpen ?
                <section className="workspace-sidebar-closed">
                    <SvgButton className="open-btn" src="/img/taskActionBtns/arrowLeftIcon.svg" onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
                </section>
                :
                <section className="workspace-sidebar-open">
                    <header className="workspace-sidebar-open-header">
                        <SvgButton className="close-btn" src="/img/taskActionBtns/arrowLeftIcon.svg" onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
                    </header>
                </section>
            }
        </aside>
    )
}