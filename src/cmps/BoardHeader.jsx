import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  DownOutlined,
  StarOutlined,
  StarFilled,
  UserAddOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { IoFilterSharp } from "react-icons/io5";
import { loadUsers, updateUser } from "../store/user.actions";
import { UserAvatar } from "./UserAvatar";
import { VisibilityButton } from "./BoardHeader-cmps/VisibilityButton";

import { ReactSVG } from "react-svg";
import boardIcon from "/img/headerImgs/boardIcon.svg";

export function BoardHeader() {
  const [isStarredBoard, setIsStarredBoard] = useState(false);
  const [hover, setHover] = useState(false);
  const members = useSelector((state) => state.boardModule.members);
  const board = useSelector((state) => state.boardModule.board);
  const currentUser = useSelector((state) =>
    state.userModule.users?.find(
      (user) => (user.id = "666fe4efda8643029b6710f3")
    )
  );

  useEffect(() => {
    loadUsers();
    if (currentUser?.starredBoardIds?.includes(board.id)) {
      setIsStarredBoard(true);
    }
  }, []);

  function onStarClick() {
    if (currentUser?.starredBoardIds?.includes(board.id)) {
      const newUser = currentUser;
      newUser.starredBoardIds = currentUser.starredBoardIds.filter(
        (id) => id !== board.id
      );
      updateUser(newUser);
    } else {
      const newUser = currentUser;
      newUser?.starredBoardIds.push(board.id);
      updateUser(newUser);
    }
    if (currentUser?.starredBoardIds?.includes(board.id)) {
      setIsStarredBoard(true);
    } else {
      setIsStarredBoard(false);
    }
  }

  return (
    <div className="board-header">
      <div className="left-info">
        {" "}
        <h3 className="board-name">{board.name}</h3>
        <button
          className="star-btn"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onClick={onStarClick}
        >
          {(hover && (isStarredBoard ? <StarOutlined /> : <StarFilled />)) ||
            (isStarredBoard ? <StarFilled /> : <StarOutlined />)}
        </button>
        <VisibilityButton />
        <button className="board-btn">
          <ReactSVG src={boardIcon} wrapper="span" className="board-icon" />
          Board
          <DownOutlined className="arow"/>
        </button>
      </div>
      <div className="right-info">
        <button className="filter-btn">
          <IoFilterSharp />
          Filters
        </button>
        <div className="members">
          {members?.slice(0, 3).map((member) => (
            <UserAvatar
              member={member}
              key={member.id}
              size={28}
              className="members-avatar"
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
