import { Popover, Button } from "antd"
import { useState, useRef, useEffect } from "react"
import { EllipsisOutlined } from "@ant-design/icons"
import { ManageTaskPopoverHeader } from "../Task/ManageTaskPopovers/ManageTaskPopoverHeader"
import TextArea from "antd/es/input/TextArea"

export function GroupActionsMenuPopover({ group, openAddTask, archiveGroup, copyGroup }) {
    const [openGroupMenu, setOpenGroupMenu] = useState(false)
    const [backToList, setBackToList] = useState(null);
    const [action, setAction] = useState(null);
    const [copyListName, setCopyListName] = useState(group.name);
    const textAreaRef = useRef(null);


    useEffect(() => {
        if (action === "Copy list" && textAreaRef.current) {
            const textAreaElement = textAreaRef.current.resizableTextArea.textArea;
            textAreaElement.focus();
            textAreaElement.setSelectionRange(0, textAreaElement.value.length);
        }
    }, [action]);

    function onClickAddTask() {
        openAddTask()
        setOpenGroupMenu(false)
    }

    function onArchiveGroup() {
        archiveGroup()
        setOpenGroupMenu(false)
    }


    function onNextPage(_) {
        //
        setBackToList(() => onBackToList);
    }

    function onBackToList() {
        setBackToList(null);
        setAction(null)
    }

    function onClose() {
        setOpenGroupMenu(false)
        setAction(null)
    }

    function openCopyList() {
        setAction("Copy list")
        setBackToList(() => onBackToList);
        setCopyListName(group.name)
    }

    function onCopyGroup() {
        setAction(null)
        setBackToList(null)
        setOpenGroupMenu(false)
        copyGroup({ ...group, name: copyListName })
    }
    return (
        <Popover
            className="group-actions-menu-popover"
            trigger="click"
            placement="bottomLeft"
            open={openGroupMenu}
            onOpenChange={setOpenGroupMenu}
            arrow={false}
            content={
                <section className="group-actions-menu-content">
                    <ManageTaskPopoverHeader title={action ? action : "List actions"} close={onClose} back={backToList} />
                    {!action &&
                        <article className="group-actions-menu-actions">
                            <p className="menu-action" onClick={onClickAddTask}>Add card</p>
                            <p className="menu-action" onClick={openCopyList}>Copy list</p>
                            <p className="menu-action">Move list</p>
                            <p className="menu-action">Move all cards in the list</p>
                            <p className="menu-action">Sort by...</p>
                            <p className="menu-action">Watch</p>
                            <p className="menu-action" onClick={onArchiveGroup}>Archive this list</p>
                            <p className="menu-action last-action">Archive all cards in the list</p>
                        </article>
                    }
                    {action === "Copy list" &&
                        <article className="group-actions-sub-menu">
                            <h3 className="actions-sub-title">Name</h3>
                            <TextArea
                                ref={textAreaRef}
                                autoSize={{ minRows: 3, maxRows: 6 }}
                                value={copyListName}
                                onChange={(e) => setCopyListName(e.target.value)}
                                className="copy-list-name-input"
                            />
                            <button className="action-btn" onClick={onCopyGroup}>Create list</button>
                        </article>
                    }
                </section>
            }
        >
            <Button className="group-more-btn" size="small" onClick={() => setOpenGroupMenu(!openGroupMenu)}>
                <EllipsisOutlined />
            </Button>
        </Popover>
    )
}