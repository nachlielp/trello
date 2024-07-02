import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserAvatar } from "../../UserAvatar";
import { PlusOutlined } from "@ant-design/icons";
import { ManageMembersPopover } from "../ManageTaskPopovers/ManageMembersPopover";
import { ProfilePopover } from "../ManageTaskPopovers/ProfilePopover";

export function TaskDetailsMembers({ currentTask, editTask }) {
  const boardMembers = useSelector((state) => state.boardModule.members);
  const [selectedMembers, setSelectedMembers] = useState([]);

 
  useEffect(() => {
    setSelectedMembers(
      boardMembers.filter((member) => currentTask.idMembers.includes(member.id))
    );
  }, [currentTask, boardMembers]);
  function onEditTask(memberId) {
    const newTaskMemberIds = [...currentTask.idMembers];
   
        newTaskMemberIds.splice(newTaskMemberIds.indexOf(memberId), 1);
     
    editTask({ ...currentTask, idMembers: newTaskMemberIds });
}

  return (
    <div className="members">
      <p>Members</p>
      {selectedMembers.map((member) => (
        <ProfilePopover
          member={member}
          key={member.id}
          anchorEl={<UserAvatar member={member} size={32} className="member" />}
          anchorLinks={
            <button className="profile-remove" onClick={()=>onEditTask(member.id)}>Remove from card</button>
          }
          
        />
      ))}
      <ManageMembersPopover
        editTask={editTask}
        anchorEl={
          <button>
            <PlusOutlined />
          </button>
        }
        task={currentTask}
        taskMemberIds={currentTask.idMembers}
      />
    </div>
  );
}
