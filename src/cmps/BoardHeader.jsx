import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import visibilityIcon from "/img/headerImgs/visibilityIcon.svg";
import boardIcon from "/img/headerImgs/boardIcon.svg";
import {
  DownOutlined,
  StarOutlined,
  StarFilled,
  UserAddOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { IoFilterSharp } from "react-icons/io5";
import { LetteredAvatar } from "./LetteredAvatar";
import { login } from "../store/user.actions";
import { UserAvatar } from "./UserAvatar";

export function BoardHeader() {
  const [isStarredBoard, setIsStarredBoard] = useState(false);
  const [hover, setHover] = useState(false);
  const members = useSelector((state) => state.boardModule.members);
  const board = useSelector((state) => state.boardModule.board);
  const starFilled = isStarredBoard ? <StarFilled /> : <StarOutlined />;
  const starEmpty = isStarredBoard ? <StarOutlined /> : <StarFilled />;

  const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
  const token = import.meta.env.VITE_TRELLO_TOKEN;

  useEffect(() => {
    fetchUserId();
  }, [board]);

  async function fetchUserId() {
    const data = await fetch(
      `https://api.trello.com/1/members/me?key=${import.meta.env.VITE_TRELLO_API_KEY
      }&token=${token}`
    );
    const boardData = await data.json();
    fetchStarredBoards(boardData.id);
  }

  async function fetchStarredBoards(id) {
    try {
      const data = await fetch(
        `https://trello.com/1/member/${id}/boardStars?key=${apiKey}&token=${token}`
      );
      const boardData = await data.json();
      setIsStarredBoard(boardData.some((obj) => obj.idBoard === board.id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="board-header">
      <div className="left-info">
        {" "}
        <h3 className="board-name">{board.name}</h3>
        <button
          className="star-icon"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          {(hover && (isStarredBoard ? <StarOutlined /> : <StarFilled />)) ||
            (isStarredBoard ? <StarFilled /> : <StarOutlined />)}
        </button>
        <button className="visibility-icon">
          <img src={visibilityIcon} />
        </button>
        <button className="board-btn">
          <img src={boardIcon} />
          Board
          <DownOutlined />
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
          <UserAddOutlined className="share-icon"/>
          <span className="txt">Share</span>
        </button>
        <button className="dots">
          <EllipsisOutlined />
        </button>
      </div>
    </div>
  );
}
