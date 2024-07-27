import { useSelector } from "react-redux";
import { UserAddOutlined, EllipsisOutlined } from "@ant-design/icons";
import { UserAvatar } from "../UserAvatar";
import { VisibilityButton } from ".//VisibilityButton";
import { ViewsButton } from "./ViewsButton";
import { FilterButton } from "./FilterButton";
import { ProfilePopover } from "../Task/ManageTaskPopovers/ProfilePopover";
import { StarBoardBtn } from "../CustomCpms/StarBoardBtn";
import { NameInput } from "../CustomCpms/NameInput";
import { updateBoard } from "../../store/board.actions";
import { setBoards } from "../../store/workspace.actions";
import { useEffect } from "react";

export function BoardHeader({ board, starredBoardIds, starToggle }) {
  const members = useSelector((state) => state.boardModule.board.members);

  function onToggleStar(boardId) {
    const starredIds = starredBoardIds.includes(boardId)
      ? starredBoardIds.filter((id) => id !== boardId)
      : [...starredBoardIds, boardId];
    starToggle(starredIds);
  }

  function onBoardNameChange(name) {
    updateBoard({ ...board, name });
  }
  return (
    <div className="board-header">
      <div className="left-info">
        <NameInput
          value={board.name}
          className="board-name"
          onSubmit={onBoardNameChange}
        />
        <StarBoardBtn
          starredBoardIds={starredBoardIds}
          boardId={board.id}
          starClick={onToggleStar}
        />
        <VisibilityButton />
        <ViewsButton />
      </div>
      <div className="right-info">
        {/* <FilterButton /> */}
        <div className="members">
          {members?.slice(0, 3).map((member) => (
            <ProfilePopover
              memberId={member?.id}
              placement="bottom"
              key={member.id}
              anchorEl={
                <UserAvatar
                  memberId={member?.id}
                  key={member?.id}
                  size={28}
                  className="members-avatar"
                />
              }
            />
          ))}
        </div>
        <button className="share-btn">
          <UserAddOutlined className="share-icon" />
          <span className="txt">Share</span>
        </button>
        <button className="dots">
          <EllipsisOutlined />
        </button>
      </div>
    </div>
  );
}
