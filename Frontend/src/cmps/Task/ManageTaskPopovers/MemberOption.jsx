import { UserAvatar } from "../../UserAvatar"
import { SvgButton } from "../../CustomCpms/SvgButton"
import { useSelector } from "react-redux"

export function MemberOption({ task, member, isSelected, editTask }) {
    const user = useSelector((state) =>
        state.userModule.users.find((user) => member.id === user.id)
    )

    function onEditTask() {
        const newTaskMemberIds = [...task.idMembers]
        if (isSelected) {
            newTaskMemberIds.splice(newTaskMemberIds.indexOf(member.id), 1)
        } else {
            newTaskMemberIds.push(member.id)
        }
        editTask({ ...task, idMembers: newTaskMemberIds })
    }
    return (
        <div className="change-members-option" onClick={onEditTask}>
            {/* //TODO: last minute fix for demo*/}
            <UserAvatar memberId={member?.id} extraMarginToImageFlag={true} />
            <p className="member-option-member-name">{user.fullName}</p>
            {isSelected && (
                <SvgButton
                    src="/img/xIcon.svg"
                    className="remove-member-button"
                />
            )}
        </div>
    )
}
