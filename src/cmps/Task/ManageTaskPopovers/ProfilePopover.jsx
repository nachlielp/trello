import { CloseOutlined } from "@ant-design/icons";
import { UserAvatar } from "../../UserAvatar";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import { ManageTaskPopoverHeader } from "./ManageTaskPopoverHeader";
import { useState } from "react";
import { useSelector } from "react-redux";

export function ProfilePopover({
  member,
  anchorLinks,
  anchorEl,
  placement = "bottomLeft",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.userModule.user);

  function onClose(e) {
    e.stopPrapagation();
    setIsOpen(false);
  }
  return (
    <Popover
      trigger="click"
      placement={placement}
      open={isOpen}
      close={() => {}}
      onOpenChange={setIsOpen}
      arrow={false}
      content={
        <section
          className="profile-popover"
          onClick={(e) => e.stopPropagation()}
        >
          <div onClick={() => setIsOpen(false)} className="close-btn">
            <CloseOutlined />
          </div>
          <header className="profile-header">
            <UserAvatar
              member={member}
              size={88}
              offTitle={true}
              title={`${member.fullName} (${member.username})`}
            />
            <div className="profile-info">
              <span className="profile-name" title={member.fullName}>
                {member.fullName}
              </span>
              <span className="profile-username" title={member.username}>
                @{member.username}
              </span>
            </div>
          </header>
          <ul>
            <Link
              to={`/u/${member?.username}`}
              onClick={(e) => e.stopPropagation()}
              className="profile-link"
            >
              {user?.id === member?.id ? "Edit" : "View"} profile info
            </Link>
          </ul>
          {anchorLinks && (
            <>
              <hr style={{ margin: "8px 0px" }} />
              <div className="profile-other">{anchorLinks}</div>
            </>
          )}
        </section>
      }
    >
      {anchorEl}
    </Popover>
  );
}
