import { Tooltip } from "antd";
import { Avatar } from "antd";
import { utilService } from "../services/util.service";

import { ReactSVG } from "react-svg";
import defaultProfile from "/img/defaultProfile.svg";
import { useSelector } from "react-redux";

export function UserAvatar({
  memberId,
  memberProp,
  user,
  size = 24,
  src = defaultProfile,
  img,
  style = {},
  offTitle = false,
  ...other
}) {
  const users = useSelector((state) => state.userModule.users);

  const member = memberProp
    ? memberProp
    : user
    ? user
    : users.find((u) => u.id === memberId);

  const ratio = 120 / 250;
  const dynamicStyles = member
    ? {
        backgroundColor: utilService.stringToColor(
          member?.fullName || member?.id
        ),
      }
    : {};
  return (
    <Tooltip
      placement="bottom"
      title={!!!offTitle && `${member?.fullName} `}
      arrow={false}
    >
      {member ? (
        member?.imgUrl ? (
          <div
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundImage: `url(${member.imgUrl})`,
              backgroundPosition: "50%",
              backgroundSize: "cover",
              borderRadius: "50%",
              ...style,
            }}
            {...other}
            src={member?.imgUrl}
          />
        ) : (
          <Avatar
            key={member?.id}
            style={{
              ...dynamicStyles,
              fontSize: `${size * ratio}px`,
              lineHeight: `${size * ratio}px`,
              alignItems: "center",
              display: "flex",
              cursor: "pointer",
              ...style,
            }}
            size={size}
            {...other}
          >
            {member && utilService.capitalizeInitials(member?.fullName)}
          </Avatar>
        )
      ) : (
        <Avatar
          key={utilService.makeId()}
          style={{
            ...dynamicStyles,
            fontSize: `${size * ratio}px`,
            lineHeight: `${size * ratio}px`,
            alignItems: "center",
            display: "flex",
            cursor: "pointer",
            ...style,
          }}
          size={size}
          {...other}
        >
          {!member && <ReactSVG src={src} />}
          {img}
        </Avatar>
      )}
    </Tooltip>
  );
}
