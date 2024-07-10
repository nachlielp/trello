import { SvgButton } from "../CustomCpms/SvgButton";

import { useNavigate } from "react-router-dom";

export function WorkspaceHeader({ bgColor, userName }) {
    const navigate = useNavigate();
    const dynamicHeaderText = bgColor === '#fff' ? '#44546f' : '#fff';
    const borderColor = bgColor === '#fff' ? '#d7dce1' : 'hsla(0, 0%, 100%, 0.16)';

    return (
        <nav className={`workspace-header ${bgColor === '#fff' ? 'white-bg' : ''}`} style={{ backgroundColor: bgColor, '--dynamic-header-text': dynamicHeaderText, '--border-color': borderColor }}>
            <SvgButton className="btn main" src="/img/workspace/appSwitcher.svg" />
            <button className="gif-btn" onClick={() => navigate(`/u/${userName}/boards`)}>
                <div className={`gif ${bgColor === '#fff' ? 'gray-filter' : ''}`}></div>
            </button>
            <SvgButton className="svg-btn" src="/img/workspace/more.svg" preLabel="Workspace" />
            <SvgButton className="svg-btn" src="/img/workspace/more.svg" preLabel="Recent" />
            <SvgButton className="svg-btn" src="/img/workspace/more.svg" preLabel="Starred" />
            <SvgButton className="svg-btn" src="/img/workspace/more.svg" preLabel="Template" />
            <button className="create-btn">Create</button>
        </nav>
    );
}