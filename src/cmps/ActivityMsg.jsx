import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import useTime from "../customHooks/useTime";
import { ProfilePopover } from "./Task/ManageTaskPopovers/ProfilePopover";

export function ActivityMsg({ activity, task = false }) {
  const timeString = useTime(activity.timeStamp)


  switch (activity.type) {
    case "movedTask":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> moved{" "}
              <Link to={`/c/${activity.targetId}`}>{activity.targetName}</Link>{" "}
              from {activity.from} to {activity.to}
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "transferTask":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span>{" "}
              transferred{" "}
              <Link to={`/c/${activity.targetId}`}>{activity.targetName}</Link>{" "}
              to <Link to={`/b/${activity.boardId}`}>{activity.boardName}</Link>{" "}
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "receiveTask":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span>{" "}
              transferred{" "}
              <Link to={`/c/${activity.targetId}`}>{activity.targetName}</Link>{" "}
              from{" "}
              <Link to={`/b/${activity.boardId}`}>{activity.boardName}</Link>{" "}
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "joinTask":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> joined{" "}
              <Link to={`/c/${activity.targetId}`}>{activity.targetName}</Link>
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "addGroup":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> added{" "}
              {targetName} to this board
            </p>
            <p className="time">{timeString}</p>
          </div>
        </section>
      );
    case "addTask":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> added{" "}
              <Link to={`/c/${activity.targetId}`}>{activity.targetName}</Link>{" "}
              to {activity.groupName}
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "archiveTask":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> archived{" "}
              <Link to={`/c/${activity.targetId}`}>{activity.targetName}</Link>{" "}
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "deleteTask":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> deleted{" "}
              card {activity.targetName} from {activity.groupName}
            </p>
            <p className="time">{timeString}</p>
          </div>
        </section>
      );
    case "addCheckList":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> added{" "}
              {activity.checklistName} to{" "}
              <Link to={`/c/${activity.targetId}`}>{activity.targetName}</Link>
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "removeCheckList":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> removed{" "}
              {activity.checklistName} to{" "}
              <Link to={`/c/${activity.targetId}`}>{activity.targetName}</Link>
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "renameCheckList":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> renamed{" "}
              {activity.checklistName} {` (from ${activity.previousName})`}
            </p>
            <p className="time">{timeString}</p>
          </div>
        </section>
      );
    case "checkedItemInCheckList":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span>{" "}
              completed {activity.itemName} on{" "}
              {task ? (
                <p>this card</p>
              ) : (
                <Link to={`/c/${activity.targetId}`}>
                  {activity.targetName}
                </Link>
              )}
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "incompleteItemInCheckList":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> marked{" "}
              {activity.itemName} incomplete on{" "}
              {task ? (
                <p>this card</p>
              ) : (
                <Link to={`/c/${activity.targetId}`}>
                  {activity.targetName}
                </Link>
              )}
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "addComment":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span>{" "}
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
                <Link className="time" to={`/c/${activity.targetId}`}>
                  {timeString}
                </Link>
              )}
            </p>
            <span>{activity.comment}</span>
          </div>
        </section>
      );
    case "addAttachment":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> attached{" "}
              <Link to={activity.attachmentLink}>
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
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "removeAttachment":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> deleted
              the
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
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "renameBoard":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> renamed{" "}
              this board {`(from ${activity.previousName})`}
            </p>
            <p className="time">{timeString}</p>
          </div>
        </section>
      );
    case "closeBoard":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> closed{" "}
              this board
            </p>
            <p className="time">{timeString}</p>
          </div>
        </section>
      );
    case "reopenBoard":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> re-open{" "}
              this board
            </p>
            <p className="time">{timeString}</p>
          </div>
        </section>
      );
    case "changeBackGround":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> changed{" "}
              the background of this board
            </p>
            <p className="time">{timeString}</p>
          </div>
        </section>
      );
    case "changeVisibility":
      let msg = "error visibility";
      switch (activity.visibility) {
        case "public":
          msg = " made this board visible to the public";
          break;
        case "private":
          msg = " made this board visible to its member";
          break;
        case "workspace":
          msg = " made this board visible to members of its Workspace";
          break;
      }
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span>
              {msg}
            </p>
            <p className="time">{timeString}</p>
          </div>
        </section>
      );
    case "addDate":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> set{" "}
              {task ? (
                "this card"
              ) : (
                <Link to={`/c/${activity.targetId}`}>
                  {activity.targetName}
                </Link>
              )}
              set to be due at {activity.doDate}
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "completeDate":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> marked
              the due date{" "}
              {task
                ? ""
                : `on ${(
                    <Link to={`/c/${activity.targetId}`}>
                      {activity.targetName}
                    </Link>
                  )}`}{" "}
              complete
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
    case "incompleteDate":
      return (
        <section>
          <ProfilePopover
            memberId={activity.userId}
            anchorEl={
              <UserAvatar
                memberId={activity.userId}
                onClick={(e) => e.stopPropagation()}
                className="activity-msd"
              />
            }
          />
          <div>
            <p>
              <span className="username">{activity.userFullName}</span> marked
              the due date{" "}
              {task
                ? ""
                : `on ${(
                    <Link to={`/c/${activity.targetId}`}>
                      {activity.targetName}
                    </Link>
                  )}`}{" "}
              incomplete
            </p>
            {task ? (
              <p className="time">{timeString}</p>
            ) : (
              <Link className="time" to={`/c/${activity.targetId}`}>
                {timeString}
              </Link>
            )}
          </div>
        </section>
      );
  }
}
