import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import privateIcon from "/img/board-index/headerImgs/privateIcon.svg";
import publicIcon from "/img/board-index/headerImgs/publicIcon.svg";
import peopleIcon from "/img/board-index/headerImgs/peopleIcon.svg";
import permissionIcon from "/img/board-index/headerImgs/permissionIcon.svg";
import { updateBoard } from "../../store/board.actions";

export function VisibilityOptions({ setOpenListMenu, setPermission }) {
  const [hasAcces, setHasAcces] = useState(false);
  const currentMember = useSelector((state) =>
    state.boardModule.board.members.find(
      (member) => member.id === "666fe4efda8643029b6710f3"
    )
  );
  const board = useSelector((state) => state.boardModule.board);
  useEffect(() => {
    if (currentMember?.permissionStatus === "admin") {
      setHasAcces(true);
    } else {
      setHasAcces(false);
    }
  }, [currentMember]);

  function permissionCheck(permission) {
    if (permission === board.prefs?.permissionLevel) {
      return (
        <ReactSVG
          src={permissionIcon}
          wrapper="span"
          className="permission-icon"
        />
      );
    }
    return "";
  }

  function onPermissionClick(value) {
    const newBoard = board;
    board.prefs.permissionLevel = value;
    updateBoard(newBoard);
    setOpenListMenu(false);
  }

  const options = [
    {
      value: "private",
      label: "Private",
      txt: " Only board members can see this board. Workspace admins can close the board or remove members.",
      svg: privateIcon,
    },
    {
      value: "org",
      label: "Workspace",
      txt: "All members of the Trello Workspace Workspace can see and edit this board.",
      svg: peopleIcon,
    },
    {
      value: "public",
      label: "Public",
      txt: "Anyone on the internet can see this board. Only board members can edit.",
      svg: publicIcon,
    },
  ];

  return (
    <nav className="popover-nav">
      <ul>
        {options.map((option) => (
          <li key={option.value}>
            <button
              className={`${option.value}-btn btn`}
              disabled={!hasAcces}
              onClick={() => onPermissionClick(option.value)}
            >
              <span className={`${option.value}-header`}>
                <ReactSVG src={option.svg} wrapper="span" className="icon" />
                {option.label}
                {permissionCheck(option.value)}
              </span>
              <div className={`${option.value}-body`}>{option.txt}</div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
