import { Flex, Tooltip } from "antd";
import { Avatar } from "antd";
import { utilService } from "../services/util.service";

import { ReactSVG } from "react-svg";
import defaultProfile from "/img/defaultProfile.svg";

export function UserAvatar({
  member,
  size = 24,
  src = defaultProfile,
  img,
  style = {},
  offTitle = false,
  ...other
}) {
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
