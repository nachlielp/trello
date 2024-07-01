import { Popover, Input } from "antd"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChangeMembersOption } from "./ChangeMembersOption";
import { ManageTaskPopoverHeader } from "../ManageTaskPopovers/ManageTaskPopoverHeader";

export function ChangeMembersPopover({ anchorEl, taskMemberIds, editTask, task }) {
    const members = useSelector((state) => state.boardModule.members);
    const [inputSearch, setInputSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [unselectedMembers, setUnselectedMembers] = useState([]);

    useEffect(() => {
        if (inputSearch === '') {
            setSelectedMembers(members.filter((member) => taskMemberIds.includes(member.id)));
            setUnselectedMembers(members.filter((member) => !taskMemberIds.includes(member.id)));
        } else {
            setSelectedMembers(members.filter((member) => taskMemberIds.includes(member.id)).filter((member) => member.fullName.toLowerCase().includes(inputSearch.toLowerCase())));
            setUnselectedMembers(members.filter((member) => !taskMemberIds.includes(member.id)).filter((member) => member.fullName.toLowerCase().includes(inputSearch.toLowerCase())));
        }

    }, [taskMemberIds, inputSearch]);

    function onClose() {
        setIsOpen(false);
    }
    return (
        <Popover
            className="change-members-popover"
            trigger="click"
            placement="bottomRight"
            open={isOpen}
            close={onClose}
            onOpenChange={setIsOpen}
            arrow={false}
            content={
                <section className="change-members-popover">
                    {/* <header className="members-header">Add members</header> */}
                    <ManageTaskPopoverHeader title="Add members" close={onClose} />
                    <article className="change-members-content">
                        <Input placeholder="Search members" className="members-search-input" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
                        {selectedMembers.length > 0 && <article className="selected-task-members">
                            <h3 className="members-sub-title">Card members</h3>
                            {selectedMembers.map((member) => (
                                <ChangeMembersOption task={task} member={member} isSelected={true} editTask={editTask} />
                            ))}
                        </article>}
                        {unselectedMembers.length > 0 && <article className="unselected-members-list">
                            <h3 className="members-sub-title">Board members</h3>
                            {unselectedMembers.map((member) => (
                                <ChangeMembersOption task={task} member={member} isSelected={false} editTask={editTask} />
                            ))}
                        </article>}
                        {unselectedMembers.length === 0 && selectedMembers.length === 0 && <article className="no-members-found">No results</article>}
                    </article>
                </section>
            }
        >
            {anchorEl}
        </Popover>
    );
}