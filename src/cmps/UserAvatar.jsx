import { Tooltip } from "antd";
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
  ...other
}) {
  const dynamicStyles = member
    ? { backgroundColor: utilService.stringToColor(member.id) }
    : {};

  return (
    <Tooltip placement="bottom" title={member?.fullName} arrow={false}>
      <Avatar
        key={member?.id}
        src={member?.avatarHash}
        style={{ ...dynamicStyles, ...style }}
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
