import { useSelector } from "react-redux"
import { UserAvatar } from "../../UserAvatar"
import { ProfilePopover } from "../ManageTaskPopovers/ProfilePopover"

export function MembersBadge({ task }) {
    const members = useSelector((state) => state.boardModule.board.members)
    const users = useSelector((state) => state.userModule.users)
    const taskMembers =
        members?.filter((member) => task?.idMembers.includes(member?.id)) || []

    return (
        <div className="members-badge">
            {taskMembers.map((member) => {
                const currentUser = users?.find((u) => u.id === member.id)
                return (
                    <ProfilePopover
                        memberId={member.id}
                        key={member.id}
                        anchorEl={
                            <UserAvatar
                                memberId={member.id}
                                onClick={(e) => e.stopPropagation()}
                                memberProp={{
                                    ...member,
                                    imgUrl: currentUser?.imgUrl,
                                }}
                            />
                        }
                    />
                )
            })}
        </div>
    )
}
