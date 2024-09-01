import { useSelector } from "react-redux";
import { UserAvatar } from "../../UserAvatar";
import { useEffect, useRef, useState } from "react";
import { userService } from "../../../services/user.service";
import TextArea from "antd/es/input/TextArea";
import { useClickOutside } from "../../../customHooks/useClickOutside";
import { updateBoard } from "../../../store/board.actions";
import { ProfilePopover } from "../../Task/ManageTaskPopovers/ProfilePopover";

export function BoardDescription({ onSetPreventLoad }) {
  const board = useSelector((state) => state.boardModule.board);
  const user = useSelector((state) => state.userModule.user);
  const users = useSelector((state) => state.userModule.users);
  const members = useSelector((state) => state.boardModule.board.members);
  const admins = members.filter((m) => m.permissionStatus === "admin");
  const [admin, setAdmin] = useState(null);
  const [areaDivRef, isOpen, setIsOpen] = useClickOutside(false);
  const areaRef = useRef(null);
  const [areaValue, setAreaValue] = useState(
    board.desc ||
      "Add a description to let your teammates know what this board is used for." +
        " You’ll get bonus points if you add instructions for how to collaborate!"
  );
  const minRows = isOpen ? 5 : 0;
  useEffect(() => {
    if (isOpen) {
      setAreaValue(board.desc || "");
      if (areaRef) {
        const textAreaElement = areaRef.current.resizableTextArea.textArea;
        textAreaElement.focus();
      }
    } else {
      setAreaValue(
        board.desc ||
          "Add a description to let your teammates know what this board is used for." +
            " You’ll get bonus points if you add instructions for how to collaborate!"
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (admins.length === 1) {
      getAdmin();
    }
  }, [admins]);
  async function getAdmin() {
    const user = users.find(u=>u.id === admins[0].id);
    setAdmin(user);
  }
  function onChangeDescription(e) {
    setAreaValue(e.target.value);
  }
  async function onSaveDescription() {
    onSetPreventLoad(true);
    setIsOpen(false);
    await updateBoard({ ...board, desc: areaValue });
    onSetPreventLoad(false);
  }
  return (
    <section className="board-description navigation">
      <div className="board-admins">
        <header className="admins-header">
          <span className="trello-icon icon-member" />
          <h3>Board admins</h3>
        </header>
        {!!admins.length && (
          <main className="admins-main">
            {admins.length > 1 ? (
              <section className="admins-avatars">
                {admins.map((a) => {
                  return (
                    <ProfilePopover
                    key={a.id}
                      anchorEl={
                        <UserAvatar
                          memberId={a.id}
                          size={32}
                          className={"member"}
                        />
                      }
                      memberId={a.id}
                    />
                  );
                })}
              </section>
            ) : (
              <section className="admin-profile">
                <UserAvatar memberId={admin?.id} size={50} />
                <div className="info">
                  <h3 className="fullname">{admin?.fullName}</h3>
                  <p className="username">@{admin?.username}</p>
                  <p className="bio">{admin?.bio}</p>
                </div>
              </section>
            )}
          </main>
        )}
      </div>
      <div
        className={`description ${
          !board.members.some((m) => m.id === user.id) ? "disable" : ""
        }`}
      >
        <header className="description-header">
          <span className="trello-icon icon-description" />
          <h3>Description</h3>
          {!isOpen && board.members.some((m) => m.id === user.id) && (
            <button className="edit-btn" onClick={() => setIsOpen(true)}>
              Edit
            </button>
          )}
        </header>
        <main
          className={`description-main ${isOpen ? "open" : ""} ${
            !board.desc ? "add-desc" : ""
          } `}
          ref={areaDivRef}
        >
          <TextArea
            ref={areaRef}
            onClick={() => setIsOpen(true)}
            className="description-area"
            autoSize={{ minRows: minRows }}
            value={areaValue}
            onChange={onChangeDescription}
          />
          {isOpen && (
            <div className="btns">
              <button className="btn primal" onClick={onSaveDescription}>
                Save
              </button>
              <button className="btn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
