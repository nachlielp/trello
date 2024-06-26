import { Tooltip } from "antd";
import { Avatar } from "antd";
import { utilService } from "../services/util.service";

export function UserAvatar({ member }) {
    return (
        <Tooltip placement="bottom" title={member.fullName} arrow={false}>
            <Avatar
                key={member.id} src={member.avatarHash}
                style={{ backgroundColor: utilService.stringToColor(member.id), height: '24px', width: '24px' }}>
                {utilService.capitalizeInitials(member.fullName)}
            </Avatar>
        </Tooltip>
    )
}