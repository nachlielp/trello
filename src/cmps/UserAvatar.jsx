import { Tooltip } from "antd";
import { Avatar } from "antd";
import { utilService } from "../services/util.service";

export function UserAvatar({ member,size=24,...other }) {
    return (
        <Tooltip placement="bottom" title={member.fullName} arrow={false} >
            <Avatar
                key={member.id} src={member.avatarHash}
                style={{ backgroundColor: utilService.stringToColor(member.id) }} size={size} {...other}>
                {utilService.capitalizeInitials(member.fullName)}
               
            </Avatar>
        </Tooltip>
    )
}