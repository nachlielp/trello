import { useSelector } from "react-redux";
import {
  UserAddOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { UserAvatar } from "../UserAvatar";
import { VisibilityButton } from ".//VisibilityButton";
import { ViewsButton } from "./ViewsButton";
import { FilterButton } from "./FilterButton";
import { ProfilePopover } from "../Task/ManageTaskPopovers/ProfilePopover";
import { StarBoardBtn } from "../CustomCpms/StarBoardBtn";

export function BoardHeader({ board, starredBoardIds, starToggle }) {
  const members = useSelector((state) => state.boardModule.members);


  function onToggleStar(boardId) {
    const starredIds = starredBoardIds.includes(boardId) ? starredBoardIds.filter((id) => id !== boardId) : [...starredBoardIds, boardId];
    starToggle(starredIds);
  }

  return (
    <div className="board-header">
      <div className="left-info">
        <h3 className="board-name">{board.name}</h3>
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
              member={member}
              placement="bottom"
              key={member.id}
              anchorEl={
                <UserAvatar
                  member={member}
                  key={member.id}
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
