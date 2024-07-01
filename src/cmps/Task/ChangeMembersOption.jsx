import { UserAvatar } from "../../cmps/UserAvatar";
import { SvgButton } from "../../cmps/CustomCpms/SvgButton";

export function ChangeMembersOption({ task, member, isSelected, editTask }) {

    function onEditTask() {
        const newTaskMemberIds = [...task.idMembers];
        if (isSelected) {
            newTaskMemberIds.splice(newTaskMemberIds.indexOf(member.id), 1);
        } else {
            newTaskMemberIds.push(member.id);
        }
        editTask({ ...task, idMembers: newTaskMemberIds });
    }
    return (
        <div className="change-members-option" onClick={onEditTask}>
            <UserAvatar member={member} />
            <p className="member-name">{member.fullName}</p>
            {isSelected && <SvgButton src="/img/xIcon.svg" className="remove-member-button" />}
        </div>
    );
}