import { useEffect } from "react";
import { SvgButton } from "../CustomCpms/SvgButton";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAvatar } from "../UserAvatar";

export function WorkspaceHeader({ bgColor, userName }) {
  const navigate = useNavigate();
const user = useSelector(state=>state.userModule.user)



  const dynamicHeaderText =
    bgColor === "" ? "var(--ds-text-subtle, #44546f)" : "#fff";
  const borderColor =
    bgColor === "" ? "var(--ds-border, #d7dce1)" : "hsla(0, 0%, 100%, 0.16)";
  const backgroundColor =
    bgColor === "" ? "var(--ds-surface, #ffffff)" : "hsla(0, 0%, 100%, 0.16)";

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--dynamic-header-text",
      dynamicHeaderText
    );
    document.documentElement.style.setProperty("--border-color", borderColor);
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  }, [dynamicHeaderText, borderColor, backgroundColor]);

  return (
    <div className="workspace-header">
      <nav
        className={`workspace-header-nav ${bgColor === "" ? "white-bg" : ""}`}
      >
        <SvgButton className="btn main" src="/img/workspace/appSwitcher.svg" />
        <button
          className="gif-btn"
          onClick={() => navigate(`/u/${userName}/boards`)}
        >
          <div className={`gif ${bgColor === "" ? "gray-filter" : ""}`}></div>
        </button>
        <SvgButton
          className="svg-btn"
          src="/img/workspace/more.svg"
          preLabel="Workspace"
        />
        <SvgButton
          className="svg-btn"
          src="/img/workspace/more.svg"
          preLabel="Recent"
        />
        <SvgButton
          className="svg-btn"
          src="/img/workspace/more.svg"
          preLabel="Starred"
        />
        <SvgButton
          className="svg-btn"
          src="/img/workspace/more.svg"
          preLabel="Template"
        />
        <button className="create-btn">Create</button>
      </nav>
      <section>
      <UserAvatar
                  member={user}
                  size={28}
                  className="user-avatar"
                />
      </section>
    </div>
  );
}
