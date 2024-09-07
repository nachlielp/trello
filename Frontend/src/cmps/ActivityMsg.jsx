import { Link } from "react-router-dom"
import { UserAvatar } from "./UserAvatar"
import useTime from "../customHooks/useTime"
import { ProfilePopover } from "./Task/ManageTaskPopovers/ProfilePopover"
import { useEffect } from "react"

export function ActivityMsg({ activity, task = false }) {
    const timeString = useTime(activity.timeStamp)
    const doDate = useTime(activity?.doDate)

    switch (activity.type) {
        case "movedTask":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            moved{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>{" "}
                            from {activity.from} to {activity.to}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "transferTask":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            transferred{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>{" "}
                            to{" "}
                            <Link to={`/b/${activity.boardId}`}>
                                {activity.boardName}
                            </Link>{" "}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "receiveTask":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            transferred{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>{" "}
                            from{" "}
                            <Link to={`/b/${activity.boardId}`}>
                                {activity.boardName}
                            </Link>{" "}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "joinTask":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            joined{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "addGroup":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            added {activity.targetName} to this board
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "archiveGroup":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            archived list {activity.targetName}
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "addTask":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            added{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>{" "}
                            to {activity.groupName}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "unArchive":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            sent{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>{" "}
                            to the board
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "archiveTask":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            archived{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>{" "}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "deleteTask":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            deleted card{" "}
                            <span className="card">{activity.targetName}</span>{" "}
                            from {activity.groupName}
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "addCheckList":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            added {activity.checklistName} to{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "removeCheckList":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            removed {activity.checklistName} to{" "}
                            <Link to={`/c/${activity.targetId}`}>
                                {activity.targetName}
                            </Link>
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "renameCheckList":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            renamed {activity.checklistName}{" "}
                            {` (from ${activity.previousName})`}
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "checkedItemInCheckList":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            completed {activity.itemName} on{" "}
                            {task ? (
                                <span>this card</span>
                            ) : (
                                <Link to={`/c/${activity.targetId}`}>
                                    {activity.targetName}
                                </Link>
                            )}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "incompleteItemInCheckList":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />

                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            marked {activity.itemName} incomplete on{" "}
                            {task ? (
                                <span>this card</span>
                            ) : (
                                <>
                                    <Link to={`/c/${activity.targetId}`}>
                                        {activity.targetName}
                                    </Link>
                                </>
                            )}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "addComment":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            {task ? (
                                ""
                            ) : (
                                <>
                                    "on "
                                    <Link to={`/c/${activity.targetId}`}>
                                        {activity.targetName}
                                    </Link>
                                </>
                            )}
                            {task ? (
                                <p className="time">{timeString}</p>
                            ) : (
                                <Link
                                    className="time"
                                    to={`/c/${activity.targetId}`}
                                >
                                    {timeString}
                                </Link>
                            )}
                        </p>
                        <span>{activity.comment}</span>
                    </div>
                </section>
            )
        case "addAttachment":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            attached{" "}
                            <Link to={activity.attachmentLink} target="_blank">
                                {activity.attachmentName}
                            </Link>{" "}
                            to{" "}
                            {task ? (
                                "this card"
                            ) : (
                                <Link to={`/c/${activity.targetId}`}>
                                    {activity.targetName}
                                </Link>
                            )}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "removeAttachment":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            deleted the
                            <Link to={activity.attachmentLink}>
                                {activity.attachmentName}
                            </Link>{" "}
                            attachment from{" "}
                            {task ? (
                                "this card"
                            ) : (
                                <Link to={`/c/${activity.targetId}`}>
                                    {activity.targetName}
                                </Link>
                            )}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "renameBoard":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            renamed this board{" "}
                            {`(from ${activity.previousName})`}
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "closeBoard":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            closed this board
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "reopenBoard":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            re-open this board
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "changeBackGround":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            changed the background of this board
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "changeVisibility":
            let msg = "error visibility"
            switch (activity.visibility) {
                case "public":
                    msg = " made this board visible to the public"
                    break
                case "private":
                    msg = " made this board visible to its member"
                    break
                case "org":
                    msg = " made this board visible to members of its Workspace"
                    break
            }
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>
                            {msg}
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
        case "addDate":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            set{" "}
                            {task ? (
                                "this card"
                            ) : (
                                <Link to={`/c/${activity.targetId}`}>
                                    {activity.targetName}
                                </Link>
                            )}{" "}
                            to be due at {doDate}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "removeDate":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            removed the due date from{" "}
                            {task ? (
                                "this card"
                            ) : (
                                <Link to={`/c/${activity.targetId}`}>
                                    {activity.targetName}
                                </Link>
                            )}
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "completeDate":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            marked the due date{" "}
                            {task ? (
                                ""
                            ) : (
                                <>
                                    <>on </>
                                    <Link to={`/c/${activity.targetId}`}>
                                        {activity.targetName}
                                    </Link>
                                </>
                            )}{" "}
                            complete
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "incompleteDate":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            marked the due date{" "}
                            {task ? (
                                ""
                            ) : (
                                <>
                                    <>on </>
                                    <Link to={`/c/${activity.targetId}`}>
                                        {activity.targetName}
                                    </Link>
                                </>
                            )}{" "}
                            incomplete
                        </p>
                        {task ? (
                            <p className="time">{timeString}</p>
                        ) : (
                            <Link
                                className="time"
                                to={`/c/${activity.targetId}`}
                            >
                                {timeString}
                            </Link>
                        )}
                    </div>
                </section>
            )
        case "createBoard":
            return (
                <section className="activity">
                    <ProfilePopover
                        memberId={activity.userId}
                        anchorEl={
                            <UserAvatar
                                size={32}
                                memberId={activity.userId}
                                onClick={(e) => e.stopPropagation()}
                                className="activity-avatar"
                            />
                        }
                    />
                    <div className="main-activity">
                        <p className="msg">
                            <span className="username">
                                {activity.userFullName}
                            </span>{" "}
                            created this board
                        </p>
                        <p className="time">{timeString}</p>
                    </div>
                </section>
            )
    }
}
