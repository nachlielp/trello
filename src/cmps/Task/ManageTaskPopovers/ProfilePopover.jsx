import { CloseOutlined } from "@ant-design/icons";
import { UserAvatar } from "../../UserAvatar";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import { ManageTaskPopoverHeader } from "./ManageTaskPopoverHeader";
import { useState } from "react";

export function ProfilePopover({
  member,
  anchorLinks,
  anchorEl,
  placement = "bottomLeft",
}) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }
  return (
    <Popover
      //   className="profile-popover"
      trigger="click"
      placement={placement}
      open={isOpen}
      close={() => {}}
      onOpenChange={setIsOpen}
      arrow={false}
      content={
        <section className="profile-popover">
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
          {/* <ul >
            <Link to={`/u/${member.id}`} className="profile-link">Edit profile info</Link>
          </ul>*/}
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