import { useLocation, Outlet, useSearchParams } from "react-router-dom";
import { WorkspaceHeader } from "../cmps/Workspace/WorkspaceHeader";
import { WorkspaceDrawer } from "../cmps/Workspace/WorkspaceDrawer";

export function Workspace() {
    return (
        <section className="workspace">
            {/* <WorkspaceHeader /> */}
            <section className="workspace-content">
                <WorkspaceDrawer />
                <Outlet />
            </section>
        </section>
    );
}