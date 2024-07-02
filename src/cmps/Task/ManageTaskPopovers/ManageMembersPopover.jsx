import { Popover, Input } from "antd"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MemberOption } from "./MemberOption";
import { ManageTaskPopoverHeader } from "./ManageTaskPopoverHeader";

export function ManageMembersPopover({ anchorEl, editTask, task }) {
    const members = useSelector((state) => state.boardModule.members);
    const [inputSearch, setInputSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [unselectedMembers, setUnselectedMembers] = useState([]);

    useEffect(() => {
        if (inputSearch === '') {
            setSelectedMembers(members.filter((member) => task.idMembers.includes(member.id)));
            setUnselectedMembers(members.filter((member) => !task.idMembers.includes(member.id)));
        } else {
            setSelectedMembers(members.filter((member) => task.idMembers.includes(member.id)).filter((member) => member.fullName.toLowerCase().includes(inputSearch.toLowerCase())));
            setUnselectedMembers(members.filter((member) => !task.idMembers.includes(member.id)).filter((member) => member.fullName.toLowerCase().includes(inputSearch.toLowerCase())));
        }

    }, [task.idMembers, inputSearch]);

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
                    <ManageTaskPopoverHeader title="Add members" close={onClose} />
                    <article className="change-members-content">
                        <Input placeholder="Search members" className="members-search-input" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
                        {selectedMembers.length > 0 && <article className="selected-task-members">
                            <h3 className="members-sub-title">Card members</h3>
                            {selectedMembers.map((member, index) => (
                                <MemberOption key={index} task={task} member={member} isSelected={true} editTask={editTask} />
                            ))}
                        </article>}
                        {unselectedMembers.length > 0 && <article className="unselected-members-list">
                            <h3 className="members-sub-title">Board members</h3>
                            {unselectedMembers.map((member, index) => (
                                <MemberOption key={index} task={task} member={member} isSelected={false} editTask={editTask} />
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