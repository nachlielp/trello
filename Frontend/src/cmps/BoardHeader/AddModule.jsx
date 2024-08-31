import { Modal } from "antd";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";
import { updateBoard } from "../../store/board.actions";
import { utilService } from "../../services/util.service";
import { UserAvatar } from "../UserAvatar";
import { useState } from "react";

export function AddModule({ onClose }) {
  const board = useSelector((state) => state.boardModule.board);
  const users = useSelector((state) => state.userModule.users);
  const me = useSelector((state) => state.userModule.user);
  const [disableButtons, setDisableButtons] = useState(false);
  const myStatus = useSelector((state) =>
    state.boardModule.board.members.find((m) => m.id === me.id)
  );
  async function createLink() {
    setDisableButtons(true);
    await updateBoard({ ...board, invLink: utilService.makeId() });
    setDisableButtons(false);
  }
  async function deleteLink() {
    await updateBoard({ ...board, invLink: "" });
  }
  function copyLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/b/${board.id}/${board.invLink}`
    );
  }
  async function onChangePermission(id) {
    const user = board.members.find((u) => u.id === id);
    if (user.permissionStatus === "member") {
      await updateBoard({
        ...board,
        members: board.members.map((m) =>
          m.id === user.id ? { ...m, permissionStatus: "admin" } : m
        ),
      });
    } else if (user.permissionStatus === "admin") {
      await updateBoard({
        ...board,
        members: board.members.map((m) =>
          m.id === user.id ? { ...m, permissionStatus: "member" } : m
        ),
      });
    }
  }
  return (
    <Modal open onCancel={onClose} footer="">
      <section className="add-module">
        <header className="module-header">
          <h1>Share board</h1>
        </header>
        <main className="module-main">
          <section className="share-link">
            <span className="icon">
              <FaLink />
            </span>
            <section className="btns">
              <p className="title">
                {board.invLink
                  ? "Anyone with the link can join as a member"
                  : "Share this board with a link"}
              </p>
              {board.invLink && !disableButtons ? (
                <>
                  <button onClick={copyLink}>Copy link</button>
                  <span className="dot">·</span>
                  <button onClick={deleteLink}>Delete link</button>
                </>
              ) : (
                <button onClick={createLink}>Create link</button>
              )}
            </section>
          </section>
          <section className="add-members">
            <header className="header-add-members">
              <div className="wrapper">
                <h1>
                  Board members
                  <span className="num">{board?.members.length}</span>
                </h1>
              </div>
            </header>
            <main className="main-add-members">
              {board.members.map((m) => {
                const user = users.find((u) => u.id === m.id);
                return (
                  <section className="member-wraper">
                    <section key={m.id} className="member">
                      <UserAvatar
                        memberId={m.id}
                        size={32}
                        offTitle
                        title={`${user.fullName} (${user.username})`}
                      />

                      <div className="info">
                        <h1 className="full-name">
                          {user.fullName}
                          {user.id === me.id ? " (you)" : ""}
                        </h1>
                        <p className="username">
                          @{user.username}
                          <span className="permission">
                            {" "}
                            • Board {m.permissionStatus}
                          </span>
                        </p>
                      </div>
                    </section>
                    {user.id !== me.id &&
                      myStatus.permissionStatus === "admin" && (
                        <buttom
                          onClick={() => onChangePermission(user.id)}
                          className={"make-admin"}
                        >
                          Change permission
                        </buttom>
                      )}
                  </section>
                );
              })}
            </main>
          </section>
        </main>
      </section>
    </Modal>
  );
}
