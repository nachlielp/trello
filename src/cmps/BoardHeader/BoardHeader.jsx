import { useSelector } from "react-redux";
import { UserAddOutlined, EllipsisOutlined } from "@ant-design/icons";
import { UserAvatar } from "../UserAvatar";
import { VisibilityButton } from ".//VisibilityButton";
import { ViewsButton } from "./ViewsButton";
import { ProfilePopover } from "../Task/ManageTaskPopovers/ProfilePopover";
import { StarBoardBtn } from "../CustomCpms/StarBoardBtn";
import { NameInput } from "../CustomCpms/NameInput";
import { updateBoard } from "../../store/board.actions";
import { utilService } from "../../services/util.service";

export function BoardHeader({
  board,
  starredBoardIds,
  starToggle,
  openBoardMenu,
  setOpenBoardMenu,
  showBtn,
  setShowBtn,
}) {
  const members = useSelector((state) => state.boardModule.board.members);
  const user = useSelector((state) => state.userModule.user);
  function onToggleStar(boardId) {
    const starredIds = starredBoardIds.includes(boardId)
      ? starredBoardIds.filter((id) => id !== boardId)
      : [...starredBoardIds, boardId];
    starToggle(starredIds);
  }

  function onBoardNameChange(name) {
    const newActivity = utilService.createActivity(
      {
        type: "renameBoard",
        previousName: board.name,
      },
      user
    );

    updateBoard({
      ...board,
      name,
      activities: [...board?.activities, newActivity],
    });
  }
  function openMenu() {
    setOpenBoardMenu(true);
    setShowBtn(false);
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
        {(!openBoardMenu || showBtn) && (
          <button className="dots" onClick={openMenu}>
            <EllipsisOutlined />
          </button>
        )}
      </div>
    </div>
  );
}
