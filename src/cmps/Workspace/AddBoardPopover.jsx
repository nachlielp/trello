import { Popover, Input } from "antd";
import { useState, useEffect, useRef } from "react";
import { SvgButton } from "../CustomCpms/SvgButton";
import { ManageTaskPopoverHeader } from "../Task/ManageTaskPopovers/ManageTaskPopoverHeader";
import { Select } from "antd";
import { utilService } from "../../services/util.service";
import { CustomSelect } from "../CustomCpms/CustomSelect";
import privateIcon from "/img/board-index/headerImgs/privateIcon.svg";
import publicIcon from "/img/board-index/headerImgs/publicIcon.svg";
import peopleIcon from "/img/board-index/headerImgs/peopleIcon.svg";
import { ReactSVG } from "react-svg";

const options = [
  {
    id: "private",
    name: "Private",
    element: (
      <article className="visibilty-select-option-element">
        <ReactSVG src={privateIcon} wrapper="span" />
        <div className="element-content">
          <h3 className="element-title">Private</h3>
          <p className="element-txt">Only board members can see this board. Workspace admins can close the board or remove members.</p>
        </div>
      </article>
    ),
  },
  {
    id: "workspace",
    name: "Workspace",
    element: (
      <article className="visibilty-select-option-element">
        <ReactSVG src={peopleIcon} wrapper="span" />
        <div className="element-content">
          <h3 className="element-title">Workspace</h3>
          <p className="element-txt">All members of the Trello Workspace Workspace can see and edit this board.</p>
        </div>
      </article>
    ),
  },
  {
    id: "public",
    name: "Public",
    element: (
      <article className="visibilty-select-option-element">
        <ReactSVG src={publicIcon} wrapper="span" />
        <div className="element-content">
          <h3 className="element-title">Public</h3>
          <p className="element-txt">Anyone on the internet can see this board. Only board members can edit.</p>
        </div>
      </article>
    ),
  },
];

export function AddBoardPopover({ onAddBoard }) {
  const [isOpen, setIsOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [focused, setFocused] = useState(false);

  function onClose() {
    setBoardName("");
    setIsOpen(false);
  }

  function handleFocus() {
    console.log("focus");
    setFocused(true);
  }

  async function onCreateBoard() {
    if (boardName === "") {
      return;
    }
    const newBoard = await utilService.createNewBoard({ name: boardName });
    onAddBoard(newBoard);

    onClose();
  }

  return (
    <Popover
      className="manage-labels-popover"
      trigger="click"
      placement="bottomRight"
      open={isOpen}
      close={onClose}
      onOpenChange={setIsOpen}
      arrow={false}
      content={
        <section className="add-board-popover-content">
          <ManageTaskPopoverHeader title="Create board" close={onClose} />
          <hr className="header-hr" />
          <p className="title">Board title*</p>
          <Input
            className="board-name-input"
            onFocus={handleFocus}
            onChange={(e) => setBoardName(e.target.value)}
          />
          {focused && boardName === "" && (
            <p className="add-board-popover-desc">
              <span>👋</span>
              <span> Board title is required</span>
            </p>
          )}
          <p className="title">Visibility</p>
          <CustomSelect
            className="board-visibility-select"
            options={options}
            onSelect={() => { }}
            value="workspace"
          />
          <button className={`add-board-btn ${boardName === "" ? "disabled" : ""}`} onClick={onCreateBoard}>
            Create
          </button>
          <article className="add-board-popover-desc">By using images from Unsplash, you agree to their <a href="https://unsplash.com/license" target="_blank">license</a> and <a href="https://unsplash.com/terms" target="_blank">Terms of Service</a></article>
        </section>
      }
    >
      <SvgButton className="board-add-btn" src="/img/workspace/pluseIcon.svg" />
    </Popover>
  );
}
