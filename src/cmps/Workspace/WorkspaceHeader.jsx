import { SvgButton } from "../CustomCpms/SvgButton";

export function WorkspaceHeader({ bgColor }) {
    return (
        <nav className="workspace-header" style={{ backgroundColor: bgColor }}>
            <SvgButton className="btn main" src="/img/workspace/appSwitcher.svg" />
            <button className="gif-btn">
                <div className="gif"></div>
            </button>
            <SvgButton className="svg-btn" src="/img/workspace/more.svg" preLabel="Workspace" />
            <SvgButton className="svg-btn" src="/img/workspace/more.svg" preLabel="Recent" />
            <SvgButton className="svg-btn" src="/img/workspace/more.svg" preLabel="Starred" />
            <SvgButton className="svg-btn" src="/img/workspace/more.svg" preLabel="Template" />
            <button className="create-btn">Create</button>
        </nav>
    );
}