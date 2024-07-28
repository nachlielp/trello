import { Flex, Tooltip } from "antd";
import { Avatar } from "antd";
import { utilService } from "../services/util.service";

import { ReactSVG } from "react-svg";
import defaultProfile from "/img/defaultProfile.svg";
import { useSelector } from "react-redux";

export function UserAvatar({
  memberId,
  size = 24,
  src = defaultProfile,
  img,
  style = {},
  offTitle = false,
  ...other
}) {
  const member = useSelector((state) =>
    state.userModule.users.find((u) => (u.id = memberId))
  );

  const ratio = 120 / 250;
  // const ratio = 1;
  const dynamicStyles = member
    ? { backgroundColor: utilService.stringToColor(member.id) }
    : {};

  return (
    <Tooltip
      placement="bottom"
      title={!!!offTitle && `${member?.fullName} (${member?.username})`}
      arrow={false}
    >
      <Avatar
        key={member?.id}
        src={member?.avatarHash}
        style={{
          ...dynamicStyles,
          fontSize: `${size * ratio}px`,
          lineHeight: `${size * ratio}px`,
          alignItems: "center",
          display: "flex",
          cursor:"pointer",
          ...style,
        }}
        size={size}
        {...other}
      >
        {member && utilService.capitalizeInitials(member?.fullName)}
        {!member && <ReactSVG src={src} />}
        {img}
      </Avatar>
    </Tooltip>
  );
}
